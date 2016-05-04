"use strict";

var passport          = require('passport');
var session           = require('express-session');
var pg                = require('pg');
var pgSession         = require('connect-pg-simple')(session);
var uuid              = require('node-uuid');
var cookieParser      = require('cookie-parser');
var Strategies        = require('./oauthStrategies');
var User              = require('../models/users');

module.exports = (app,express) => {

let database_url = process.env.DATABASE_URL || 'postgresql://localhost/fairshare';


const sessionConfig = {
  genid: () => uuid.v1(),
  store:  new pgSession({
    pg       : pg,
    conString: database_url,
    tableName: 'sessions'
  }),
  secret: 'kitkat',
  resave: true,
  saveUninitialized: true
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('kitkat'));

passport.serializeUser((user, done) => {
  // console.log('in serializeUser');
  // console.log('user in serializeUser:', user);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log('in deserialize');
  User.getById({id: id})
  .then( userObj => {
    return done(null, userObj[0]);
  })
  .catch( err => {
    console.warn("err at deserialize:", err);
  });
});


passport.use(Strategies.facebook_strat);
passport.use(Strategies.google_strat);
passport.use(Strategies.paypal_strat);

}

