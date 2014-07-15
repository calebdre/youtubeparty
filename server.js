var express = require("express");

application = express();
application.use(express.static("./resources"));
application.get("/", function(request, response)
{
	response.redirect("party.html");
});
server = http.Server(application);
server.listen(process.env.PORT || 1271);

var io = require("socket.io")(server);
io.on("connection", function(socket)
{
	console.log("connected!");
});