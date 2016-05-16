import React from 'react';

var Helper = module.exports;

Helper.prettyDate = function(milliseconds){
    var date = new Date(milliseconds);
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

  };
   /*
      <div classname = 'groupView'>
        <img src="http://i.imgur.com/4GXzMQB.jpg" />
      </div>
      */

  Helper.calcBalance = function() {
    if (this.props.currentGroupUsers){
console.log('what is going on', this.props.currentGroupUsers);
//make a group object from current group array

var groupObj = this.props.currentGroupUsers.reduce((acc,member) => {
  acc[member.user_id] = member;
  acc[member.user_id].balance = 0;
  acc[member.user_id].tempBalance = 0;
  return acc;
},{});

console.log('groupObj in helper:', groupObj);

var splitActivities = (array) => {
  let [pay,cost] = [[],[]];
  array.forEach( act => {
    if(act.type === 'expense'){
      cost.push(act);
    }else{
      pay.push(act);
    }
  })
  return [pay,cost];
}

let [payments,expenses] = splitActivities(this.props.activity);

//loop through each activity the group has
  expenses.forEach(act => {
    act.members.filter( person => person.id !== act.paid_by)
    .forEach( (person,idx) => {
      let portion = round(act.amount/act.members.length)
      let pennies = round(act.amount) - (round((act.amount/act.members.length) * act.members.length));
      if(idx === act.members.length - 1){
        groupObj[person.id].balance = round(groupObj[person.id].balance) - (portion + pennies);
      }else{
        groupObj[person.id].balance = round(groupObj[person.id].balance) - portion;
      }
        groupObj[act.paid_by].balance = round(groupObj[act.paid_by].balance) + portion;
    })
  })


payments.forEach(act => {
  groupObj[act.payee].balance = round(groupObj[act.payee].balance) + round(act.amount);
  groupObj[act.recipient].balance = round(groupObj[act.recipient].balance) - round(act.amount);
})


//this code sets up balance in user_groups table
 //refactor this to use a state variable later
 var currentURL = window.location.href;
    var ID = currentURL.split('id=')[1];

var tempObj = {};
for (var ind in groupObj){
  tempObj.user_id = Number(ind);
  tempObj.group_id = Number(ID);
  tempObj.balance = round(groupObj[ind].balance);
  // console.log('NEW PJ',tempObj.user_id,'USER',
  // tempObj.group_id,'group',
  // tempObj.balance);
  this.props.indBalance(JSON.stringify(tempObj));
  tempObj = {};
}


  //for some reason I thought it was logical to sort the group before I settled all of the debt
  // so that is done here

  //maybe can use user ID instead if it is available
 // console.log('balances should be here',groupObj)
  var sortedGroup = [];
  for (var user in groupObj){
    // console.log('real balance',groupObj[user].balance)
    sortedGroup.push(groupObj[user]);
  }


sortedGroup = sortedGroup.map( obj => {
  obj.tempBalance = obj.balance;
  obj.owed = [];
  return obj;
})


  //console.log('current status', sortedGroup)
//ADD user_ to all id below this point

  //loop through every member in group
  for (var p1 = 0; p1 < sortedGroup.length; p1++){
    //only do logic if member is owed money
    if (sortedGroup[p1].tempBalance > 0){
      //if member is owed money loop through the rest of the group
      for (var p2 = 0; p2 < sortedGroup.length ; p2++){
        //ignore the same person
        if(p1!==p2){
          //if you find a person that owes money
          if (sortedGroup[p2].tempBalance < 0){
            //if the person doesnt owe enough to cover person1s balance
            if((sortedGroup[p1].tempBalance + sortedGroup[p2].tempBalance) > 0){
                  // console.log(sortedGroup[p1].name,sortedGroup[p1].tempBalance,sortedGroup[p2].name,sortedGroup[p2].tempBalance)
              sortedGroup[p2].owed.push({[sortedGroup[p1].name] : sortedGroup[p2].tempBalance});
              //test to only show 'person2 owes person 1 $$$'
              //sortedGroup[p1].owed.push({[sortedGroup[p2].name] : -1 * sortedGroup[p2].tempBalance })
              sortedGroup[p1].tempBalance += sortedGroup[p2].tempBalance;
              sortedGroup[p1].tempBalance = round(sortedGroup[p1].tempBalance);
              sortedGroup[p2].tempBalance = 0;
              //if person ones debt is settled, then stop looking for members to give him money
              if(sortedGroup[p1].tempBalance===0){
                break;
              }
              //console.log(sortedGroup[p1].name,sortedGroup[p1].tempBalance,sortedGroup[p2].name,sortedGroup[p2].tempBalance)
            }
            //if person 2 does have enough to cover persons ones balance
            else if ((sortedGroup[p1].tempBalance + sortedGroup[p2].tempBalance) <= 0){
                 // console.log(sortedGroup[p1].name,sortedGroup[p1].tempBalance,sortedGroup[p2].name,sortedGroup[p2].tempBalance)
              sortedGroup[p2].owed.push({[sortedGroup[p1].name] : -1 * sortedGroup[p1].tempBalance});
              //test to only show 'person2 owes person 1 $$$'
              //sortedGroup[p1].owed.push({[sortedGroup[p2].name] : sortedGroup[p1].tempBalance })
              sortedGroup[p2].tempBalance += sortedGroup[p1].tempBalance;
              sortedGroup[p2].tempBalance = round(sortedGroup[p2].tempBalance);
              sortedGroup[p1].tempBalance = 0;
              //person one needs no more money, so stop looking through members to give him money
              break;
                  // console.log(sortedGroup[p1].name,sortedGroup[p1].tempBalance,sortedGroup[p2].name,sortedGroup[p2].tempBalance)
            }
          }
        }
      }
    }
  }

//all numbers passed into this function is a string, so this function turns it into a number then rounds it to 2 decimalpoints
//which turns it back into a string, so i turn it into a number again
  function round(num) {
    //console.log('broke here',num)
    num=Number(num);
    return Number(num.toFixed(2));
  }


  // console.log(sortedGroup)
  //very useful console.logs
  sortedGroup.map(function(user){
    // console.log(user.name,user.owed)
  });
return sortedGroup;
}
else{
  return [];
}

};

