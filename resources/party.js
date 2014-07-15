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

var player;
function onYouTubeIframeAPIReady()
{
	player = new YT.Player("youtube",
	{
		height: "390",
		width: "640",
		videoId: "eBh2IYjJNX8",
		playerVars:
		{
			rel: 0, //do not show related videos
			autoplay: 1, //autoplay when loaded
			//developers.google.com/youtube/player_parameters
		},
		events:
		{
			"onReady": function(event)
			{
				console.log("ready");
			},
			"onStateChange": function(event)
			{
				if(event.data == YT.PlayerState.PLAYING)
				{
					event.target.seekTo(20);
					console.log("playing the video!");
				}
			}
		}
	});
}