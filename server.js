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
	Partyroom.add(socket);
	console.log(Partyroom.size());
	
	socket.on("queue a video", function(value)
	{
		console.log("queue a video: " + value);
		
		//todo: check that value is a yturl.
		//todo: add to the end of the queue.
	});
	
	socket.on("disconnect", function()
	{
		Partyroom.remove(socket);
		console.log(Partyroom.size());
	});
});

var Partyroom = new function()
{
	this.add = function(socket)
	{
		this._sockets[socket.id] = socket;
	}
	
	this.remove = function(socket)
	{
		delete this._sockets[socket.id];
	}
	
	this.size = function(socket)
	{
		return Object.keys(this._sockets).length;
	}
	
	this._sockets = {};
}