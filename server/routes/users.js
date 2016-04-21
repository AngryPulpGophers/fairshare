var Users = require('../models/users.js');
var express = require('express');
var router = express.Router();



//router.get('/', function(req, res, next){

//middleware called on every request--most likely authentication;
// router.use(function(req, res, next){
//   console.log('authenticatin in some way:', req.method, req.url);
//   next();
// })

// router.params('username',function(req, res, next, username){
// 	//validation here of username

// 	console.log('validating username:', username);

// 	//reassign req.query.username to req.username;

// 	req.username = username;
// 	next();

// })

router.get('/:username', function(req, res){
	//db query to get user profile info something like--knex('users').select().where('username', '=', req.username);
	console.log('getting user info from DB with following:', req.query.username);
	if(data){
    res.status(200).send({user: data});
  }else{
    res.status(400).send('incorrect username/ username doesn\'t exist');
  }
});

router.post('/', function(req, res){
	//check db for values that already exist--username, password, etc. 
	console.log('checking for duplicates in database of following:' req.body.username, req.body.password);
	//no duplicates insert into users tables--knex('users').insert(req.body);
	res.status(200).send('new user created');
})

router.put('/username', function(req, res){
	//db update query---we can get the userid from req.user with passport.
	// to get full db entry and locate exact record
	req.body.id = req.user.id;
	//update in database--knex('users').where('id', '=', req.body.id).update(req.body);
	res.status(200).send('updated user profile');
})

module.exports = router;
