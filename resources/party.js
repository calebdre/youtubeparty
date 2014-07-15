var socket = io();

socket.on("disconnect", function()
{
	//reload the page if the client
	//ever disconnects from the server.
	window.location = window.location;
});