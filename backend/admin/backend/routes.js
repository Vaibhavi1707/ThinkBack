const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const aws = require('aws-sdk');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

const router = express.Router();

aws.config.update({
    region: "us-west-2"
});
let documentClient = new aws.DynamoDB.DocumentClient();

router.post("/login", (req, res) => {
    try
    {
        const instiPassword = req.body.instiPassword;
        const instiName = req.body.instiName;
        const className = req.body.className;

        if (!(instiPassword && instiName))
        {
            res.status(BAD_REQUEST).send("Some fields are incomplete!");
        }
        else 
        {
            var paramsToVerifyInsti = {
                TableName: "Institutes",
                FilterExpression: "institute_name = :instiName",
                ExpressionAttributeValues: {
                    ":instiName": instiName
                }
            };

            documentClient.scan(paramsToVerifyInsti, (err, data) => {
                if (err)
                {
                    res.status(SERVER_ERROR).send(err);
                }
                else
                {
                    if (data.Count === 0)
                    {
                        res.status(NOT_FOUND).send({
                            "Data": "No such institute exists"
                        });
                    }
                    else
                    {
                        console.log("Insti exists");

                        var goodCreds = bcrypt.compare(instiPassword, data.password); 
                        if (goodCreds)
                        {
                            console.log("Good creds");
                            const token = jwt.sign(
                                {instiID: data.institute_id},
                                process.env.TOKEN_KEY,
                                {expiresIn: "2h"});

                            console.log("Got token");
                            data.token = token;

                            console.log("Sending response");
                            res.status(SUCCESS).json(data);
                        }
                        else
                        {
                            res.status(BAD_REQUEST).send("Invalid Credentials");
                        }
                    }
                }
            });
        }
    }
    catch (err)
    {
        console.error(err);
    }
});

function getObjsToAdd(entityList)
{

    var headings = entityList[0];
    console.log(headings);
    var objs = [];

    for (var i = 1; i < entityList.length; i ++)
    {
        var elem = {};
        for (var j = 0; j < headings.length; j ++)
        {
            elem[headings[j]] = entityList[i][j]
        }
        objs.push(elem);
    }

    return objs;
}

function addToDB(entities, tableName)
{
    console.log("Adding to DB", entities);
    var objsToAdd = getObjsToAdd(entities);
    console.log("Objs to add", objsToAdd);
    var addSuccess = false;
    objsToAdd.forEach(obj => {
        var params = {
            TableName: tableName,
            Item: obj
        }
        documentClient.put(params, (err, data) => {
            if (err)
            {
                console.error(tableName, err);
            }
            else
            {
                addSuccess = true;
            }
        });

        if (!addSuccess)
        {
            return addSuccess;
        }
    });

    return addSuccess;
}

router.post("/register", async (req, res) => {
    try
    {
        // Institute Name + Password: Add institute in Institute table
        const instiName = req.body.instiName;
        const instiPassword = req.body.instiPassword;
        const confPassword = req.body.confPassword;
        const instiStudentsCSV = req.body.studentsCSV;
        const currClassroom = req.body.currClassroom;
        const timetableCSV = req.body.timetableCSV;

        if (!(instiName && instiPassword && confPassword))
        {
            res.status(BAD_REQUEST).send("Some fields are incomplete!");
        }

        else if (instiPassword !== confPassword)
        {
            res.status(BAD_REQUEST).send("Password should be same as the confirmed password");
        }

        else
        {
            const encryptedPassword = await bcrypt.hash(instiPassword, 10);
            console.log(encryptedPassword);
            var instiParams = {
                TableName: "Institutes",
                Item: {
                    "insti_name": instiName,
                    "institute_password": encryptedPassword
                }
            };

            var instiNamePass = false;
            var studentsAdd = false;
            var classroomsAdd = false;
            documentClient.put(instiParams, (err, data) => {
                if (err)
                {
                    res.status(SERVER_ERROR).send("Couldn't add institute: " + err.message);
                }
                else
                {
                    instiNamePass = true;
                }
            });

            console.log(currClassroom);

            var classroomParams = {
                TableName: "Classrooms",
                Item: {
                    "classroom_name": currClassroom,
                    "insti_name": instiName
                }
            }

            documentClient.put(classroomParams, (err, data) => {
                if (err)
                {
                    res.status(SERVER_ERROR).send("Couldn't add classroom: " + err.message);
                }
                else 
                {
                    console.log("SUCCESS: Classroom Added");
                }
            });

            console.log("Institute added");

            studentsAdd = addToDB(instiStudentsCSV, "Students");

            console.log("Students added");

            // Classrooms CSV with classroom name, timetable: Add classrooms and courses in the Classrooms table and Courses table
            
            classroomsAdd = addToDB(timetableCSV, "Courses", currClassroom);

            console.log("classrooms added");
        }

        res.status(SUCCESS).send("Registration Sucessful");
    }
    catch (err)
    {
        res.status(SERVER_ERROR).send(err.message);
    }
});

function waitForClass(startTime)
{
    var currDate = new Date();
    if (currDate.getHours() + ":" + currDate.getMinutes() === startTime)
    {
        return;
    }
    else 
    {
        setTimeout(waitForClass, 1000);
    }
}

router.get("/remind", (req, res) => {
    var params = {
        TableName: "Courses",
        FilterExpression: "course_day = :courseDay and insti_name = :instiName",
        ExpressionAttributeValues: {
            ":courseDay": req.body.courseDay,
            ":instiName": req.body.instiName
        }
    };
    
    documentClient.scan(params, (err, data) => {
        if (err)
        {
            res.status(SERVER_ERROR).send(err.message);
        }
        else
        {
            console.log("Classes found", data);
            var startTime, courseName, endTime;
            data.Items.forEach(courseObj => {
                startTime = courseObj.start_time;
                var startTimeParts = startTime.split(":");

                var currTime = new Date()
                var classTime = new Date()
                classTime.setHours(parseInt(startTimeParts[0]), 
                    parseInt(startTimeParts[1]), 0)

                console.log("Current time", currTime.getTime());
                console.log("Class time", classTime.getTime());
                console.log(currTime.getTime() < classTime.getTime());

                if (currTime.getTime() <= classTime.getTime()) {
                    console.log("Found time", courseObj.end_time, courseObj.course_name);
                    endTime = courseObj.end_time;
                    courseName = courseObj.course_name;
                    return;
                }
            });

            console.log("Got the course to record", courseName, startTime, endTime);

            waitForClass(startTime);

            console.log("Time for class");
            res.status(SUCCESS).send({
                "startTime": startTime,
                "endTime": endTime,
                "courseName": courseName
            });
        }
    });
});

router.get("/upload/:className/:courseName", (req, res) => {
    var classText = req.body.classText;
    var className = req.params.className;
    var courseName = req.params.courseName;
    console.log("Text of the class material:", classText);
    // TODO: Section the summary

    var doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('hello.pdf'));

    
    var pageText = "";
    doc.fontSize(27)
        .text(courseName);
    for (var i = 0; i < classText.length + 1; i ++)
    {
        console.log(i);
        if ((i - 1) % 20 == 0) 
        {
            console.log(pageText);
            doc.addPage()
            .fontSize(27)
            .text(pageText)
            pageText = "";
        }
        else 
        {
            pageText += classText[i];
        }
    }

    doc.end();

    console.log("Doc done: Hello.pdf");

    // TODO: Add to Notes table

    res.status(SUCCESS).send("Notes sucessfully created");
});

module.exports = router;