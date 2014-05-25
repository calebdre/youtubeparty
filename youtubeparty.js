var Queue = new Meteor.Collection("queue");

if (Meteor.isClient)
{

	// ** START ROUTING SECTION **
	var isLoggedIn = false;
	var f = new Deps.Dependency();

	Template.dynamicTemplate.helpers({
		router:function(){
			f.depend();
			 if(isLoggedIn){
			 		if($('#audience').prop('checked')){
			 			return Template.backstage;
			 		}
					return Template.onstage;
				}else{
					return Template.splash;
				}
			}
	});


	Template.splash.events({"submit form": function(e, template){
		e.preventDefault();
		isLoggedIn = true;
		f.changed();
		return $('#email').val();
	}});

	// ** END ROUTING SECTION **

	/*Template.onstage.title = function()
	{
		//does this work?
		return Queue.findOne({}, {sort: {time: 1}}).title;
	};*/
	
	Template.onstage.events(
	{
		"click button": function()
		{
			var video = Queue.findOne({}, {sort: {time: 1}});
			console.log(video);
			if(video)
			{
				loadYoutubeVideoById(video.ytid);
				Queue.remove(video._id);
				$("#title").html(video.title);
			}
			else
			{
				loadYoutubeVideoById("DYyTsyFya10");
				$("#title").html("CodeDay Spring 2014 Opening Video");
			}
		}
	});

	Template.onstage.title = "CodeDay Spring 2014 Opening Video"
	
	Template.backstage.events(
	{
		"submit form": function(event)
		{
			event.preventDefault();
			var yturl = $("#queue-item").val();
			var ytid = getIdFromUrl(yturl);

			if(!ytid){
				alert('Invalid url!');
				return;
			}

			$("#queue-item").val(new String());
			
			var ytimg = "http://i1.ytimg.com/vi/" + ytid + "/0.jpg";
			
			$.get("http://gdata.youtube.com/feeds/api/videos/" + ytid, function(data)
			{
				var title = $(data).find("title").text();
				title = title.substring(0, title.length / 2);
				
				Queue.insert({title: title, ytimg: ytimg, time: new Date().getTime(), ytid: ytid, ytimg: ytimg});
			});
		}
	});
	
	Template.queue.list = function()
	{
		return Queue.find({});
	};
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
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

	 var ytid = yturl.match(regExp);

	 if(ytid){
	 	return ytid[7];
	 }else{
	 	return false;
	 }
}

function loadYoutubeVideoById(ytid)
{
	$("iframe").attr("src", "https://www.youtube.com/v/" + ytid + "?enablejsapi=1&autoplay=1");
}