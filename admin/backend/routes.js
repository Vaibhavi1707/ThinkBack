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

module.exports = router;