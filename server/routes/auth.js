var Auth = require('../models/auth.js');
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

var checkUser = (req,res,next) => {
  console.log('req.user in new middleware:', req)
  if(req.user) next();
  else res.redirect('/linkerror');
}

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']},{session:true}));

router.get('/facebook/callback', passport.authenticate('facebook', 
	{failureRedirect: '/facebook', successRedirect:'/'}));

router.get('/google', passport.authenticate('google', {scope:['email', 'profile']},{session:true}));

router.get('/google/callback', passport.authenticate('google',
  {failureRedirect: '/google',successRedirect: '/'}));

router.get('/paypal', passport.authenticate('paypal', {scope:['openid']}, {session:true}));

router.get('/paypal/callback', passport.authenticate('paypal',
	{failureRedirect: '/paypal', successRedirect: '/'}))

router.get('/link/facebook', checkUser, passport.authenticate('facebook', {scope: ['email']},{session:true}))

router.get('/link/google', checkUser, passport.authenticate('google', {scope:['email', 'profile']},{session:true}));

router.get('/link/paypal', checkUser, passport.authenticate('paypal', {scope:['openid']}, {session:true}));


router.get('/logout',function(req,res){
	req.session.destroy(function(err){
	req.sessionID= null;
	req.logOut();
	req.sessionStore = null;
	console.log('req.sessionStore:', req.sessionStore);
	res.redirect('/');
	});
})

