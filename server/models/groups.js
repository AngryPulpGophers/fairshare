var db = require('../db.js');
var Users   = require('./users.js');

var Groups = module.exports;

Groups.getAllGroups = function(){
  return db.select().table('groups');
};

Groups.getGroupById = function(groupID) {
  return db.select().table('groups')
    .where({
      id: groupID
    })
    .then(function(data){
      return data[0];
    });
};

Groups.getGroupsByUserId = function(userID) {
  return db('groups')
    .select('name', 'desc', 'created_at', 'group_id AS id')
    .innerJoin('user_groups', 'groups.id', 'user_groups.group_id')
    .where({
      user_id: userID
    })
    .then(function(data){
      var groups = data.map(function(group){
        return Users.getUsersByGroupId(group.id)
        .then(function(data){
          group.members = data;
          return group;
        });
      });
      return Promise.all(groups);
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
          return resp;
        });
    });
};

Groups.addMember = function(attrs){
  return db('user_groups')
    .insert({
      group_id: attrs.group_id,
      user_id: attrs.user_id
    });
};

Groups.getExpenseById = function(expenseId) {
  return db.select().table('expenses')
    .where({
      id: expenseId
    })
    .then(function(data){
      return data[0];
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
            expense_id: id[0],
            group_id: expenseAttrs.group_id
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
    .update(expenseAttrs, 'id')
    .then(function(id){
      return Groups.getExpenseById(id[0]);
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
    })
    .then(function(data){
      return data[0];
    });
};

Groups.updatePayment = function(paymentAttrs){
  paymentAttrs.updated_at = db.fn.now();
  return db('payments')
    .where({
      id: paymentAttrs.id
    })
    .update(paymentAttrs, 'id')
    .then(function(id){
      return Groups.getPaymentById(id[0]);
    })
    .then(function(data){
      return data[0];
    });
};

Groups.updateBalance = function(attrs){
  return db('user_groups')
    .where({
      group_id: attrs.group_id,
      user_id: attrs.user_id
    })
    .update(attrs, 'balance')
    .then(function(balance){
      return balance[0];
    });
};

Groups.deleteGroupById = function(groupId){
  return db('groups')
    .where('id', '=', groupId)
    .del().then();
};

Groups.deleteExpensesByGroupId = function(groupId){
  return db('expenses')
    .where('group_id', '=', groupId)
    .del().then();
};

Groups.deletePaymentsByGroupId = function(groupId){
  return db('payments')
    .where('group_id', '=', groupId)
    .del().then();
};

Groups.deleteUserGroups = function(groupId){
  return db('user_groups')
    .where('group_id', '=', groupId)
    .del().then();
};
