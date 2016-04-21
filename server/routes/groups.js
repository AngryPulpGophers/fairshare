var Groups = require('../models/groups.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

  Groups.getAllGroups()
    .then(function(data){
      console.log("data in 'GET' /groups:", data);
      res.send(data);
    });
});

router.get('/activity', function(req, res, next){

});

router.post('/', function(req, res){
  Groups.createGroup( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups ", data);
      res.send(data);
    });
});

router.post('/expenses', function(req, res){
  Groups.createExpense( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups/expenses");
      res.send(data);
    });
});

router.post('/payments', function(req, res, next){

});

router.put('/expenses', function(req, res, next){

});

router.put('/payments', function(req, res, next){

});

module.exports = router;
