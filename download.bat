REM clear everything
rm resources/videos/*

REM download from YT
call ytdl %1 > resources/videos/party.flv

REM encode as WEBM with VP8/Vorbis
call ffmpeg -i resources/videos/party.flv -b 1500k -vcodec libvpx		-acodec libvorbis -ab 160000 -f webm	-g 30 -s 640x360 resources/videos/party.webm

REM encode as MP4 with H.264/ACC
call ffmpeg -i resources/videos/party.flv -b 1500k -vcodec libx264												-g 30 -s 640x360 resources/videos/party.mp4

REM encode as OGV with Theora/Vorbis
call ffmpeg -i resources/videos/party.flv -b 1500k -vcodec libtheora		-acodec libvorbis -ab 160000			-g 30 -s 640x360 resources/videos/party.ogv