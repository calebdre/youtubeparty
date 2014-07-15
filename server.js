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
	Partyroom.join(socket);
	
	socket.on("queue a video", function(value)
	{
		console.log("queue a video: " + value);
		
		//todo: check that value is a yturl.
		//todo: add to the end of the queue.
	});
	
	socket.on("disconnect", function()
	{
		Partyroom.quit(socket);
	});
});

var Partyroom = new function()
{
	this.join = function(socket)
	{
		this._sockets[socket.id] = socket;
		if(this.size() == 1) {Partyvideo.start();}
	}
	
	this.quit = function(socket)
	{
		delete this._sockets[socket.id];
		if(this.size() == 0) {Partyvideo.stop();}
	}
	
	this.size = function(socket)
	{
		return Object.keys(this._sockets).length;
	}
	
	this._sockets = {};
}

var Partyvideo = new function()
{
	this.start = function()
	{
		clearInterval(this.interval);
		this.interval = setInterval(this._tick, 1000);
	}
	
	this.stop = function()
	{
		clearInterval(this.interval);
		this.interval = undefined;
	}
	
	this._tick = function()
	{
		console.log("party!");
	}
}