import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';


export default class GroupView extends Component {
  
  componentWillMount(){
    //call our get groups function
    console.log('currentURL',window.location.href )
    console.log('currentURL type',typeof window.location.href )
    var currentURL = window.location.href
    var ID = currentURL.split('id=')
    console.log(ID[1])
    //var stuff= this.props.getUserByGroup(this.props.url.location.query.id)
     //console.log('please fucking work',stuff)
     this.props.getUserByGroup(ID[1])
     console.log('maybe work', this.props.currentGroupUsers)
    //var clickedOnGroup = (this.props.url.location.query.id)
    this.props.getActivity(ID[1])
    //the number on the next line should be the number of activities for the group but PJ had issues with that
    //this number can be as big as you want, just takes up more space in state
    this.props.startDisplay(100)
  }
  
  prettyDate(milliseconds){
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
    var timeDay = hours + ":" + minutes + " " + am;

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
 
  calcBalance() {

  var groupObj = {}
  for (var i = 0 ; i < this.props.currentGroupUsers.length ; i++){
    groupObj[this.props.currentGroupUsers[i].user_id]=this.props.currentGroupUsers[i]
    groupObj[this.props.currentGroupUsers[i].user_id].balance = 0
  }
console.log('look at me mom',groupObj)
  for (var i = 0 ; i < this.props.activity.length ; i++){
//console.log('where are the strings',this.props.activity[i].amount,typeof this.props.activity[i].amount)
    if (this.props.activity[i].type==='expense'){
      
      
      
    
      for (var x = 0 ; x < this.props.activity[i].members.length ; x++){
        if(this.props.activity[i].paid_by != this.props.activity[i].members[x].id){
          if (x===this.props.activity[i].members.length-1){
            if (round(this.props.activity[i].amount/this.props.activity[i].members.length)*this.props.activity[i].members.length!==this.props.activity[i].amount){
              groupObj[this.props.activity[i].members[x].id].balance -= round((this.props.activity[i].amount/this.props.activity[i].members.length+.01));
          
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
              groupObj[this.props.activity[i].paid_by].balance +=  round((this.props.activity[i].amount* ((this.props.activity[i].members.length-1)/this.props.activity[i].members.length))+.01);
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

      groupObj[this.props.activity[i].payee].balance += this.props.activity[i].amount;
      groupObj[this.props.activity[i].payee].balance = round(groupObj[this.props.activity[i].payee].balance)
      groupObj[this.props.activity[i].recipient].balance -= this.props.activity[i].amount
      groupObj[this.props.activity[i].recipient].balance = round(groupObj[this.props.activity[i].recipient].balance)
    }
  }

  //maybe can use user ID instead if it is available
  var sortedGroup = this.props.currentGroupUsers.sort(function(a,b){
    return a.user_id - b.user_id;
  })

  sortedGroup = sortedGroup.map(function(user){
    console.log(user.user_id,user.balance)
    user.tempBalance = user.balance;
    user.owed = [];
    return user;
  })
//ADD user_ to all id below this point

  for (var p1 = 0; p1 < sortedGroup.length; p1++){

    if (sortedGroup[p1].tempBalance > 0){
      for (var p2 = 0; p2 < sortedGroup.length ; p2++){
        if(p1!==p2){
          if (sortedGroup[p2].tempBalance < 0){
            if((sortedGroup[p1].tempBalance - sortedGroup[p2].tempBalance) > 0){
              // var owesObj = {}
              // owesObj[sortedGroup[p1].id] = -1 * sortedGroup[p2].tempBalance
              sortedGroup[p2].owed.push({[sortedGroup[p1].username] : sortedGroup[p2].tempBalance})
              sortedGroup[p1].owed.push({[sortedGroup[p2].username] : -1 * sortedGroup[p2].tempBalance })
              sortedGroup[p1].tempBalance += sortedGroup[p2].tempBalance;
              sortedGroup[p1].tempBalance = round(sortedGroup[p1].tempBalance)
              sortedGroup[p2].tempBalance = 0;

            }
            else if ((sortedGroup[p1].tempBalance - sortedGroup[p2].tempBalance) <= 0){
              sortedGroup[p2].owed.push({[sortedGroup[p1].username] : -1 * sortedGroup[p1].tempBalance})
              sortedGroup[p1].owed.push({[sortedGroup[p2].username] : sortedGroup[p1].tempBalance })
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
    console.log(user.username,user.owed)
  })


}
  
makeGroupObj(){
  var makeGroupObject = {}
  for (var i = 0 ; i < this.props.currentGroupUsers.length ; i++){
    makeGroupObject[this.props.currentGroupUsers[i].user_id]=this.props.currentGroupUsers[i]
    makeGroupObject[this.props.currentGroupUsers[i].user_id].balance = 0
  }

  return makeGroupObject
}

test(x,obj){
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

  render() {
    //var { query } = this.props.location
   // console.log('samsam',this.props,'and pj', this.props.params)
     //var what = new Date(this.props.activity[0].created_at)
  //console.log(this.props.activity)
  console.log('maybe work222', this.props.currentGroupUsers)
  this.calcBalance();
  console.log('hi pj, stuff should be here^^^^')
    var localGroupObj=this.makeGroupObj()
    var counter = 0;
    var displayObj={};
    for (var i = 0; i<this.props.activity.length ; i++){
      displayObj[counter] = {
        display: 'none'
      }

    }
  // setting this to bypas the need for authentication
    return(
      <div>
        <h2>Activity</h2>
        
         {this.props.activity.map(function(activity,index){
            return <div className= {activity.type==='expense' ? "callout alert" :"callout success"}>
              
              {activity.type==='expense' ?
              <div>
                <div>{activity.title} Time:{this.prettyDate(activity.created_at)} Amount: ${activity.amount}    
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                  <div style={this.props.displayActive[index]}>
                  <div>Note:{activity.note}</div>
                  <div>Paid: {localGroupObj[activity.paid_by].name}</div>
                    <div>Members: 
                      {activity.members.map(function(member,index,members){
                        return <span>
                        {member.name}{index===members.length-1? "" : ", "}</span>
                        })
                      }
                    </div>
                  </div>
                </div>  
              </div>
              :
              <div>{localGroupObj[activity.payee].name} paid {localGroupObj[activity.recipient].name} ${activity.amount} Time:{this.prettyDate(activity.created_at)} 
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                 <div style={this.props.displayActive[index]}>
                    {activity.note}
                  </div>
              </div>
              } 
            </div>
          }.bind(this))}
      </div>
     
    )
  }
}

// GroupView.propTypes = {

//   prettyDate: PropTypes.func.isRequired
// }
