const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
const port = 8000;
const stateFileName = "state.json";
const keyFileName = "keyconfig.json";
const app = express();
app.use(bodyParser.json());
var expressWs = require('express-ws')(app);

//Broadcast the current state from the state file to all
//connected websocket clients
function BroadcastState() {
    var stateContent = fs.readFileSync(stateFileName, "utf8");
    expressWs.getWss().clients.forEach(function each(client) {
        if (client.readyState === 1) {
            client.send(stateContent);
        }
    });
}

//Get the current state of the lock
app.get('/state', function (req, res) {
    var content = fs.readFileSync(stateFileName);
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
});

//Accept websocket connections for real time updates
//on the lock's status
app.ws('/state', function(ws, req) {
    //immediately send the current state upon connection
    ws.send(fs.readFileSync(stateFileName, "utf8"));

    //If the client sends "ping" respond with "pong"
    ws.on('message', function(msg) {
        if (msg === "ping") {
            ws.send("pong");
        }
    });
});

app.post('/state', function (req, res) {
    //Try to read key from state file
    try {
        var key = JSON.parse(fs.readFileSync(keyFileName))["key"];
    } catch(e) {
        var responseObj = {
            "status": "failure",
            "message": "Invalid JSON config file server-side."
        }
        res.status(500).json(responseObj);
    }

    //If the client provides an invalid key, return error
    if (req.body.key !== key) {
        var responseObj = {
            "status": "failure",
            "message": "Invalid authentication key provided."
        }
        res.status(401).json(responseObj);
    }

    //Set the state if valid
    if (req.body.state === "occupied" || req.body.state === "available") {
        //update file
        fs.writeFileSync(stateFileName, JSON.stringify({state: req.body.state}));

        //Broadcast state change to websocket clients
        BroadcastState();

        var responseObj = {
            "status": "success",
            "message": "Bathroom door state succesfully updated."
        }
        res.json(responseObj);
    }
    //If the client provided an invalid state, return an error
    else {
        var responseObj = {
            "status": "failure",
            "message": "Invalid state provided"
        }
        res.status(400).json(responseObj);
    }
    
});

//Server static frontend
app.use(express.static('static'))

app.listen(port, () => console.log('Listening on port ' + port + '!'))