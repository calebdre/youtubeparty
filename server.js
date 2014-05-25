var express = require("express");
var connect = require("connect");
var bodyParser = require("body-parser");

var application = express();

var PORT = process.env.PORT;
var SRC_DIR = __dirname + "/src/";

application.use(bodyParser());
application.use(connect.cookieParser());
application.use(express.static(SRC_DIR));
application.use(connect.session({secret: "hazel"}));

application.get("/", function(request, response)
{
    response.sendfile(SRC_DIR + "splash.html");
});

application.post("/login", function(request, response)
{
    request.session.user = new Object();
    request.session.user.email = request.body.email;
    request.session.user.idnum = generateUsernum();
    
    response.redirect("/party");
});

application.get("/party", ensureAunthentication, function(request, response)
{
    response.sendfile(SRC_DIR + "party.html");
});

var server = application.listen(PORT);




function ensureAunthentication(request, response, next)
{
    if(request.session.user)
    {
        next();
    }
    else
    {
        response.redirect("/");
    }
}

function generateUsernum()
{
    return new String(new Date().getTime()).substr(-4) + (Math.floor(Math.random() * 9000) + 1000);
}