//YOUTUBE

swfobject.embedSWF("https://www.youtube.com/v/xqKPe9w5bUs?enablejsapi=1&playerapiid=ytplayer&version=3&autoplay=1&disablekb=1",
"youtube-player", "425", "356", "8", null, null, {allowScriptAccess: "always"}, {id: "the-youtube-player"});

var youtube;

function onYouTubePlayerReady() //to configure the youtube player when it first loads.
{
    youtube = document.getElementById("the-youtube-player");
    youtube.addEventListener("onStateChange", "onYoutubeStateChange");
    
    loadNextYoutubeVideoFromQueues();
}

function onYoutubeStateChange(state) //to update the next video when the youtube video ends.
{
    if(state == 0)
    {
        loadNextYoutubeVideoFromQueues();
    }
}

function loadNextYoutubeVideoFromQueues()
{
    //if there are users ready to queue up a video
    if(roundrobin.length > 0 && users[roundrobin[0]].queue.length > 0)
    {
        //get the next user and their next video.
        var usernum = roundrobin.shift();
        var ytid = users[usernum].queue.shift();
        
        //load the video from youtube.
        youtube.loadVideoById(ytid)
        
        //put both the user and their
        //video at the end of the queue.
        users[usernum].queue.push(ytid);
        roundrobin.push(usernum);
        
        $.get("http://gdata.youtube.com/feeds/api/videos/" + ytid, function(data)
        {
            console.log(data);
            $("#video-title").text($(data).find("title").text());
        });
    }
    else
    {
        //load the code day video by default.
        youtube.loadVideoById("DYyTsyFya10");
        $("#video-title").text("CodeDay Hackathon! Add your videos to the queue!");
    }
}

var roundrobin = ["andrew", "caleb", "hazel"];

var users = {
    "andrew": {
        name: "Andrew McPherson",
        queue: ["Yod1xMpyWjU", "rR94NDIfGmA"]
    },
    "caleb": {
        name: "Caleb Lewis",
        queue: ["11q9-Kl02Dg", "rZelHlm8e-A"]
    },
    "hazel": {
        name: "Hazel Ernest",
        queue: ["S4cUPDC4zww", "g2XsAhmrbc4", "H8H_HqkZYog"]
    }
}

//WEBSOCKETS

var socket = io.connect();

socket.on("disconnect", function()
{
    window.location = window.location;
});

socket.on("new ytvid", function(data)
{
    create_new_li(data.yturl);
})

//JQUERY

$(document).ready(function()
{
    //just so we all are on the same page, a "ytvid" is a "youtube video" :D
    
    $("#new_ytvid").on("submit", function(event)
    {
        //prevent the form from redirecting the user!
        event.preventDefault();
        
        //get the value they provided.
        var yturl = $(this).find("input").val();
        
        //if they didn't provide a value,
        //stop everything and return!!
        if(!yturl)
        {
            return;
        }
        
        //clear the prompt so they can enter another.
        $(this).find("input").val(new String());
        
        create_new_li(yturl);
        
        socket.emit("new ytvid", {yturl: yturl});
    })
})

function create_new_li(yturl)
{
    var $ytvid = $("<li>");
    
    $ytvid.text(yturl);
    
    $("#my_queue").append($ytvid);
}

function getUrl(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var yturl = url.match(regExp);
    return yturl[7];
}