if (Meteor.isClient)
{
	Template.onstage.yturl = "https://www.youtube.com/v/7POSA7kFxGU?enablejsapi=1"; //&autoplay=1
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		
	});
}
