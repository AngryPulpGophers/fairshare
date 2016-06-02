"use strict";

var GoogleStrategy    = require('passport-google-oauth2').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;
var LocalStrategy     = require('passport-local').Strategy;
var bcrypt            = require('bcrypt');
var Promise           = require('bluebird');
var User              = require('../models/users');
var Identity          = require('../models/Identity');
var nodemailer        = require('nodemailer');
var wellknown         = require('nodemailer-wellknown');

if (process.env.NODE_ENV !== 'production'){
  var Credentials     = require('./auth_secrets.js');
}

var Strategies = module.exports;

const identityEntry = (uid,pid,params,provider) => {
  var identityObj = {};
  identityObj.user_id = uid;
  identityObj.provider_id = pid;
  identityObj.provider = provider;
  identityObj.token = params.access_token;
  identityObj.refresh = params.refresh_token;
  identityObj.expires = params.expires;
  return identityObj;
};


let FacebookID     = process.env.FACEBOOK_APP_ID     || Credentials.facebook.ID;
let FacebookSecret = process.env.FACEBOOK_APP_SECRET || Credentials.facebook.SECRET;
let GoogleID       = process.env.GOOGLE_APP_ID       || Credentials.google.ID;
let GoogleSecret   = process.env.GOOGLE_APP_SECRET   || Credentials.google.SECRET;


/*To allow mutiple Oauth strategies without creating duplicate records
in database, strategies check current request for user property (Ex. ln.60). This is allowed
by using 'passReqToCallback' in respective strategy's option object(Ex. ln.55).
If this prop is present, the user has already authenticated through one of
the various strategies and is attempting to link another social account to
the current record. At this point in the flow, the user passes into the else block
of the appropriate strategy(Ex. ln.108). An identity record is created and
stored in the identity table linking the current user to this social account. The user profile
is also updated with this information(Ex.ln. 115,116);thus, a
single user can have multiple identities--all of which can be used to sign in. */



Strategies.facebook_strat = new FacebookStrategy({
  clientID: FacebookID,
  clientSecret: FacebookSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture.type(large)','email'],
  passReqToCallback: true
},
  (req, accessToken, refreshToken,params, profile, done) => {
    // console.log('params at start of strategy:', params)

    //check DB for user--IF exists, execute cb->line 68
    //ELSE create profile, store in DB, execute cb->lines 70-85
    console.log("req.user in facebook", req.user);
  if(!req.user){
    Identity.getByProviderID(profile.id)
      .then( userObj => {
        if(userObj[0]){
          User.getById({id:userObj[0].user_id})
            .then( profile => done(null, profile[0]))
            .catch( err => console.warn(err));
        }else{
          let userProfile = {
            name: profile.displayName,
            username: profile.emails[0].value.split('@')[0],
            email: profile.emails[0].value,
            password: "",
            img_url: profile.photos[0].value,
            primary: 'Facebook',
            facebook: 1,
            google: 0,
            showModal: 1
          };

          let config = wellknown('GandiMail');
          config.auth = {
            user: 'info@fairshare.cloud',
            pass: 'AeK6yxhT'
          };
          let transporter = nodemailer.createTransport(config);

          let mailOptions = {
            from: '"Info" <info@fairshare.cloud>',
            to: '<'+ profile.emails[0].value +'>',
            subject: "Welcome to Fairshare",
            text: 'Thank you for joining!',
          };

          transporter.sendMail(mailOptions, function(err, info){
            if(err){
                return console.log(err);
            }
            console.log('Message sent: ' + info.response);
          });

          User.create(userProfile)
            .then( id => {
          //attach app ID to userProfile for use in fn serializeUser->line 34
              userProfile.id = id[0];
              let ID = identityEntry(id[0], profile.id,params,'facebook');
                Identity.create(ID)
                  .then( () => done(null, userProfile))
                  .catch( err => console.warn(err));
            });
        }
      })
      .catch( err => console.warn('Error @facebook strategy:', err));
  }else{
    let ID = identityEntry(req.user.id, profile.id, params,'facebook');
    req.user.facebook = 1;
    User.editProfile(req.user)
      .then( () => {
        Identity.create(ID)
          .then( () => done(null, req.user))
          .catch( err => console.warn(err));
      })
      .catch( err => console.warn(err));
  }
});

