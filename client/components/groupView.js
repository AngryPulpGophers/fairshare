import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';
import {prettyDate, calcBalance, makeGroupObj, test} from '../utility/groupViewHelper';
import Modal from './modal';
import PaymentForm from './paymentForm';
import AddExpense from './addExpense';


export default class GroupView extends Component {
  
  componentWillMount(){
    console.log('hi my name is pjpjpjpjpj',this)
    //call our get groups function
    console.log('currentURL',window.location.href )
    console.log('currentURL type',typeof window.location.href )
    var currentURL = window.location.href
    var ID = currentURL.split('id=')
    console.log(ID[1])
     this.props.getUserByGroup(ID[1])
     console.log('maybe work', this.props.currentGroupUsers)
    //var clickedOnGroup = (this.props.url.location.query.id)
    this.props.getActivity(ID[1])
    //the number on the next line should be the number of activities for the group but PJ had issues with that
    //this number can be as big as you want, just takes up more space in state
    this.props.startDisplay(100)
  }



  render() {
    var currentURL = window.location.href
    var ID = currentURL.split('id=')
    console.log('did this work',ID[1])
    //var { query } = this.props.location
   // console.log('samsam',this.props,'and pj', this.props.params)
     //var what = new Date(this.props.activity[0].created_at)
  //console.log(this.props.activity)
  console.log('maybe work222', this.props.currentGroupUsers)
  var showUserBalance=[];
  showUserBalance=calcBalance.call(this)//this.calcBalance();
  console.log('hi pj, stuff should be here^^^^', showUserBalance)
    var localGroupObj=makeGroupObj.call(this) //this.makeGroupObj()
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
        <h2>Balance</h2>
          {showUserBalance.map(function(user){
            return (
              <span>
            {user.owed.map(function(person){
              return (
                <div>
                  {user.name} {person[Object.keys(person)]>0 ? " is owed $" +person[Object.keys(person)]+" from "+Object.keys(person) 
                  : "owes " + Object.keys(person) +" $"+ -1*person[Object.keys(person)]}
                </div>
              )
            })
            
           }
           </span> 
           )
          }
        )
      }



        <h2>Activity</h2>        
        <PaymentForm
        groupMembers = {this.props.currentGroupUsers}
        userInfo = {this.props.userInfo}
        />
        <AddExpense
        getActivity={this.props.getActivity}
        activity={this.props.activity}
        currentGroupUsers = {this.props.currentGroupUsers}
        url = {this.props.url}
        getUserByGroup = {this.props.getUserByGroup}
        addExpense = {this.props.addExpense}
        userInfo = {this.props.userInfo}
        />
      {/*<p> hi add expense<Link  to={{pathname:'/addExpense',query:{ id:ID[1] , pj:'holly'}}} title="groupView"  className="button primary float-left tiny button">Add Expense</Link> </p>*/}

        <h2>Activity</h2>
        

         {this.props.activity.map(function(activity,index){
            return <div className= {activity.type==='expense' ? "callout alert" :"callout success"}>
              
              {activity.type==='expense' ?
              <div>
                <div>Title: {activity.title} Time:{prettyDate(activity.created_at)} Amount: ${activity.amount}    
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                  <div style={this.props.displayActive[index]}>
                  <div>Note: {activity.note}</div>
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
              <div>{localGroupObj[activity.payee].name} paid {localGroupObj[activity.recipient].name} ${activity.amount} Time:{prettyDate(activity.created_at)} 
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                 <div style={this.props.displayActive[index]}>
                    Note: {activity.note}
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
