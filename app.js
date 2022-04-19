const express = require('express');
const studentRoute = require('./student/backend/routes');
const adminRoute = require('./admin/backend/routes')

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/student', studentRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
    console.log("Listening to " + port);
});