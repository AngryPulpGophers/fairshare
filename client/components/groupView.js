import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';
import {prettyDate, calcBalance, makeGroupObj, test, showDebt, getImage} from '../utility/groupViewHelper';
import Modal from './modal';
import ReceiptModal from './receiptModal';
import PaymentForm from './paymentForm';
import PaymentError from './paymentError';
import AddExpense from './addExpense';
import defaultPicture from '../images/defaultPicture.jpg';
import UpdateExpense from './updateExpense';

export default class GroupView extends Component {
  seeIfYou(name) {
    if (name===this.props.userInfo.name || name[0]===this.props.userInfo.name){
      return ('You');
    }
    else {
      return name;
    }
  }

  componentWillUnmount(){
    this.props.clearActivity();
  }

  render() {
    // get the current group id
    var currentURL = window.location.href;
    var ID = currentURL.split('id=');

    //set array to populate with related balances - who owes who what
    var showUserBalance=[];

    //object to hold the users of the current group (just id)
    var localGroupObj={};

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
      console.log('SAM WHAT BROKE',this);
      showUserBalance=calcBalance.call(this); //this.calcBalance();
      localGroupObj=makeGroupObj.call(this); //this.makeGroupObj()
    }

    //holding all data for each activity that will be loaded into update modal
    var expenseValues={};

    return(
      <div className="group-view">
        <div className="row">
          <div className="small-12 columns">
            <div className="component-wrapper group-view">
              <div className="row">
                <div className="small-12 columns">
                  <div className="group-header">
                    <h2>{this.props.currGroup.name}</h2>
                    {this.props.currGroup.created_by == this.props.userInfo.id ?
                    <Link className="edit-group" to={{pathname:'/create-group',query:{ id: this.props.currentGroup.id }}}><i className="fa fa-cog"></i></Link> : null}
                    <div className="row">
                      <div className="small-12 columns">
                        <h5>{this.props.currGroup.desc}</h5>
                      </div>
                    </div>
                  </div>
                  <PaymentError
                    clearError={this.props.clearError}
                    errorStatus={this.props.errorStatus}
                    errMessage={this.props.errMessage}
                  />
                </div>
                <div className="group-view-pad">
                <div className="small-12 large-4 large-push-8 columns">
                  <h3>Balance</h3>
                    {showUserBalance.map(function(user){
                      console.log('*^&*%^%*%&*&^*&%*&%got into the show user balance func')

                      return (
                        <span key={user.user_id}>

                          {user.owed.map(function(person, index){
                            return (
                              <div key={index+user.name}>
                                {this.seeIfYou(user.name)} {this.seeIfYou(user.name) === 'You' ? " owe " + Object.keys(person) + " $" + (-1 * person[Object.keys(person)]).toFixed(2)
                                : "owes " + this.seeIfYou(Object.keys(person)) +" $"+ (-1*person[Object.keys(person)]).toFixed(2)}
                              </div>
                            )
                          }.bind(this))}
                        </span>
                      )
                    }.bind(this))
                  }
                </div>
                <div className="small-12 large-8 large-pull-4 columns">

                <Modal isOpen={sessionStorage.getItem('success')}>
                  <div style={{textAlign:'center'}}>
                    <h3>Your Transaction was successful!!</h3>
                    <p onClick={() => this.props.makePayment(sessionStorage.getItem('dbEntry'))} style = {{cursor:'pointer', textDecoration:'underline'}}>close</p>
                  </div>
                </Modal>
                <div className="activity-header">
                  <h3>Activity</h3>
                  <AddExpense
                      getActivity={this.props.getActivity}
                      activity={this.props.activity}
                      currentGroupUsers = {this.props.currentGroupUsers}
                      url = {this.props.url}
                      getUserByGroup = {this.props.getUserByGroup}
                      addExpense = {this.props.addExpense}
                      userInfo = {this.props.userInfo}
                    />
                  <PaymentForm
                    userArray = {showUserBalance}
                    groupMembers = {this.props.currentGroupUsers}
                    userInfo = {this.props.userInfo}
                    makePayment = {this.props.makePayment}
                    usePaypal={this.props.usePaypal}
                  />
                </div>
                {!this.props.activity.length ?
                  <span className="warning label">Add an expense or payment to get started!</span>
                  : null
                }
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
                  return (
                    <div>
                    <div key={activity.id + activity.type} className= {activity.type==='expense' ? "callout expense " :"callout payment"}>
                    {activity.type==='expense' ?
                      <div className="row">
                        <div className="small-9 columns">
                            {getImage(activity, activity.members)}
                            <h5 className="item-title">{this.seeIfYou(localGroupObj[activity.paid_by].name)} spent ${activity.amount} on {activity.title}<a onClick={()=>this.props.toggleDisplay(index)}> details</a></h5>
                            <span className="small-aside">{prettyDate(activity.created_at)}</span>
                            <div className={this.props.displayActive[index].display == "none" ? 'details closed': 'details'}>
                              <div className = 'row'>
                                <div className = 'small-12 columns'>
                                  <div>Members:
                                  { activity.members.map(function(member,index,members){
                                    return (
                                        <div key={activity.type+member.name+activity.id}>{this.seeIfYou(member.name)}{index===members.length-1? "" : " "}</div>
                                      )
                                  }.bind(this))}
                                  </div>
                                </div>
                              </div>
                            </div>

                        </div>
                        <div className="small-3 columns">
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
                              />
                              : null }
                              <div className={this.props.displayActive[index].display == "none" ? 'receipt-holder closed': 'receipt-holder'}>
                                Reciept:
                                <ReceiptModal 
                                  img_src= {"/"+(activity.img_url.split('dist/')[1] ? activity.img_url.split('dist/')[1] : defaultPicture)}
                                  key={activity.id+'activityModal'}
                                />
                              </div>
                        </div>
                      </div>
                      :
                      <div className="row">
                        <div className="small-12 large-9 columns">
                          <img className="roundCorner-image expense-user" src={ localGroupObj[activity.payee].img_url} />
                          <h5 className="item-title">{this.seeIfYou(localGroupObj[activity.payee].name)} paid {this.seeIfYou(localGroupObj[activity.recipient].name)} ${activity.amount} <a title="groupView" className="" onClick={()=>this.props.toggleDisplay(index)}> details</a></h5>
                          <span className="small-aside">{prettyDate(activity.created_at)}</span>

                        </div>
                        <div className="small-12 large-3 columns">
                          {activity.pending ?
                              <span className="float-right text-right">
                              <button className="button success tiny button" disabled={this.props.userInfo.id !== activity.recipient} onClick={()=>this.props.updatePaymentStatus({group_id: +ID[1], id:activity.id, pending:0})}><i className="fa fa-check circle"></i>Received</button><br /> <span className="small-aside">Pending approval</span>
                              </span>
                              :
                              <span>
                                <i className="fa fa-check-circle-o" aria-hidden="true"></i> Received
                              </span>
                          }
                        </div>                        
                      </div>
                    }
                  </div>
                  <div className={this.props.displayActive[index].display == "none" ? 'note closed': 'note'}>
                    Note: {activity.note}
                  </div>
                </div>
                  )
                }.bind(this))}
              </div>
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
}
