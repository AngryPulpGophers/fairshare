var Users = require('../models/users.js');
var express = require('express');
var router = express.Router();

//router.get('/', function(req, res, next){

//middleware called on every request--most likely authentication;
// router.use(function(req, res, next){
//   console.log('authenticatin in some way:', req.method, req.url);
//   next();
// })
module.exports = router;

router.param('username',function(req, res, next, username){
	//validation here of username
  console.log('validating username:', username);
  //reassign req.query.username to req.username;
  req.username = username;
	next();
});

router.get('/', function(req, res){
	Users.getById(req.user)
	  .then(function(data){
	  	var userInfo = data[0];
	  	delete userInfo.password;
	    res.status(200).send(userInfo);
	  })
	  .catch(function(err){
	  	res.status(400).send({err: err});
	  });
});

router.get('/username', function(req, res){
	console.log('username:', req.username);
	if(req.username === 'all'){
		Users.getAll()
		  .then(function(data){
		  	data = data.map(function(obj){
		  		delete obj.password;
		  		return obj;
		  	});
		  	res.status(200).send(data);
		  })
		  .catch(function(err){
		  	res.status(400).send({err:err});
		  });
	}else{
	  Users.getByUsername(req.username)
	    .then(function(data){
				if(data[0]){
					delete data[0].password;
			    res.status(200).send({user:data[0]});
			  }else{
			    res.status(400).send('incorrect username/username doesn\'t exist');
			  }
		  })
		  .catch(function(err){
		    console.error(err);
		  });
	}
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
	//req.body.id = req.user.id;
	Users.editProfile(req.body)
	  .then(function(){
	  	res.status(200).send('profile updated');
	  })
	  .catch(function(err){
	  	res.status(400).send({err:err});
	  });
});
