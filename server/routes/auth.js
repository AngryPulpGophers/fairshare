var Auth = require('../models/auth.js');
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook',
  {failureRedirect: '/facebook'}), function(req,res){
  	if(req.user.showModal === 1){
	    res.redirect('/profile');
	  }else{
	  	res.redirect('/');
	  }
});

router.get('/google', passport.authenticate('google', {scope:['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google',
  {failureRedirect: '/google'}), function(req,res){
  	if(req.user.showModal){
	    res.redirect('/profile');
	  }else{
	  	res.redirect('/');
	  }
});

router.get('/paypal', passport.authenticate('paypal', {scope:['openid']}));

router.get('/paypal/callback', passport.authenticate('paypal',
	{failureRedirect: '/paypal'}), function(req,res){
  	if(req.user.showModal){
	    res.redirect('/profile');
	  }else{
	  	res.redirect('/');
	  }
});


router.get(('/logout'),function(req,res){
	req.session.destroy(function(err){
	req.sessionID = null;
	req.logout();
	res.redirect('/');
	});
})

