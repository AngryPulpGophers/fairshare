var Auth = require('../models/auth.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = router;

router.get('/facebook',passport.authenticate('facebook', {scope: ['email']}))

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/facebook', successRedirect: '/index'}))
