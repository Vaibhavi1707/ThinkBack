const express = require('express');
const adminRoute = require('./admin/backend/routes')

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/admin', adminRoute);

// read

app.get('/', (req, res) => {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "user@mail.com"
        }
    };

    documentClient.get(params, (err, data) => {
        if (err)
        {
            console.log(JSON.stringify(err, null, 2));
        }
        else 
        {
            res.send(data);
        }
    });
});

// write 
app.get('/write', (req, res) => {
    var params = {
        TableName: "users",
        Item: {
            "email_id": "user@mail.com",
            "name": "user"
        }
    }

    // Error callback
    documentClient.put(params, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        res.send(data);
    });
});

// update
app.get('/update', (req, res) => {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "user@mail.com",
        },
        UpdateExpression: "set username = :newName",
        ExpressionAttributeValues: {
            ":newName": "helloworld"
        },
        ReturnValues: "UPDATED_NEW"
    };

    documentClient.update(params, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        res.send(data);
    });
});

// delete
app.get('/delete', (req, res) => {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "user@mail.com",
        }
    };

    documentClient.delete(params, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("success");
        }
    });
});

app.listen(port, () => {
    console.log("Listening to " + port);
});