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
  return db('groups')
    .insert(groupAttrs, 'id')
    .then(function(id){
      return Groups.getGroupById(id[0]);
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
  return db('expenses')
    .insert(expenseAttrs, 'id')
    .then(function(id){
      return Groups.getExpenseById(id[0]);
    });
};

Groups.updateExpense = function(expenseAttrs, expenseId){
  expenseAttrs.updated_at = db.fn.now();
  return db('expenses')
    .where({
      id: expenseId
    })
    .update(expenseAttrs)
    .then(function(id){
      return Groups.getExpenseById(id);
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
  return db('payments')
    .insert(paymentAttrs, 'id')
    .then(function(id){
      return Groups.getPaymentById(id[0]);
    });
};

Groups.updatePayment = function(paymentAttrs, paymentId){
  paymentAttrs.updated_at = db.fn.now();
  return db('payments')
    .where({
      id: paymentId
    })
    .update(paymentAttrs)
    .then(function(id){
      return Groups.getPaymentById(id);
    });
};
