var Users   = require('./models/users');
var Groups  = require('./models/groups.js');
var Sess    = require('./models/sessions');

var Middleware = module.exports;

Middleware.checkGroup = function(req, res, next){
  req.group = req.group || req.body.group_id;
  Users.getUsersByGroupId( req.group )
    .then(function(users){
      var ids = users.map(function(user){
        return user.user_id;
      });
      if (ids.indexOf(req.user.id) === -1){
        res.status(403).send('Invalid Request');
      }
      else {
        next();
      }
    })
    .catch(function(err){
      res.status(400).send({err:err});
    });
};

Middleware.checkOwner = function(req, res, next){
  Groups.getGroupById( req.group )
    .then(function(group){
      if (group.created_by === req.user.id){
        next();
      } else {
        res.status(403).send('You are not the owner of this group.');
      }
    })
    .catch(function(err){
      res.status(400).send({err:err});
    });
};

Middleware.checkGroupOwner = function(req, res, next){
  req.group = req.body.id;
  Groups.getGroupById( req.group )
    .then(function(group){
      if (group.created_by === req.user.id){
        next();
      } else {
        res.status(403).send('You are not the owner of this group.');
      }
    })
    .catch(function(err){
      res.status(400).send({err:err});
    });
};

if (process.env.NODE_ENV === 'test'){
  Middleware.checkGroup = function(req, res, next){ next(); };
  Middleware.checkOwner = function(req, res, next){ next(); };
  Middleware.checkGroupOwner = function(req, res, next){ next(); };
}
