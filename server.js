var SERVER_PORT = process.env.PORT || 8080;
var STATIC_FILES = __dirname + "/resources/";

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

var Party = new function()
{
	this.join = function(socket)
	{
		this._sockets[socket.id] = socket;
		if(this.size() == 1) {this.start();}
	}
	
	this.quit = function(socket)
	{
		delete this._sockets[socket.id];
		if(this.size() == 0) {this.stop();}
	}
	
	this.size = function(socket)
	{
		return Object.keys(this._sockets).length;
	}
	
	this.start = function()
	{
		clearInterval(this.interval);
		this.interval = setInterval(this._tick.bind(this), 1000);
	}
	
	this.stop = function()
	{
		clearInterval(this.interval);
		this.interval = undefined;
	}
	
	this._sockets = {};
	
	this._tick = function()
	{
		this.data.time = this.data.time < this.data.length ? this.data.time + 1 : 0 ;
		{
			this.data.time == 0;
		}
		
		for(var index in this._sockets)
		{
			this._sockets[index].emit("party", this.data);
		}
	}
	
	this.data = {ytid: "eBh2IYjJNX8", time: 0, length: 317};
}