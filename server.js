var express = require("express");

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
		console.log(value);
	});
});