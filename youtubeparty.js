var Queue = new Meteor.Collection("queue");

var timer = undefined;

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
			 			return Template.onstage;
			 		}
					return Template.backstage;
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
			if(timer) {clearTimeout(timer);}
			loadNextYoutubeVideo();
		}
	});

	Template.onstage.videos = function () {
		return Queue.find({});
	}

	Template.backstage.videos = function(){
		return Queue.find({});
	}
	
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
		//Queue.remove({});
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

function loadNextYoutubeVideo()
{
	var video = Queue.findOne({}, {sort: {time: 1}});
	
	if(video)
	{
		loadYoutubeVideoById(video.ytid);
		Queue.remove(video._id);
		$("#title").html(video.title);
		
		timer = setTimeout(loadNextYoutubeVideo, 60 * 1000);
	}
	else
	{
		loadYoutubeVideoById("DYyTsyFya10");
		$("#title").html("CodeDay Spring 2014 Opening Video");
	}
}