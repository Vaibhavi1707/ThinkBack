var express = require('express');
var router = express.Router();

// Should be a post request
router.get("/login", (req, res) => {
    res.send("Admin Login");
});

router.post("/register", (req, res) => {
    console.log(req.body.username);
    res.send("Registered student");
});

router.get("/consolidate", (req, res) => {
    res.send({
        "Task1":"Summarize recorded text and consolidate it into different headings",
        "Task2":"write in a pdf doc and store it in the db"
    });
});

module.exports = router;