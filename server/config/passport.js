"use strict"

var passport          = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var session           = require('express-session');
var pg                = require('pg');
var pgSession         = require('connect-pg-simple')(session);
var uuid              = require('node-uuid');
var cookieParser      = require('cookie-parser');
var User              = require('../models/users');
var authKeys          = require('./auth_secrets.js');



module.exports = (app,express) => {

let database_url = process.env.DATABASE_URL || 'localhost';

const trimProfile = obj => {
  delete obj.username;
  delete obj.password;
  delete obj.facebookId;
  return obj;
};

const sessionConfig = {
  genid: () => uuid.v1(),
  store:  new pgSession({
    pg       : pg,                                 
    conString: 'postgresql://' + database_url +'/divvy', 
    tableName: 'sessions'             
  }),
  secret: 'kitkat',
  resave: false,
  saveUninitialized: false
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('kitkat'));

passport.serializeUser((user, cb) => {

  return cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.getById({id: id})
  .then( userObj => {
    var cleanProfile = trimProfile(userObj[0]);
      cb(null, cleanProfile);
  })
  .catch( err => {
    console.warn("err at deserialize:", err);
  });
});

passport.use(new FacebookStrategy(
  {
    clientID: authKeys.FACEBOOK_APP_ID,
    clientSecret: authKeys.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)','email']
  },
  (accessToken, refreshToken,params, profile, cb) => {
     console.log('params in fb strat:', params)

    //check DB for user--IF exists, execute cb->line 68
    //ELSE create profile, store in DB, execute cb->lines 70-85
    User.getByFacebookId(profile.id)
      .then( userObj => {
        if(userObj[0]){
          let cleanProfile = trimProfile(userObj[0])
          console.log('cleanProfile from getByFaceBookId:', cleanProfile);
          return cb(null, cleanProfile);
        }
          let userProfile = {
            name: profile.displayName,
            username:'',
            password:'',
            email: profile.emails[0].value,
            facebookId: profile.id,
            img_url: profile.photos[0].value
          };
        User.create(userProfile)
        .then( id => {
          //attach app ID to userProfile for use in fn serializeUser->line 34
          userProfile.id = id[0];
          let cleanProfile = trimProfile(userProfile)
          console.log('cleanProfile in create:', cleanProfile);
          return cb(null, cleanProfile);
        });
      })
      .catch( err => {
        console.warn('at facebook strategy err:', err);
      });
  }));
};




