///////////////////////////////////////////////////
//////////////////FILESERVER//////////////////////
/////////////////////////////////////////////////

var express = require("express");
var connect = require("connect");
var application = express();

var PORT = process.env.PORT || 80;
var SRC_DIR = __dirname + "/source_directory/";

//application.use(connect.cookieParser());
//application.use(connect.bodyParser());

application.use(express.static(SRC_DIR));
application.get("/", function(request, response)
{
    response.sendfile(SRC_DIR + "splash.html");
});

application.get("party", function(request, response)
{
    response.sendfile(SRC_DIR + "party.html");
});

application.all("/login", function(request, response)
{
    console.log(request.body.email);
    var idnum = new String(Math.random() * 1000).substr(-5) + new Date().getTime();
    console.log("your idnum is " + idnum);
    response.send("Hello world!");
});

var server = application.listen(PORT);

///////////////////////////////////////////////////
//////////////////WEBSOCKETS//////////////////////
/////////////////////////////////////////////////

var socketio = require("socket.io");

var sio = socketio.listen(server, {log: false});
sio.sockets.on("connection", function(socket)
{
    socket.on("new ytvid", function(data)
    {
        console.log("new ytvid: ", data)
        socket.broadcast.emit("new ytvid", data);
    })
});