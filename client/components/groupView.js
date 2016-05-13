import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';
import {prettyDate, calcBalance, makeGroupObj, test, showDebt} from '../utility/groupViewHelper';
import Modal from './modal';
import PaymentForm from './paymentForm';
import PaymentError from './paymentError';
import AddExpense from './addExpense';
import defaultPicture from '../images/defaultPicture.jpg';
import UpdateExpense from './updateExpense';

export default class GroupView extends Component {

  seeIfYou(name) {
    if (name===this.props.userInfo.name || name[0]===this.props.userInfo.name){
      return ('You')
    }
    else {
      return name
    }
  }

  componentWillUnmount(){
    this.props.clearActivity()
  }

  render() {
    // get the current group id
    var currentURL = window.location.href
    var ID = currentURL.split('id=')

    //set array to populate with related balances - who owes who what
    var showUserBalance=[];

    //object to hold the users of the current group (just id)
    var localGroupObj={}

    //avoid error on inital page load
    var groupExists = false;

    // once this.props.groups matches current url, set group exists to true
    for(var i = 0; i < this.props.groups.length; i++){
      if(this.props.groups[i].id == ID[1]){
        groupExists = true;
        break;
      }
    }
    if(groupExists){
      showUserBalance=calcBalance.call(this)//this.calcBalance();
      localGroupObj=makeGroupObj.call(this) //this.makeGroupObj()
    }

    //holding all data for each activity that will be loaded into update modal
    var expenseValues={};

    return(
      <div className="group-view">
        <div className="row">
          <div className="small-12 columns">
            <div className="component-wrapper">
              <div className="row">
                <div className="small-12 columns">
                  <PaymentForm
                    userArray = {showUserBalance}
                    groupMembers = {this.props.currentGroupUsers}
                    userInfo = {this.props.userInfo}
                    makePayment = {this.props.makePayment}
                    usePaypal={this.props.usePaypal}
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
                  <PaymentError
                    clearError={this.props.clearError}
                    errorStatus={this.props.errorStatus}
                    errMessage={this.props.errMessage}
                  />
                  <Link className="edit-group" to={{pathname:'/create-group',query:{ id: this.props.currentGroup.id }}}><i className="fa fa-cog"></i></Link>
                </div>
                <div className="small-12 large-4 large-push-8 columns">
                  <h2>Balance</h2>
                  { showDebt.call(this,showUserBalance) }
                </div>
                <div className="small-12 large-8 large-pull-4 columns">
                  
              
                <Modal isOpen={sessionStorage.getItem('success')}>
                  <div style={{textAlign:'center'}}>
                    <h2>Your Transaction was successful!!</h2>
                    <p onClick={() => this.props.makePayment(sessionStorage.getItem('dbEntry'))} style = {{cursor:'pointer', textDecoration:'underline'}}>close</p>
                  </div>
                </Modal>
                
                <h2>Activity</h2>
                {this.props.activity.map(function(activity,index){
                  if(activity.type==='expense'){
                    var holdMemberId=[]
                    expenseValues[activity.id]= {
                      title: activity.title,
                      note: activity.note,
                      amount: activity.amount,
                    }
                    for(var x =0 ; x< activity.members.length ; x++){
                      holdMemberId.push(activity.members[x].id);
                    }
                    for (var i = 0; i < this.props.currentGroupUsers.length ; i++){
                      if (holdMemberId.indexOf(this.props.currentGroupUsers[i].user_id) !== -1){
                        expenseValues[activity.id]['members'+i] = true;
                      }
                    }
                  }
                  return <div key={activity.id + activity.type} className= {activity.type==='expense' ? "callout alert" :"callout success"}>
                  {activity.type==='expense' ?
                    <div>
                      <div>Title: {activity.title} Time:{prettyDate(activity.created_at)} Amount: ${activity.amount}
                        <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                        { this.props.userInfo.id === activity.paid_by ?
                          <UpdateExpense
                            formKey = {'updateExpense'+activity.id}
                            getActivity={this.props.getActivity}
                            activity={this.props.activity}
                            currentActivity = {activity}
                            currentGroupUsers = {this.props.currentGroupUsers}
                            url = {this.props.url}
                            getUserByGroup = {this.props.getUserByGroup}
                            updateExpense = {this.props.updateExpense}
                            userInfo = {this.props.userInfo}
                            initialValues = {expenseValues[activity.id]}
                          /> : null }
                        <div style={this.props.displayActive[index]}>
                          <div className = 'row'>
                            <div className = 'small-12 large-6 columns'>
                              <div>Note: {activity.note}</div>
                              <div>Paid: {this.seeIfYou(localGroupObj[activity.paid_by].name)}</div>
                              <div>Members:
                                { activity.members.map(function(member,index,members){
                                  return (
                                      <div>{this.seeIfYou(member.name)}{index===members.length-1? "" : " "}</div>
                                    )
                                }.bind(this))}
                              </div>
                            </div>
                            <div className = "small-12 large-3 columns">
                              <div> Reciept: 
                                <img src={"/"+(activity.img_url.split('dist/')[1] ? activity.img_url.split('dist/')[1] : defaultPicture)} />
                              </div>
                            </div>
                            <div className = 'large-3 columns'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                      :
                    <div>{this.seeIfYou(localGroupObj[activity.payee].name)} paid {this.seeIfYou(localGroupObj[activity.recipient].name)} ${activity.amount} Time:{prettyDate(activity.created_at)}
                      {activity.pending ? 
                        <div>
                          <button className="button success tiny button" disabled={this.props.userInfo.id !== activity.recipient} onClick={()=>this.props.updatePaymentStatus({group_id: +ID[1], id:activity.id, pending:0})}><i className="fa fa-check circle"></i>Received</button>
                          <br />
                          <p>Pending recipient approval</p>
                        </div>
                        :
                        <div>
                          <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                          Received
                        </div>
                      }
                      <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>
                      <div style={this.props.displayActive[index]}>
                        Note: {activity.note}
                      </div>
                    </div>
                  }
                </div>
                }.bind(this))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
GroupView.propTypes = {
  makePayment: PropTypes.func.isRequired,
  usePaypal: PropTypes.func.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  errorStatus: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
  authPaypal: PropTypes.string.isRequired,
}