Strategies.google_strat = new GoogleStrategy({
    clientID: GoogleID,
    clientSecret: GoogleSecret,
    callbackURL: 'https://www.fairshare.cloud/auth/google/callback',
    passReqToCallback: true
  },
   (req, accessToken, refreshToken,params, profile, done) => {

    //check DB for user--IF exists, execute cb->line 68
    //ELSE create profile, store in DB, execute cb->lines 70-85
    // console.log('profile from google:', profile);
    console.log('profile in google strat:', profile);
    console.log("req.user in google", req.user);
  if(!req.user){
    Identity.getByProviderID(profile.id)
      .then( userObj => {
        if(userObj[0]){
          User.getById({id:userObj[0].user_id})
            .then( profile => done(null, profile[0]))
            .catch( err => console.warn(err));
        }else{
          let userProfile = {
            name: profile.displayName,
            username:profile.emails[0].value.split('@')[0],
            password:"",
            email: profile.emails[0].value,
            img_url: profile.photos[0].value,
            primary: 'Google',
            facebook: 0,
            google: 1,
            showModal: 1
          };

          let config = wellknown('GandiMail');
          config.auth = {
            user: 'info@fairshare.cloud',
            pass: 'AeK6yxhT'
          };
          let transporter = nodemailer.createTransport(config);

          let mailOptions = {
            from: '"Fairshare" <info@fairshare.cloud>',
            to: '<'+ profile.emails[0].value +'>',
            subject: "Welcome to Fairshare",
            text: 'Thank you for joining!',
          };

          transporter.sendMail(mailOptions, function(err, info){
            if(err){
                return console.log(err);
            }
            console.log('Message sent: ' + info.response);
          });

          User.create(userProfile)
            .then( id => {
          //attach app ID to userProfile for use in fn serializeUser->line 34
              userProfile.id = id[0];
              let ID = identityEntry(id[0], profile.id,params,'google');
                Identity.create(ID)
                  .then( () => done(null, userProfile))
                  .catch( err => console.warn(err));
            });
        }
      })
      .catch( err => console.warn('Error @google strategy:', err));
  }else{
    let ID = identityEntry(req.user.id, profile.id, params,'google');
    req.user.google = 1;
    User.editProfile(req.user)
      .then( () => {
        Identity.create(ID)
          .then( () => done(null, req.user))
          .catch( err => console.warn(err));
      })
      .catch( err => console.warn(err));
  }
});

let hash = Promise.promisify(bcrypt.hash,{context:bcrypt});
let compare = Promise.promisify(bcrypt.compare,{context:bcrypt});

Strategies.sign_up = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
(email,password,done) => { 
  User.getByEmail(email)
    .then(user => {
      if(user[0]){
        done(null,false,'user already exists')
      }else{
        hash(password,1)
          .then(hashed => {
            let userProfile = {
            name: "",
            username: email.split('@')[0],
            email: email,
            password: hashed,
            img_url: 'http://cliparts.co/cliparts/8cG/Eyz/8cGEyzg4i.png',
            primary: 'Local',
            facebook: 0,
            google: 0,
            showModal: 1
          }
          console.log('profile in create:', userProfile)
          User.create(userProfile)
            .then(id => {
              userProfile.id = id[0];
              done(null,userProfile);
            })
            .catch(err => console.warn(err))
          })
          .catch(err => console.warn(err))
      }
    })
    .catch(err => console.warn(err));
})

Strategies.sign_in = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
(email,password,done) => {
  console.log('password in login:', password);
  User.getByEmail(email)
    .then(user => {
      console.log('user in login:', user);
      if(user[0]){
        compare(password, user[0].password)
          .then(match => {
            if(match) done(null,user[0]);
            else done(null, false, 'password is incorrect')
          })
          .catch(err => console.warn(err));
      }else{
        done(null,false,'email does not exist')
      }
    })
    .catch(err => console.warn(err))
})


