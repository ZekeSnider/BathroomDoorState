var APIURL = "localhost:8000/state"
var animationTime = 1500;
var myWebSocket;
var firstState = true;
var lastState;

//If websockets are supported, get live data
if (window.WebSocket){
	myWebSocket = new WebSocket("ws://" + APIURL);
	myWebSocket.onmessage = function(event) {
		updateState(JSON.parse(event.data).state);
	}
//Otherwise, just make a GET request
} else {
	httpGetAsync("http://" + APIURL, function(responseText) {
		updateState(JSON.parse(responseText).state);
	})
}


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

//Update the state of the page with the state of the server
function updateState(state)
{
	//Don't animate if this is the first state get from the server.
	var myAnimationTime = animationTime
	if (firstState === true) {
		myAnimationTime = 0;
		firstState = false;
	}

	//Play audio if this is animated, and not first set
	if (lastState !== state && lastState !== undefined){
		var audio = document.getElementById("dooraudio");
    	audio.play();
	}

	//animate y position properties for occupied and available layers based on state	
	if (state === "available") {
		$("#occupied").animate({"margin-top": "175px"}, {duration: myAnimationTime});
		$("#available").animate({"margin-top": "96px"}, {duration: myAnimationTime});
	}
	else if (state == "occupied") {
		$("#occupied").animate({"margin-top": "96px"}, {duration: myAnimationTime});
		$("#available").animate({"margin-top": "19px"}, {duration: myAnimationTime});
	}

	lastState = state;
	
}