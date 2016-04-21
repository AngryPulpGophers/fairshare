var passport = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;
var TwitterStrategy   = require('passport-twitter').Strategy;
var authKeys = require('./auth');

var fbProfileInfo = {};
var twitProfileInfo = {};
var thisUser;
var FacebookStrategy  = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  return done(null, thisUser);
});

passport.use(new FacebookStrategy(
  {
    clientID: authKeys.facebookClient,
    clientSecret: authKeys.facebookSecret,
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("in construction:", profile.photos[0].value, profile.displayName);
    fbProfileInfo.pic = profile.photos[0].value;
    fbProfileInfo.name = profile.displayName;
    thisUser = profile;
    thisUser.id = 1;
    return done(null, thisUser);
  }
));

module.exports = function get () {
  return [fbProfileInfo, twitProfileInfo];
};

passport.use(new TwitterStrategy({
    consumerKey: authKeys.twitterClient,
    consumerSecret: authKeys.twitterSecret,
    callbackURL: "http://localhost:4000/auth/twitter/callback"
  },
  function(accessToken, tokenSecret, profile, done) {
    console.log("in construction:", arguments);
    twitProfileInfo.pic = profile.photos[0].value;
    twitProfileInfo.name = profile.displayName;
    thisUser = profile;
    thisUser.id =1;
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    return done(null, thisUser);
    }
  ));

// passport.use(new InstagramStrategy({
//     clientID: INSTAGRAM_CLIENT_ID,
//     clientSecret: INSTAGRAM_CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/instagram/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log("in construction:", arguments);
//     User.findOrCreate({ instagramId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
