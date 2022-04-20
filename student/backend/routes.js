const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const aws = require('aws-sdk');

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
        const studentID = req.body.studentID;
        const password = req.body.password;
        const instiName = req.body.instiName;

        if (!(studentID && password && instiName))
        {
            res.status(BAD_REQUEST).send("Some fields are incomplete!");
        }
        else 
        {

            var paramsToVerifyStudent = {
                TableName: "Students",
                FilterExpression: "student_id = :studentID and institute_name = :instiName",
                ExpressionAttributeValues: {
                    ":studentID": studentID,
                    ":instiName": instiName
                }
            };

            documentClient.scan(paramsToVerifyStudent, (err, data) => {
                console.log(password, data);
                if (err)
                {
                    res.status(SERVER_ERROR).send(err);
                }
                else
                {
                    if (data.Count === 0)
                    {
                        res.status(NOT_FOUND).send({
                            "Data": "No such student exists in the institute"
                        });
                    }
                    else
                    {
                        console.log("Student exists");

                        var goodCreds = bcrypt.compare(password, data.password); 
                        if (goodCreds)
                        {
                            console.log("Good creds");
                            const token = jwt.sign(
                                {studentID: studentID},
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

router.post("/register", (req, res) => {
    try
    {
        const studentID = req.body.studentID;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const instiName = req.body.instiName;

        if (!(studentID && password && confirmPassword && instiName))
        {
            res.status(BAD_REQUEST).send("Some fields are incomplete!");
        }

        else if (password !== confirmPassword)
        {
            res.status(BAD_REQUEST).send("Password should be same as the confirmed password");
        }

        else 
        {
            var paramsToVerifyStudent = {
                TableName: "Students",
                FilterExpression: "student_id = :studentID and institute_name = :instiName and institute_name = :instiName",
                ExpressionAttributeValues: {
                    ":studentID": studentID,
                    ":instiName": instiName
                }
            };

            documentClient.scan(paramsToVerifyStudent, async (err, data) => {
                if (err)
                {
                    res.status(SERVER_ERROR).send(err);
                }
                else
                {
                    if (data.Count === 0)
                    {
                        res.status(NOT_FOUND).send({
                            "Data": "No user found"
                        });
                    }
                    else
                    {
                        console.log("Valid student");
                        
                        const encryptedPassword = await bcrypt.hash(password, 10);
                        console.log(encryptedPassword);
                        var studentParams = {
                            TableName: "Students",
                            Key: {
                                "student_id": studentID
                            },
                            UpdateExpression: "set student_password = :password",
                            ExpressionAttributeValues: {
                                ":password": encryptedPassword
                            },
                            ReturnValues: "UPDATED_NEW"
                        };

                        documentClient.update(studentParams, (err, data) => {
                            if (err)
                            {
                                res.status(SERVER_ERROR).send(err);
                            }
                            else
                            {
                                if (data.Count === 0)
                                {
                                    res.status(NOT_FOUND).send({
                                        "Data": "No such student exists in the institute"
                                    });
                                }
                                else
                                {
                                    console.log("Student exists");
                                    const token = jwt.sign(
                                        {studentID: studentID},
                                        process.env.TOKEN_KEY,
                                        {expiresIn: "2h"});
        
                                    console.log("Got token");
                                    data.token = token;
        
                                    console.log("Sending response");
                                    res.status(SUCCESS).json(data);
                                }
                            }
                        });
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

/**
 * Returns courses by searching courses by name and insti name
 */
router.get("/search", (req, res) => {
    var params = {
        TableName: "Courses",
        FilterExpression: "course_name = :courseName and institute_name = :instiName and institute_name = :instiName",
        ExpressionAttributeValues: {
            ":courseName": req.query.courseName,
            ":instiName": req.body.instiName
        }
    };

    documentClient.scan(params, (err, data) => {
        if (err)
        {
            res.status(SERVER_ERROR).send(err);
        }
        else 
        {
            if (data.Count === 0)
            {
                res.status(NOT_FOUND).send({
                    "Data": "No such courses Found!"
                });
            }
            else 
            {
                res.status(SUCCESS).send(data);
            }
        }
    });
});

/**
 * Search by course and date to get exact pdf
 */
router.get("/pdf/:course/:date", (req, res) => {
    var params = {
        TableName: "Notes",
        FilterExpression: "course_name = :courseName and date_written = :notesDate and institute_name = :instiName",
        ExpressionAttributeValues: {
            ":courseName": req.params.course,
            ":notesDate": req.params.date,
            ":instiName": req.body.instiName
        }
    };

    documentClient.scan(params, (err, data) => {
        if (err)
        {
            res.status(SERVER_ERROR).send(err);
        }
        else 
        {
            if (data.Count === 0)
            {
                res.status(NOT_FOUND).send({
                    "Data": "No notes Found!"
                });
            }
            else
            {
                res.status(SUCCESS).send(data);
            }
        }
    });
});

/**
 * All pdfs from  a course are here
 */
router.get("/course/:course", (req, res) => {
    var params = {
        TableName: "Notes",
        FilterExpression: "course_name = :courseName and institute_name = :instiName",
        ExpressionAttributeValues: {
            ":courseName": req.params.course,
            ":notesDate": req.params.date,
            ":instiName": req.body.instiName
        }
    };

    documentClient.scan(params, (err, data) => {
        if (err)
        {
            res.status(SERVER_ERROR).send(err);
        }
        else 
        {
            if (data.Count === 0)
            {
                res.status(NOT_FOUND).send({
                    "Data": "No notes in this course!"
                });
            }
            else 
            {
                res.status(SUCCESS).send(data);
            }
        }
    });
});

module.exports = router;


/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SUQiOiJTVFVERU5UMSIsImlhdCI6MTY1MDQ5MTkwMSwiZXhwIjoxNjUwNDk5MTAxfQ.u73RIC5vom7cuVIig42INOyv21BSksiku7MErUx42OE
 */