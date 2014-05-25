var Queue = new Meteor.Collection("queue");

if (Meteor.isClient)
{
	Template.add2queue.events(
	{
		"submit form": function(event)
		{
			event.preventDefault();
			var yturl = $("[name=yturl]").val();
			var ytid = getIdFromUrl(yturl);
			$("[name=yturl]").val(new String());
			
			var ytimg = "http://i1.ytimg.com/vi/" + ytid + "/0.jpg";
			
			var _id = Queue.insert({time: new Date().getTime(), ytid: ytid, ytimg: ytimg});
			
			$.get("http://gdata.youtube.com/feeds/api/videos/" + ytid, function(data)
			{
				var title = $(data).find("title").text();
				title = title.substring(0, title.length / 2);
				
				Queue.update(_id, {title: title, ytimg: ytimg});
			});
		}
	});
	
	Template.queue.list = function()
	{
		return Queue.find({});
	};
	
	Template.party.events(
	{
		"click button": function()
		{
			console.log("I'm clicked!");
			
			var video = Queue.findOne({}, {sort: {time: 1}});
			
			if(video)
			{
				console.log(video);
				
				loadYoutubeVideoById(video.ytid);
				
				Queue.remove(video._id);
			}
			else
			{
				loadYoutubeVideoById("DYyTsyFya10");
			}
		}
	});
}

if (Meteor.isServer)
{
	Meteor.startup(function()
	{
		Queue.remove({});
	});
}

function getIdFromUrl(yturl)
{
	return yturl; //todo: regex!
}

function loadYoutubeVideoById(ytid)
{
	$("iframe").attr("src", "https://www.youtube.com/v/" + ytid + "?enablejsapi=1&autoplay=1");
}