var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var bcrypt  = require('bcrypt');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');

var hash = Promise.promisify(bcrypt.hash, {context:bcrypt});

module.exports = router;

router.post('/sendEmail', function(req,res){
  
  var email = req.body.email;
  
  User.getByEmail(email)
    .then(user => {
      if(user[0]){
        
        var config = wellknown('GandiMail');
          config.auth = {
            user: 'info@fairshare.cloud',
            pass: 'AeK6yxhT'
          };
        
        var transporter = nodemailer.createTransport(config);
        var mailOptions = {
            from: '"Info" <info@fairshare.cloud>',
            to: '<'+ email +'>',
            subject: "Click the following link to reset your Fairshare password",
            html: '<a href=' + 'https://www.fairshare.cloud/resetPassword>Reset Password</a>'
          };

        transporter.sendMail(mailOptions, function(err, info){
          if(err){
              return console.log(err);
          }else{
            res.status(200).send(info);
          }
        });
      }else{
        res.status(401).send('Email is not registered')
      }
    })
    .catch(err => console.warn(err))
})

router.put('/reset', function(req,res){
  
  var credentials = req.body;

  User.getByEmail(credentials.email)
    .then( user => {
      if(user[0]){
        hash(credentials.password, 1)
          .then( hash => {
            delete credentials.confirm;
            credentials.password = hash;
            User.resetPassword(credentials)
              .then( () => res.status(200).send('password reset successful'))
              .catch( err => res.status(400).send(err))
          })
          .catch( err => res.status(400).send(err))
      }else{
        res.status(400).send('Email address is not registered')
      }
    })
    .catch( err => console.warn(err))
})