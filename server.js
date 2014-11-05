var SERVER_PORT = process.env.PORT || 8080;
var STATIC_FILES = __dirname + "/static/";

var http = require("http");
var express = require("express");
var socket = require("socket.io");


application = express();
application.use(express.static(STATIC_FILES));
application.get("/", function(request, response)
{
	response.sendfile(STATIC_FILES + "party.html");
});


server = http.Server(application);
server.listen(SERVER_PORT, function()
{
	console.log("Listening on " + SERVER_PORT);
});


io = socket(server);
io.on("connection", function(socket)
{
	Party.join(socket);
	
	socket.on("queue a video", function(value)
	{
		console.log("queue a video: " + value);
		
		//todo: check that value is a yturl.
		//todo: add to the end of the queue.
	});
	
	socket.on("disconnect", function()
	{
		Party.quit(socket);
	});
});