Helper.makeGroupObj = function(){
  var makeGroupObject = {};
  for (var i = 0 ; i < this.props.currentGroupUsers.length ; i++){
    makeGroupObject[this.props.currentGroupUsers[i].user_id]=this.props.currentGroupUsers[i];
    //makeGroupObject[this.props.currentGroupUsers[i].user_id].balance = 0
  }

  return makeGroupObject;
};

Helper.test = function(x,obj){
  // console.log('holly', x,obj)
  if (obj.display==='none'){
    delete obj.display;
    return {};
  }
  else{
    return {
      display: 'none'
    };
  }
};


Helper.showDebt = function(showUserBalance){
  var testBal = 0;
  for (var i = 0 ; i < showUserBalance.length ; i++){
    for (var x = 0 ; x < showUserBalance[i].owed.length ; x++){
      testBal = testBal + Number(showUserBalance[i].owed[x][Object.keys(showUserBalance[i].owed[x])]);
    }
  }
  if (testBal===0){
    return (
      <div>Your group has a $0 balance</div>)
  }

  return showUserBalance.map(function(user){
    return (
      <span key={user.user_id}>
        {user.owed.map(function(person, index){
          return (
            <div key={index+user.name}>
              {this.seeIfYou(user.name)} {this.seeIfYou(user.name) === 'You' ? " owe " + Object.keys(person) + " $" + (-1 * person[Object.keys(person)]).toFixed(2)
          : "owes " + this.seeIfYou(Object.keys(person)) +" $"+ (-1*person[Object.keys(person)]).toFixed(2)}
            </div>
            )
          }.bind(this))
        }
      </span>
    )
  }.bind(this))
}
Helper.getImage = function(activity,members){
  let img;
  members.forEach(member => {
    if(member.id == activity.paid_by){
      // console.log('here is the image:', member.img_url)
      img = member.img_url;
    }
  })
  return <img className="roundCorner-image expense-user" src={img} />;
}
