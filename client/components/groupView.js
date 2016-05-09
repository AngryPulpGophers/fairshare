import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';
import {prettyDate, calcBalance, makeGroupObj, test} from '../utility/groupViewHelper';
import Modal from './modal';
import PaymentForm from './paymentForm';
import AddExpense from './addExpense';
import defaultPicture from '../images/defaultPicture.jpg'





export default class GroupView extends Component {
  

  seeIfYou(name) {
    if (name===this.props.userInfo.name || name[0]===this.props.userInfo.name){
      return ('You')
    }
    else {
      return name
    }
  }



 render() {
    var currentURL = window.location.href
    console.log('pjpjpjp',currentURL.split('/')[2])
    var ID = currentURL.split('id=')
    console.log('did this work',ID[1])
    console.log('HAIL MARY',__dirname)
  //   var { query } = this.props.location
  //  console.log('samsam',this.props,'and pj', this.props.params)
  //    var what = new Date(this.props.activity[0].created_at)
  // console.log(this.props.activity)
  console.log('maybe work222', this.props.currentGroupUsers)
  console.log('groupView CurrentUser',this.props.userInfo)
  var showUserBalance=[];
  showUserBalance=calcBalance.call(this)//this.calcBalance();
  console.log('hi pj, stuff should be here^^^^', showUserBalance)
    var localGroupObj=makeGroupObj.call(this) //this.makeGroupObj()
    console.log('localGroupOBJ',localGroupObj)
    // var counter = 0;
    // var displayObj={};
    // for (var i = 0; i<this.props.activity.length ; i++){
    //   displayObj[counter] = {
    //     display: 'none'
    //   }

    // }

  // setting this to bypas the need for authentication
    return(
      <div id='hanger'>
        <h2>Balance</h2>
          {showUserBalance.map(function(user){
            return (
              <span key={user.user_id}>
            {user.owed.map(function(person, index){
              return (
                <div key={index+user.name}>


                
                  {this.seeIfYou(user.name)} {this.seeIfYou(user.name)==='You' ? " owe " +Object.keys(person)+" $"+ -1*person[Object.keys(person)] 
                  : "owes " + this.seeIfYou(Object.keys(person)) +" $"+ -1*person[Object.keys(person)]}
                  
                </div>
              
              )
            }.bind(this))
            
           }
           </span> 
           )
          }.bind(this)
        )
      }

        <h2>Activity</h2>  
            
        <PaymentForm
        userArray = {showUserBalance}
        groupMembers = {this.props.currentGroupUsers}
        userInfo = {this.props.userInfo}
        makePayment = {this.props.makePayment}
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

         {this.props.activity.map(function(activity,index){
            return <div key={activity.id + activity.type} className= {activity.type==='expense' ? "callout alert" :"callout success"}>
              
              {activity.type==='expense' ?
              <div>
                <div>Title: {activity.title} Time:{prettyDate(activity.created_at)} Amount: ${activity.amount}    
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                  <div style={this.props.displayActive[index]}>
                    <div className = 'row '>
                      <div className = 'small-12 large-6 columns'>
                        <div>Note: {activity.note}</div>
                        <div>Paid: {this.seeIfYou(localGroupObj[activity.paid_by].name)}</div>
                          <div>Members: 
                            {activity.members.map(function(member,index,members){
                              return <div>
                              {this.seeIfYou(member.name)}{index===members.length-1? "" : " "}</div>
                              }.bind(this))
                            }
                        </div>
                      </div>
                      <div className = "small-12 large-3 columns">
                        <div>Reciept: <img src={"/"+(activity.img_url.split('dist/')[1] ? activity.img_url.split('dist/')[1] : defaultPicture)} /></div>
                      </div>
                      <div className = 'large-3 columns'>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
              :
              <div>{this.seeIfYou(localGroupObj[activity.payee].name)} paid {this.seeIfYou(localGroupObj[activity.recipient].name)} ${activity.amount} Time:{prettyDate(activity.created_at)} 
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
GroupView.propTypes = {
  makePayment: PropTypes.func.isRequired
}


