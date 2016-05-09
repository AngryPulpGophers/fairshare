var Sess = require('./models/sessions');
var Users = require('./models/users');

var MiddleWare = module.exports;

MiddleWare.checkGroup = function(req, res, next){
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
