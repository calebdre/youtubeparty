var express = require("express");
var exec = require("child_process").exec;


application = express();
application.use(express.static("./resources"));
application.get("/", function(request, response)
{
	response.redirect("party.html");
});
server = require("http").Server(application);
server.listen(process.env.PORT || 1271);


var io = require("socket.io")(server);
io.on("connection", function(socket)
{
	socket.on("queue a video", function(value)
	{
		//todo: check that value is a yturl.
		//todo: add to the end of the queue.
	});
});


exec("queue.bat " + value, function()
{
	console.log("queued a video");
});