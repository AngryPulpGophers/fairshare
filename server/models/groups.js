var db = require('../db.js');

var Groups = module.exports;

Groups.getAllGroups = function(){
  return db.select().table('groups');
};

Groups.getGroupById = function(groupID) {
  return db.select().table('groups')
    .where({
      id: groupID
    });
};

Groups.getGroupsByUserId = function(userID) {
  return db('groups')
    .innerJoin('user_groups', 'groups.id', 'user_groups.group_id')
    .where({
      user_id: userID 
    });
};

Groups.createGroup = function(groupAttrs) {
  db('groups')
    .returning('id')
    .insert(groupAttrs)
    .then(function(ID){
      return Groups.getGroupByGroupId(ID);
    });
};

Groups.getExpenseById = function(expenseId) {
  return db.select().table('expenses')
    .where({
      id: expenseId
    });
};

Groups.getExpensesByGroupId = function(groupId){
  return db.select().table('expenses')
    .where({
      group_id: groupId
    });
};

Groups.createExpense = function(expenseAttrs){
  db('expenses')
    .returning('id')
    .insert(expenseAttrs)
    .then(function(ID){
      return Groups.getExpenseById(ID);
    });
};

Groups.getPaymentById = function(paymentId) {
  return db.select().table('payments')
    .where({
      id: paymentId
    });
};

Groups.getPaymentsByGroupId = function(groupId){
  return db.select().table('payments')
    .where({
      group_id: groupId
    });
};

Groups.createPayment = function(paymentAttrs) {
  db('payments')
    .returning('id')
    .insert(paymentAttrs)
    .then(function(ID){
      return Groups.getPaymentById(ID);
    });
};
