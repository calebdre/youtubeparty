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

//this will generate a lot of odd
//youtube errors; just ignore them.

/*onYouTubeIframeAPIReady = function()
{
	var player = new YT.Player("youtube",
	{
		events:
		{
			"onReady": function(event)
			{
				console.log("begin playing the video");
			},
			"onStageChange": function(event)
			{
				console.log(event.data);
				if(event.data = YT.PlayerState.ENDED)
				{
					console.log("IT IS OVER!");
				}
			}
		}
	});
};*/