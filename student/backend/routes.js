var express = require('express');
var router = express.Router();

// should be a post request
router.get("/login", (req, res) => {
    res.send("Student Login");
});

router.post("/register", (req, res) => {
    console.log(req.body.username);
    res.send("Registered student");
});

router.get("/search", (req, res) => {
    res.send({
        "Query": req.query.courseName,
        "Task": "Search by course name and get folder or a list of folders of courses containing the query str"
    });
});

router.get("/search/:date", (req, res) => {
    res.send({
        "Date": req.params.date,
        "Query": req.query.courseName,
        "Task": "Search by course and date to get exact pdf"
    });
});

router.get("/pdf/:course/:date", (req, res) => {
    res.send({
        "Course": req.params.course,
        "Date": req.params.date,
        "Task": "Downloading pdf"
    });
});

router.get("/course/:course", (req, res) => {
    res.send({
        "Course": req.params.course,
        "Task": "All pdfs from " + req.params.course + " are here"
    });
});

module.exports = router;