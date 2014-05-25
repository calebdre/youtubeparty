///////////////////////////////////////////////////
//////////////////AUTHSYSTEM//////////////////////
/////////////////////////////////////////////////

var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var GOOGLE_CLIENT_ID = "357910777372-3qbfqukbodth7kkbhpa9l7ejbobbhfcr.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "8xXQSvTdw6PdduStswg0M4A0";

passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(obj, done) {done(null, obj);});

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://youtubeparty-c9-arcym.c9.io/login/google/callback"
    },
    function(access, refresh, profile, done)
    {
        console.log(profile.displayName + " has joined the room!");
        
        return done(null, profile);
    }
));

///////////////////////////////////////////////////
//////////////////FILESERVER//////////////////////
/////////////////////////////////////////////////

application.use(connect.session({secret: "keyboard cat"}));
application.use(passport.initialize());
application.use(passport.session());

///////////////////////////////////////////////////
//////////////////LOGINVIEWS//////////////////////
/////////////////////////////////////////////////

var scopes = {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']};
application.get("/login/google", passport.authenticate("google", scopes))
application.get("/login/google/callback", passport.authenticate("google"), {failureRedirect: "/", successRedirect: "/party"});
application.get("/logout", function(request, response)
{
    request.logout();
    response.redirect("/");
});

function ensureAuthenticated(request, response, next)
{
    if(request.isAuthenticated())
    {
        return next();
    }
    else
    {
        response.redirect('/login');
    }
}