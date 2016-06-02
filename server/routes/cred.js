var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');

module.exports = router;

router.post('/sendEmail', function(req,res){
  
  var email = req.body.email;
  console.log('email in send', email)
  User.getByEmail(email)
    .then(user => {
    console.log('user in sendEmail:', user);
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
            html: '<a href=' + 'http://localhost:3000/resetPassword>Reset Password</a>'
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