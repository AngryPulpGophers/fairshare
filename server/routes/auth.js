var Auth = require('../models/auth.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook', 
  {failureRedirect: '/facebook', successRedirect: '/'}))

router.get(('/logout'),function(req,res){
	console.log('req.session before nullified:', req.session.cookie);
	// req.session = null;
	req.session.destroy(function(){
	  req.sessionID = null;
	  // console.log('req.session after nullified:', req.session.cookie)
	  req.logout();
	  console.log('req after logout:', req.signedCookies)
	  res.redirect('/index')
  })
})

