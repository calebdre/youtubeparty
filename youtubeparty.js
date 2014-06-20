var YoutubeQueue = new Meteor.Collection("queue");

if (Meteor.isClient)
{
	/*Template.onstage.yturl = function()
	{
		var next_in_queue = YoutubeQueue.findOne({}, {sort: {timestamp: 1}});
		var yturl = next_in_queue ? next_in_queue.yturl : "KyUYbAWjdx8";

		return "https://www.youtube.com/v/" + yturl + "?version=3&enablejsapi=1"; //&autoplay=1
	}*/
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		YoutubeQueue.remove({});
		YoutubeQueue.insert({yturl: "ab8TumnQDTY", timestamp: Date.now() + 10});
		YoutubeQueue.insert({yturl: "0DcS1ofQXt8", timestamp: Date.now() + 20});
		YoutubeQueue.insert({yturl: "QLbt6tAQOT8", timestamp: Date.now() + 30});
	});
}