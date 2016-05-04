var Auth = require('../models/auth.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook', 
  {failureRedirect: '/facebook', successRedirect: '/'}))

router.get('/google', passport.authenticate('google', {scope:['email','profile']}));

router.get('/google/callback', passport.authenticate('google', 
  {failureRedirect: '/facebook', successRedirect: '/'}))

router.get('/paypal', passport.authenticate('paypal'));

router.get('/paypal/callback', passport.authenticate('paypal', 
  {failureRedirect: '/facebook', successRedirect: '/'}))




router.get(('/logout'),function(req,res){
	// req.session = null;
	req.session.destroy(function(){
	  req.sessionID = null;
	  // console.log('req.session after nullified:', req.session.cookie)
	  req.logout();
	  res.redirect('/')
  })
})

