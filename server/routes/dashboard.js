var Dashboard = require('../models/dashboard.js');
var express = require('express');
var router = express.Router();
var Middleware = require('../middleware');

module.exports = router;

if (process.env.NODE_ENV !== 'test'){
  router.use(function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.status(401).send('user not authenticated');
    }
  });
}

router.get('/', function(req, res){
  var dashData = {};
  Dashboard.getWhatOwed2User(req.user.id)
    .then(function(data){
      dashData.owedToUser = data.rows[0].sum || 0;
      Dashboard.getWhatOwedFromUser(req.user.id)
        .then(function(data){
          dashData.userOwes = data.rows[0].sum|| 0;
              res.status(200).send(dashData);
        });
    });
});
