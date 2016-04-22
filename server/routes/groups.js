var Groups = require('../models/groups.js');
var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
  Groups.getGroupsByUserId(1)
    .then(function(data){
      console.log("data in 'GET' /groups", data);
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
    .then(function(){
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
            return b.created_at - a.created_at;
          });
          console.log("data in 'GET' /groups/activity", activity);
          res.send(activity);
        });
    });
});

router.post('/', function(req, res){
  console.log("req.body", req.body);
  Groups.createGroup( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups ", data);
      res.send(data);
    });
});

router.post('/expenses', function(req, res){
  Groups.createExpense( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups/expenses", data);
      res.send(data);
    });
});

router.post('/payments', function(req, res){
  Groups.createPayment( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups/payments", data);
      res.send(data);
    });
});

router.put('/expenses', function(req, res){
  Groups.updateExpense( req.body, 1)
    .then(function(data){
      console.log("data in 'PUT' /groups/expenses", data);
      res.send(data);
    });
});

router.put('/payments', function(req, res){
  Groups.updatePayment( req.body, 1)
  .then(function(data){
    console.log("data in 'PUT' /groups/payments", data);
    res.send(data);
  });
});
