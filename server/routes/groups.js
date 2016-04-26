var Groups  = require('../models/groups.js');
var Users   = require('../models/users.js');
var express = require('express');
var router  = express.Router();

module.exports = router;

router.param('group', function(req, res, next, group){
  req.group = group;
  next();
});

router.param('user', function(req, res, next, user){
  req.user = user;
  next();
});

router.get('/', function(req, res){
  Groups.getAllGroups()
    .then(function(data){
      console.log("data in 'GET' /groups", data);
      res.send(data);
    });
});

router.get('/:user', function(req, res){
  Groups.getGroupsByUserId( req.user )
    .then(function(data){
      console.log("data in 'GET' /groups/:groupID", data);
      res.send(data);
    });
});

router.get('/users/:group', function(req, res){
  Users.getUsersByGroupId( req.group )
    .then(function(data){
      console.log("data:", data);
      res.send(data);
    });
});

router.get('/activity/:group', function(req, res){
  var activity = [];

  // Get all expenses in your group
  Groups.getExpensesByGroupId(req.group)
    .then(function(data){
      var expenses = data.map(function(val){
        // Get all users that are a part of that expense
        return Users.getUsersByExpenseId(val.id)
        .then(function(data){
          val.type = 'expense';
          val.members = data;
          return val;
        });
      });
      return Promise.all(expenses);
    })
    .then(function(expenses){
      // Push all the mapped expenses into the activity feed
      expenses.forEach(function(expense){
        activity.push(expense);
      });
      // Get all payments that are a part of that group
      Groups.getPaymentsByGroupId(req.group)
        .then(function(payments){
          // Add type and push all payments into activity feed
          payments.forEach(function(val){
            val.type = 'payment';
            activity.push(val);
          });
          return activity;
        })
        .then(function(activity){
          // Sort the activity by reverse date created
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
  Groups.createGroup(req.body)
    .then(function(data){
      console.log("data in 'POST' /groups ", data);
      res.send(data);
    });
});

router.post('/expenses', function(req, res){
  Groups.createExpense( req.body )
    .then(function(data){
      console.log("data in 'POST' /groups/expenses", data);
      res.send(data[0]);
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
  Groups.updateExpense( req.body, 1) // replace with expense id
    .then(function(data){
      console.log("data in 'PUT' /groups/expenses", data);
      res.send(data);
    });
});

router.put('/payments', function(req, res){
  Groups.updatePayment( req.body, 1) //replace with payment id
  .then(function(data){
    console.log("data in 'PUT' /groups/payments", data);
    res.send(data);
  });
});
