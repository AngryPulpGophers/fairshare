var passport = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var User = require('../models/users');
var authKeys = require('./auth_secrets.js');



module.exports = function(app,express){



app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getById({id: id})
  .then(function(userProfile){
    delete userProfile.username;
    delete userProfile.password;
    done(null, userProfile);
  })
  .catch(function(err){
    console.warn("at deserialize err:", err);
  })
});

passport.use(new FacebookStrategy(
  {
    clientID: authKeys.FACEBOOK_APP_ID,
    clientSecret: authKeys.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)','email']
  },
  function(accessToken, refreshToken, profile, cb) {

    console.log('profile:', profile);

    User.getByFacebookId(profile.id)
      .then(function(user){
        if(user[0]){
          delete user[0].username;
          delete user[0].password;
          return cb(null, user[0]);
        }else{
          var userProfile = {
            name: profile.displayName,
            username:'',
            password:'',
            email: profile.emails[0].value, 
            facebookId: profile.id,
            img_url: '' 
          }
        }
        User.create(userProfile)
        .then(function(id){
          userProfile.id = id[0];
          delete userProfile.username;
          delete userProfile.password;
          return cb(null, userProfile);
        })
      })
      .catch(function(err){
        console.warn('at facebook strategy err:', err);
      })
  }));
}
// module.exports = function get () {
//   return [fbProfileInfo, twitProfileInfo];
// };


