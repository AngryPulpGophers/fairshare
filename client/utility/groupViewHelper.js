var Helper = module.exports

Helper.prettyDate = function(milliseconds){
    var date = new Date(milliseconds)
    //console.log('samsam',this.props.location,'and pj', this.props.params)
    var am = "AM";
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (hours > 12) {
      hours = hours - 12;
      am = "PM";
    } else if (hours === 0){
      hours = hours + 12;
      am = "AM";
    } else if (hours === 12){
      am = "PM";
    }
    var timeDay = hours + ":" + (minutes>=10 ? minutes : ("0" + minutes))+ " " + am;

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var date = new Date(milliseconds);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var time = monthNames[monthIndex]+" "+day+", " +year+' '+ timeDay;
    return time;

  }
   /*
      <div classname = 'groupView'>
        <img src="http://i.imgur.com/4GXzMQB.jpg" />
      </div>
      */
 
  Helper.calcBalance = function() {
    if (this.props.currentGroupUsers){
console.log('what is going on',this.props.activity)
  var groupObj = {}
  for (var i = 0 ; i < this.props.currentGroupUsers.length ; i++){
    groupObj[this.props.currentGroupUsers[i].user_id]=this.props.currentGroupUsers[i]
    groupObj[this.props.currentGroupUsers[i].user_id].balance = 0
    groupObj[this.props.currentGroupUsers[i].user_id].tempBalance = 0
  }

for (var key in groupObj){
  console.log('look at me mom',groupObj[key].balance)
}
  for (var i = 0 ; i < this.props.activity.length ; i++){

console.log('where are the strings',this.props.activity[i].amount,typeof this.props.activity[i].amount)
    if (this.props.activity[i].type==='expense'){
      
      
      
    
      for (var x = 0 ; x < this.props.activity[i].members.length ; x++){
        console.log('this is important',this.props.activity[i].members.length )
        if(this.props.activity[i].paid_by != this.props.activity[i].members[x].id){
          if (x===this.props.activity[i].members.length-1){
            if (round(this.props.activity[i].amount/this.props.activity[i].members.length)*this.props.activity[i].members.length!==this.props.activity[i].amount){
              groupObj[this.props.activity[i].members[x].id].balance -= round((this.props.activity[i].amount/this.props.activity[i].members.length+
                round(this.props.activity[i].amount-round(this.props.activity[i].amount/this.props.activity[i].members.length)*this.props.activity[i].members.length)));
            }
            else {
              groupObj[this.props.activity[i].members[x].id].balance -= round((this.props.activity[i].amount/this.props.activity[i].members.length));
            } 
          }
          else {
            groupObj[this.props.activity[i].members[x].id].balance -= round((this.props.activity[i].amount/this.props.activity[i].members.length));
          }
        }
        else {
          if (x===this.props.activity[i].members.length-1){

            if (round(this.props.activity[i].amount/this.props.activity[i].members.length)*this.props.activity[i].members.length!==this.props.activity[i].amount){
              groupObj[this.props.activity[i].paid_by].balance +=  round((this.props.activity[i].amount* ((this.props.activity[i].members.length-1)/this.props.activity[i].members.length))+
                round(this.props.activity[i].amount-round(this.props.activity[i].amount/this.props.activity[i].members.length)*this.props.activity[i].members.length));
              groupObj[this.props.activity[i].paid_by].balance =  round(groupObj[this.props.activity[i].paid_by].balance)
            } 
            else {
              groupObj[this.props.activity[i].paid_by].balance +=  round((this.props.activity[i].amount* ((this.props.activity[i].members.length-1)/this.props.activity[i].members.length)));
              groupObj[this.props.activity[i].paid_by].balance =  round(groupObj[this.props.activity[i].paid_by].balance)
            }
          }
          else {
            groupObj[this.props.activity[i].paid_by].balance +=  round((this.props.activity[i].amount* ((this.props.activity[i].members.length-1)/this.props.activity[i].members.length)));
            groupObj[this.props.activity[i].paid_by].balance =  round(groupObj[this.props.activity[i].paid_by].balance)
          }
        }
      }
    }

    if ( this.props.activity[i].type === 'payment'){
      groupObj[this.props.activity[i].payee].balance= round(groupObj[this.props.activity[i].payee].balance)
      groupObj[this.props.activity[i].payee].balance += round(this.props.activity[i].amount);
      groupObj[this.props.activity[i].payee].balance = round(groupObj[this.props.activity[i].payee].balance)
      groupObj[this.props.activity[i].recipient].balance=round(groupObj[this.props.activity[i].recipient].balance)
      groupObj[this.props.activity[i].recipient].balance -= round(this.props.activity[i].amount)
      groupObj[this.props.activity[i].recipient].balance = round(groupObj[this.props.activity[i].recipient].balance)  
    }
  }

  //maybe can use user ID instead if it is available
 // console.log('balances should be here',groupObj)
var sortedGroup = [];
  for (var user in groupObj){
    // console.log('real balance',groupObj[user].balance)
    sortedGroup.push(groupObj[user])
  }

sortedGroup = sortedGroup.sort(function(a,b){
  if (a.user_id){
   // console.log('user_id')
    return a.user_id - b.user_id;
  }
  })
console.log('so confused',sortedGroup)
  for (var i=0 ; i<sortedGroup.length; i++){
   sortedGroup[i].balance = round(sortedGroup[i].balance);
   //console.log('pj',sortedGroup[i].balance)
    sortedGroup[i].tempBalance = round(sortedGroup[i].balance);
   // console.log('holly',sortedGroup[i].tempBalance)
    sortedGroup[i].owed = [];
   
  }

  //console.log('current status', sortedGroup)
//ADD user_ to all id below this point

  for (var p1 = 0; p1 < sortedGroup.length; p1++){

    if (sortedGroup[p1].tempBalance > 0){
      for (var p2 = 0; p2 < sortedGroup.length ; p2++){
        if(p1!==p2){
          if (sortedGroup[p2].tempBalance < 0){
            if((sortedGroup[p1].tempBalance - sortedGroup[p2].tempBalance) > 0){
              sortedGroup[p2].owed.push({[sortedGroup[p1].name] : sortedGroup[p2].tempBalance})
              sortedGroup[p1].owed.push({[sortedGroup[p2].name] : -1 * sortedGroup[p2].tempBalance })
              sortedGroup[p1].tempBalance += sortedGroup[p2].tempBalance;
              sortedGroup[p1].tempBalance = round(sortedGroup[p1].tempBalance)
              sortedGroup[p2].tempBalance = 0;

            }
            else if ((sortedGroup[p1].tempBalance - sortedGroup[p2].tempBalance) <= 0){
              sortedGroup[p2].owed.push({[sortedGroup[p1].name] : -1 * sortedGroup[p1].tempBalance})
              sortedGroup[p1].owed.push({[sortedGroup[p2].name] : sortedGroup[p1].tempBalance })
              sortedGroup[p2].tempBalance += sortedGroup[p1];
              sortedGroup[p2].tempBalance = round(sortedGroup[p2].tempBalance)
              sortedGroup[p1].tempBalance = 0;
            }
          }
        }
      }
    }


  }


  function round(num) {
    //console.log('broke here',num)
    num=Number(num)
    return Number(num.toFixed(2))
  }


  console.log(sortedGroup)
  sortedGroup.map(function(user){
    console.log(user.name,user.owed)
  })
return sortedGroup;
}
else{
  console.log('rico hello there')
  return [];
}

}
  
Helper.makeGroupObj = function(){
  var makeGroupObject = {}
  for (var i = 0 ; i < this.props.currentGroupUsers.length ; i++){
    makeGroupObject[this.props.currentGroupUsers[i].user_id]=this.props.currentGroupUsers[i]
    //makeGroupObject[this.props.currentGroupUsers[i].user_id].balance = 0
  }

  return makeGroupObject
}

Helper.test = function(x,obj){
  console.log('holly', x,obj)
  if (obj.display==='none'){
    delete obj.display;
    return {}
  }
  else{
    return {
      display: 'none'
    }
  }
}