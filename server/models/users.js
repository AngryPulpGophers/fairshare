var db = require('../db.js');
var Users = module.exports;


Users.create = function(reqObj){
  return db('users')
    .insert(reqObj)
    .returning('id');
};

Users.getByFacebookId = function(id){
  return db('users')
    .select()
    .where('users.facebookId', '=', id);
}

Users.getByUsername = function(username){
  return db('users')
    .select()
    .where('users.username', '=', username);
};

Users.getById = function(reqObj){
  return db('users')
    .select()
    .where('id', '=', reqObj.id);
};

Users.editProfile = function(reqObj){
  return db('users')
    .where('id', '=', reqObj.id)
    .update(reqObj);
};

Users.getAll = function(){
  return db('users').select();
};

Users.getUsersByExpenseId = function(expenseId){
  return db('user_expenses')
    .select('user_id')
    .where({
      expense_id: expenseId
    })
    .then(function(users){
      var usersFull = users.map(function(user){
        return Users.getById({id: user.user_id})
          .then(function(user){
            return user[0];
          });
      });
      return Promise.resolve(Promise.all(usersFull));
    });
};
