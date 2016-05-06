var Groups  = require('../models/groups.js');
var Users   = require('../models/users.js');
var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'dist/images/expenses'});
var router  = express.Router();

module.exports = router;

if (process.env.NODE_ENV !== 'test'){
  router.use(function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else{
      res.status(401).send('user not authenticated');
    }
  });
}

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
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err, text: 'Error in getting all groups'});
    });
});

router.get('/:user', function(req, res){
  Groups.getGroupsByUserId( req.user )
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err, text: 'Error in getting a users groups'});
    });
});

router.get('/users/:group', function(req, res){
  Users.getUsersByGroupId( req.group )
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err, text: 'Error getting a groups users'});
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
          res.send(activity);
        })
        .catch(function(err){
          res.status(400).send({err: err, text: 'Error in activity'});
        });
    });
});

router.post('/', function(req, res){
  //automatically add yourself to group if not already in it.
  if (process.env.NODE_ENV !== 'test' && req.body.members.indexOf(req.user.id) === -1){
    req.body.members.push(req.user.id);
  }
  Groups.createGroup(req.body)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.post('/expenses', function(req, res){
  Groups.createExpense( req.body )
    .then(function(data){
      //console.log('expense id:', data[0].id)
      Users.getUsersByExpenseId(data[0].id)
        .then(function(members){
          data[0].members = members;
          data[0].type = 'expense';
          //console.log('expense posted data:',data)
          res.send(data[0]);
        })
        .catch(function(err){
          res.status(400).send({err: err});
        });
    })
});

router.post('/expenses/upload', upload.single('photo') ,function(req, res){
  res.end(req.file.path);
});

router.post('/payments', function(req, res){
  Groups.createPayment( req.body )
    .then(function(data){
      data[0].type = 'payment';
      res.send(data[0]);
    })
    .catch(function(err){
      console.log('err in payment post:', err);
      res.status(400).send({err: err});
    });
});

router.put('/expenses', function(req, res){
  Groups.updateExpense( req.body )
    .then(function(data){
      res.send(data[0]);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.put('/payments', function(req, res){
  Groups.updatePayment( req.body )
    .then(function(data){
      res.send(data[0]);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});
