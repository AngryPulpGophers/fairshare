var EditGroup = module.exports;

EditGroup.formatData = function(obj,currUser){
  var mems = [];
  if(obj.name !== undefined){
    for (var i = 0; i < obj.members.length; i++) {
      if(obj.members[i].user_id != currUser.id){
        obj.members[i].disabled = true;
        mems.push(obj.members[i]);
      }
    }
    var groupObj = {
      groupName: obj.name,
      groupDesc: obj.desc,
      groupMems: mems,
      updateGroup: true,
      groupID: obj.id
    };
    return groupObj;
  } else {
    return null;
  }
};
