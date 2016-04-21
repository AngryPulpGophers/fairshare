var db = require('../db.js');

var Groups = module.exports;

Groups.getAllGroups = function(){
  return Promise.resolve(
    db.select().table('groups')
  );
};

Groups.getGroupsByUserId = function(userID) {
  return Promise.resolve(
    db('groups')
      .join('user_groups', 'user_id', userID)
      .select()
  );
};

Groups.getGroupsByGroupId = function(groupID) {
  return Promise.resolve(
    db.select(groupID).table('groups')
  );

};
