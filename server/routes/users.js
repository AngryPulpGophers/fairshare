var Users = require('../models/users.js');
var express = require('express');
var router = express.Router();
var Middleware = require('../middleware');

//router.get('/', function(req, res, next){


// router.use(function(req, res, next){
//  console.log('req in middleware:', req);
//   if(req.isAuthenticated()){
//   	return next();
//   }else{
//   	res.status(401).send('user not authenticated')
//   }
// })
module.exports = router;

//console.log('middleware.checkAuth:', Middleware.checkAuth);
router.param('username',function(req, res, next, username){
	//validation here of username
  console.log('validating username:', username);
  //reassign req.query.username to req.username;
  req.username = username;
	next();
});

router.get('/', function(req, res){
	Users.getAll()
	  .then(function(data){
	    res.status(200).send(data);
	  })
	  .catch(function(err){
	  	res.status(400).send({err: err});
	  });
});

router.get('/:username', function(req, res){
  Users.getByUsername(req.username)
    .then(function(data){
			if(data[0]){
		    res.status(200).send(data[0]);
		  }else{
		    res.status(400).send('incorrect username or username doesn\'t exist');
		  }
	  })
	  .catch(function(err){
	    console.error(err);
	  });
});

router.post('/', function(req, res){
	var profile = req.body;

	Users.getByUsername(profile.username)
	  .then(function(data){
	    if(data[0]){
	    	res.status(400).send('username already exists');
	    }else{
	    	Users.create(profile)
	    	  .then(function(id){
	    	  	res.status(200).send('user created');
	    	  })
	    	  .catch(function(err){
	    	  	res.status(400).send({err:err});
	    	  });
	    }
	  })
	  .catch(function(err){
	  	res.status(400).send({err:err});
	  });
});

router.put('/username', function(req, res){
	Users.editProfile(req.body)
	  .then(function(){
	  	res.status(200).send('profile updated');
	  })
	  .catch(function(err){
	  	res.status(400).send({err:err});
	  });
});
