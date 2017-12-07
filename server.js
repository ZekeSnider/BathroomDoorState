const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const stateFileName = "state.json";
const app = express();
app.use(bodyParser.json());

app.get('/state', function (req, res) {
    var content = fs.readFileSync(stateFileName);
    res.send(content);
});

app.post('/state', function (req, res) {
    var status, message;
    if (req.body.state === "occupied" || req.body.state === "available") {
        fs.writeFileSync(stateFileName, JSON.stringify({state: req.body.state}));
        var responseObj = {
            "status": "success",
            "message": "Bathroom door state succesfully updated."
        }
        res.json(responseObj);
    }
    else {
        var responseObj = {
            "status": "failure",
            "message": "invalid state provided"
        }
        res.status(400).json(responseObj);
    }
    
});

app.listen(8000, () => console.log('Listening on port 8000!'))