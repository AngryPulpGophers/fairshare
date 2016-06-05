var db = require('../db.js');
var Users = module.exports;


Users.create = function(reqObj){
  return db('users')
    .insert(reqObj, 'id');
};

Users.getByUsername = function(username){
  return db('users')
    .select('id', 'name', 'username', 'email', 'img_url')
    .where('users.username', '=', username);
};

Users.getByEmail = function(email){
  return db('users')
    .select('id','name','username', 'password','email','img_url')
    .where('users.email', '=', email);
}

Users.resetPassword = function(reqObj){
  console.log('reqObj in util', reqObj);
  return db('users')
    .where('users.email', '=', reqObj.email)
    .update(reqObj);
}

Users.getById = function(reqObj){
  return db('users')
    .select('id','name','username','email','img_url')
    .where('id', '=', reqObj.id);
};

Users.editProfile = function(profAttrs){
  return db('users')
    .where('id', '=', profAttrs.id)
    .update(profAttrs, 'id');
};


Users.getAll = function(){
  return db('users')
    .select('id', 'name', 'username', 'img_url');
};

Users.getAllButCurr = function(reqObj){
  return db('users')
    .select('id', 'name', 'username', 'img_url')
    .where('id', '!=', reqObj.id);
};

// Possibly change user_id AS id to match other models.
Users.getUsersByExpenseId = function(expenseId){
  return db('users')
    .select('name', 'username', 'email', 'img_url', 'user_id AS id')
    .innerJoin('user_expenses', 'users.id', 'user_expenses.user_id')
    .where({
      expense_id: expenseId
    });
};

Users.getUsersByGroupId = function(groupID){
  return db('users')
    .select('name', 'username', 'email', 'img_url', 'user_id')
    .innerJoin('user_groups', 'users.id', 'user_groups.user_id')
    .where({
      group_id: groupID
    })
    .then(function(data){
      return data;
    });
};
