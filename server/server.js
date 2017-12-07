const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const port = 8000;
const stateFileName = "state.json";
const keyFileName = "key.config";
const app = express();
app.use(bodyParser.json());

app.get('/state', function (req, res) {
    var content = fs.readFileSync(stateFileName);
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
});

app.post('/state', function (req, res) {
    try {
        var key = JSON.parse(fs.readFileSync(keyFileName))["key"];
    } catch(e) {
        var responseObj = {
            "status": "failure",
            "message": "Invalid JSON config file server-side."
        }
        res.status(500).json(responseObj);
    }

    if (req.body.key !== key) {
        var responseObj = {
            "status": "failure",
            "message": "Invalid authentication key provided."
        }
        res.status(401).json(responseObj);
    }
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
            "message": "Invalid state provided"
        }
        res.status(400).json(responseObj);
    }
    
});

app.listen(port, () => console.log('Listening on port ' + port + '!'))