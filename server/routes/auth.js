var Auth = require('../models/auth.js');
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');


module.exports = router;


router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook',
  {failureRedirect: '/facebook', successRedirect: '/'}));

router.get('/google', passport.authenticate('google', {scope:['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google',
  {failureRedirect: '/google', successRedirect: '/'}));

router.post('/signup', function(req,res,next){
  passport.authenticate('sign_up', function(err,user,info){
    console.log('info in auth:', info);
    if(err) return next(err)
    if(!user) return res.status(401).send(info);
    
    req.login(user,function(err){
      if(err) return res.status(401).send(info);
      res.redirect('/')
    });
  })(req,res,next)
});

router.post('/signin', function(req,res,next){
  passport.authenticate('sign_in', function(err,user,info){
    console.log('info in auth:', info);
    if(err) return next(err)
    if(!user) return res.status(401).send(info);
    
    req.login(user,function(err){
      if(err) return res.status(401).send(info);
      res.redirect('/')
    });
  })(req,res,next)
});

router.get('/logout',function(req,res){
	req.session.destroy(function(err){
	req.sessionID = null;
	req.logout();
	res.redirect('/');
	});
});



