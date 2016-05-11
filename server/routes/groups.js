var Groups  = require('../models/groups.js');
var Users   = require('../models/users.js');
var Middleware = require('../middleware');
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

router.param('userid', function(req, res, next, userid){
  req.userid = userid;
  next();
});

router.param('balance', function(req, res, next, balance){
  req.balance = balance;
  next();
});

router.get('/', function(req, res){
  Groups.getGroupsByUserId( req.user.id )
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err, text: 'Error in getting a users groups'});
    });
});

router.get('/users/:group', function(req, res){
  Users.getUsersByGroupId( req.group )
    .then(function(users){
      var ids = users.map(function(user){
        return user.user_id;
      });
      if (ids.indexOf(req.user.id) === -1 && process.env.NODE_ENV !== 'test'){
        res.status(403).send('Invalid Request');
      } else {
        res.send(users);
      }
    })
    .catch(function(err){
      res.status(400).send({err: err, text: 'Error getting a groups users'});
    });
});

router.get('/activity/:group', Middleware.checkGroup, function(req, res, next){
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
  req.body.created_by = req.user.id;
  Groups.createGroup(req.body)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.post('/expenses', Middleware.checkGroup, function(req, res){
  Groups.createExpense( req.body )
    .then(function(data){
      Users.getUsersByExpenseId(data.id)
        .then(function(members){
          data.members = members;
          data.type = 'expense';
          res.send(data);
        })
        .catch(function(err){
          res.status(400).send({err: err});
        });
    });
});

router.post('/expenses/upload', upload.single('photo') ,function(req, res){
  res.end(req.file.path);
});

router.post('/payments', Middleware.checkGroup, function(req, res){
  Groups.createPayment( req.body )
    .then(function(data){
      data.type = 'payment';
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.post('/addMember/', Middleware.checkGroup, function(req, res){
  Groups.addMember( req.body )
    .then(function(){
      res.send('succesfully added member');
    })
    .catch(function(err){
      res.send({err: err});
    });
});

router.put('/expenses', Middleware.checkGroup, function(req, res){
  if (req.body.membersAdded){
    req.body.membersAdded.forEach(function(member){
      Groups.addExpenseMember({
        expense_id: req.body.id,
        user_id: member
      }).then();
    });
    delete req.body.membersAdded;
  }
  if (req.body.membersDeleted){
    req.body.membersDeleted.forEach(function(member){
      Groups.removeExpenseMember({
        expense_id: req.body.id,
        user_id: member
      }).then();
    });
    delete req.body.membersDeleted;
  }
  if (req.body.members){
    var members    = req.body.members;
    delete req.body.members;
  }

  Groups.updateExpense( req.body )
    .then(function(data){
      if (members){ data.members = members; }
      // console.log('rico WTF',data)
      data.type = 'expense';
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.put('/payments', Middleware.checkGroup, function(req, res){
  Groups.updatePayment( req.body )
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.put('/balance/:userid/:group/:balance', Middleware.checkGroup, function(req, res){
  req.body.user_id = Number(req.userid);
  req.body.group_id = Number(req.group);
  req.body.balance = Number(req.balance);

  Groups.updateBalance( req.body )
    .then(function(data){
      res.status(204).send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});

router.delete('/:group', Middleware.checkOwner, function(req, res){
  Groups.deleteGroupById( req.group )
    .then(function(){
      res.status(200).send({
        id: req.group,
        text: 'Group successfully deleted'
      });
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
});
