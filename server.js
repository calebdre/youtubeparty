var express = require("express");

var server = express();
server.use(express.static("./resources"));

server.get("/", function(request, response)
{
	response.redirect("party.html");
});

server.listen(1271);