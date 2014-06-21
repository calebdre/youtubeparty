Videos = new Meteor.Collection("videos");
Parties = new Meteor.Collection("parties");

if (Meteor.isClient)
{

	console.log("Just ignore all these errors that are from youtube. :]")

	Template.onstage.video = function()
	{
		return Videos.findOne({}, {sort: {timestamp: 1}});
	}

	Template.backstage.queue = function()
	{
		return Videos.find({}, {sort: {timestamp: 1}, skip: 1});
	}

	Template.downstage.party = function()
	{
		return Parties.findOne({});
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Videos.remove({});
		Videos.insert({ytid: "ab8TumnQDTY", title: "Magical Cans", length: 180+30, timestamp: Date.now() + 10});
		Videos.insert({ytid: "0DcS1ofQXt8", title: "Best Prop Ever", length: 180+11, timestamp: Date.now() + 20});
		Videos.insert({ytid: "QLbt6tAQOT8", title: "Cooking with Nanners", length: 180+7, timestamp: Date.now() + 30});
		
		Parties.remove({});
		var video_id = Videos.findOne({}, {sort: {timestamp: 1}})._id;
		var party_id = Parties.insert({video_id: video_id, time: 0});

		Meteor.setInterval(function()
		{
			Parties.find({}).forEach(function(party, index)
			{
				Parties.update(party._id, {$inc: {time: 1}});
			});
		}, 1000);
	});
}