var Groups = require('../models/groups.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  console.log("in GET /groups");
  Groups.getAllGroups()
    .then(function(data){
      console.log("data:", data);
      res.send(data);
      res.end();
    });
});

router.get('/activity', function(req, res, next){

});

router.post('/', function(req, res, next){

});

router.post('/expenses', function(req, res, next){

});

router.post('/payments', function(req, res, next){

});

router.put('/expenses', function(req, res, next){

});

router.put('/payments', function(req, res, next){

});

module.exports = router;
