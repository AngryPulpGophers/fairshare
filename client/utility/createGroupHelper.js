var EditGroup = module.exports;

EditGroup.formatData = function(obj){
  //id: 22, created_at: "2016-05-10T22:33:41.536Z", name: "dzzdc", created_by: 2, desc: "afczx"
  if(obj.name !== undefined){
    return {
      groupName: obj.name,
      groupDesc: obj.desc
    };
  } else {
    return null;
  }
}