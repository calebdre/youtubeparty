var socket = io();

socket.on("disconnect", function()
{
	//reload the page if the client
	//ever disconnects from the server.
	window.location = window.location;
});

socket.on("party", function(data)
{
	if(player.getVideoId() != data.ytid)
	{
		player.loadVideoById(data.ytid);
	}
	
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

//this will generate a lot of odd
//youtube errors; just ignore them.

function onYouTubeIframeAPIReady()
{
	player = new YT.Player("youtube",
	{
		height: "390",
		width: "640",
		videoId: "DYyTsyFya10",
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
				player.getVideoId = function()
				{
					return this.getVideoUrl().match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)[7];
				}
			},
			"onStateChange": function(event)
			{
				//?!
			}
		}
	});
}

function getYoutubeID(yturl)
{
	return yturl.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)[7];
}