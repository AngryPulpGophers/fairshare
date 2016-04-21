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

router.get('/activity', function(req, res){
  var activity = [];
  Groups.getExpensesByGroupId(1)
    .then(function(expenses){
      expenses.forEach(function(val){
        val.type = 'expense';
        activity.push(val);
      });
      return expenses;
    })
    .then(function(expenses){
      Groups.getPaymentsByGroupId(1)
        .then(function(payments){
          payments.forEach(function(val){
            val.type = 'payment';
            activity.push(val);
          });
          return activity;
        })
        .then(function(activity){
          activity = activity.sort(function(a, b){
            return a.created_at - b.created_at;
          });
          res.send(activity);
        });
    });
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

router.post('/payments', function(req, res){
  Groups.createPayment( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups/payments");
      res.send(data);
    });
});

router.put('/expenses', function(req, res, next){

});

router.put('/payments', function(req, res, next){

});

module.exports = router;
