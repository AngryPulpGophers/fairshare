var db = require('../db.js');

var Groups = module.exports;

Groups.getAllGroups = function(){
  return db.select().table('groups');
};

Groups.getGroupsByUserId = function(userID) {
  return db('groups')
    .innerJoin('user_groups', 'groups.id', 'user_groups.group_id')
    .where({
      user_id: userID 
    });
};

Groups.getGroupById = function(groupID) {
  return db.select().table('groups')
    .where({
      id: groupID
    });
};

Groups.createGroup = function(groupAttrs) {
  var grpId = db('groups')
    .returning('id')
    .insert(groupAttrs);
  return Groups.getGroupByGroupId(grpId);
};

Groups.getExpenseById = function(expenseId) {
  return db.select().table('expenses')
    .where({
      id: expenseId
    });
};

Groups.createExpense = function(expenseAttrs){
  var expId = db('expenses')
    .returning('id')
    .insert(expenseAttrs);
  return Groups.getExpenseById(expId);
};


