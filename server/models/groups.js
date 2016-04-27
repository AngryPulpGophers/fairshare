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
    .select('name', 'desc', 'group_id')
    .innerJoin('user_groups', 'groups.id', 'user_groups.group_id')
    .where({
      user_id: userID
    });
};

Groups.createGroup = function(groupAttrs) {
  var members = groupAttrs.members;
  delete groupAttrs.members;
  return db('groups')
    .insert(groupAttrs, 'id')
    .then(function(id){
      members.forEach(function(memberId){
        db('user_groups')
          .returning()
          .insert({
            user_id: memberId,
            group_id: id[0]
          }).then();
      });
      return Groups.getGroupById(id[0])
        .then(function(resp){
          return resp[0];
        });
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
  var members = expenseAttrs.members;

  delete expenseAttrs.members;
  return db('expenses')
    .insert(expenseAttrs, 'id')
    .then(function(id){
      members.forEach(function(memberId){
        db('user_expenses')
          .returning('id')
          .insert({
            user_id: memberId,
            expense_id: id[0]
          }).then();
      });
      return Groups.getExpenseById(id[0]);
    });
};

Groups.updateExpense = function(expenseAttrs){
  expenseAttrs.updated_at = db.fn.now();
  return db('expenses')
    .where({
      id: expenseAttrs.id
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

Groups.updatePayment = function(paymentAttrs){
  paymentAttrs.updated_at = db.fn.now();
  return db('payments')
    .where({
      id: paymentAttrs.id
    })
    .update(paymentAttrs)
    .then(function(id){
      return Groups.getPaymentById(id);
    });
};
