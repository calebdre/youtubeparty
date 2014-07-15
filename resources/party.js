var socket = io();

socket.on("disconnect", function()
{
	//reload the page if the client
	//ever disconnects from the server.
	window.location = window.location;
});

$("#queue").submit(function(event)
{
	//intercept the form.
	event.preventDefault();
	
	//push the value of the form to the server.
	var value = $(this).find("input").val();
	socket.emit("queue a video", value);
});