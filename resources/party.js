var socket = io();

socket.on("disconnect", function()
{
	//reload the page if the client
	//ever disconnects from the server.
	window.location = window.location;
});

socket.on("party", function(data)
{
	//if it is not playing the video.
	if(player.getVideoId() != data.ytid)
	{
		player.loadVideoById(data.ytid);
	}
	
	//if it is off by more than five seconds.
	if(Math.abs(player.getCurrentTime() - data.time) > 5)
	{
		player.seekTo(data.time);
	}
});

$("#queue").submit(function(event)
{
	//intercept the form.
	event.preventDefault();
	
	//push the value of the form to the server.
	var value = $(this).find("input").val();
	socket.emit("queue a video", value);
});

//this may generate a lot of odd
//youtube errors; just ignore them.

function onYouTubeIframeAPIReady()
{
	player = new YT.Player("youtube",
	{
		width: "320", height: "240",
		videoId: "DYyTsyFya10",
		
		playerVars:
		{
			rel: 0, //do not show related videos
			autoplay: 1, //autoplay when loaded
		},
		
		events:
		{
			"onReady": function(event)
			{
				player.getVideoId = function()
				{
					return this.getVideoUrl().match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)[7];
				}
			}
		}
	});
}