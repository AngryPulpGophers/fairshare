var Users   = require('./models/users');
var Groups  = require('./models/groups.js');
var Sess    = require('./models/sessions');

var MiddleWare = module.exports;

MiddleWare.checkGroup = function(req, res, next){
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
    });
};

MiddleWare.checkOwner = function(req, res, next){
  Groups.getGroupById( req.group )
    .then(function(group){
      if (group.created_by == req.user.id){
        next();
      } else {
        res.status(403).send('You are not the owner of this group.');
      }
    });
};

if (process.env.NODE_ENV === 'test'){
  MiddleWare.checkGroup = function(req, res, next){ next(); };
  MiddleWare.checkOwner = function(req, res, next){ next(); };
}
