var db = require('../db.js');

var Users = module.exports;
  

Users.create = function(reqObj){
  return db('users')
        .insert(reqObj)
        .returning('id');
}

Users.getByUsername = function(username){
  return db('users')
        .select()
        .where('users.username', '=', username);
}

Users.getById = function(reqObj){
  return db('users')
        .select()
        .where('id', '=', reqObj.id);
}

Users.editProfile = function(reqObj){
  return db('users')
        .where('id', '=', reqObj.id)
        .update(reqObj);
}

Users.getAll = function(){
  return db('users').select();
}


