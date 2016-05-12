import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route,Link } from 'react-router';
import GroupList from './groupList';
import {prettyDate, calcBalance, makeGroupObj, test} from '../utility/groupViewHelper';
import Modal from './modal';
import PaymentForm from './paymentForm';
import PaymentError from './paymentError';
import AddExpense from './addExpense';
import defaultPicture from '../images/defaultPicture.jpg';
import UpdateExpense from './updateExpense';

export default class GroupView extends Component {
  constructor(props){
    super(props)
    this.state = ({
      isModalOpen: false
    })
  }

  seeIfYou(name) {
    if (name===this.props.userInfo.name || name[0]===this.props.userInfo.name){
      return ('You')
    }
    else {
      return name
    }
  }

  handleDeleteGroup(){
    this.setState({isModalOpen:true});
  }

  render() {
    var currentURL = window.location.href
      //console.log('pjpjpjp',currentURL.split('/')[2])
    var ID = currentURL.split('id=')

    // console.log('did this work',ID[1])
    // console.log('HAIL MARY',__dirname)
  //   var { query } = this.props.location
  //  console.log('samsam',this.props,'and pj', this.props.params)
  //    var what = new Date(this.props.activity[0].created_at)
  // console.log(this.props.activity)
  // console.log('maybe work222', this.props.currentGroupUsers)
  // console.log('groupView CurrentUser',this.props.userInfo)
  var showUserBalance=[];
  // console.log('hi pj, stuff should be here^^^^', showUserBalance)
    var localGroupObj={}
  //console.log('this.props in groupView:', this.props)

    // console.log('localGroupOBJ',localGroupObj)
    // var counter = 0;
    // var displayObj={};
    // for (var i = 0; i<this.props.activity.length ; i++){
    //   displayObj[counter] = {
    //     display: 'none'
    //   }
    var localGroupObj = {};
    var groupExists = false;
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
    var expenseValues={};

  // setting this to bypas the need for authentication
    return(
      <div>
        <Modal className='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
          <div className="row">
            <div className="small-12 large-7 large-centered columns text-center">
              <h3>Are you sure?</h3>
              <p>This process cannot be undone. All group expense and payment info will be lost!</p>
              <p><button onClick={()=>{this.props.deleteGroup(this.props.currentGroup)}} className="alert button">Delete</button><button onClick={()=>{this.setState({isModalOpen:false})}} className="secondary button">Cancel</button></p>
            </div>
          </div>
        </Modal>
        <button onClick={() => { this.handleDeleteGroup()} } className="alert button">Delete Group</button>

        <Link to={{pathname:'/create-group',query:{ id: this.props.currentGroup.id }}}  className="secondary button">Edit Group</Link>
    <div>
      <PaymentError
      clearError={this.props.clearError}
      errorStatus={this.props.errorStatus}
      errMessage={this.props.errMessage}
      />
      <Modal isOpen={sessionStorage.getItem('success')}>
        <div style={{textAlign:'center'}}>
          <h2>Your Transaction was successful!!</h2>
          <p onClick={() => this.props.makePayment(sessionStorage.getItem('dbEntry'))} style = {{cursor:'pointer', textDecoration:'underline'}}>close</p>
        </div>
      </Modal>
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
      {/*<p> hi add expense<Link  to={{pathname:'/addExpense',query:{ id:ID[1] , pj:'holly'}}} title="groupView"  className="button primary float-left tiny button">Add Expense</Link> </p>*/}

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
            console.log('all my hard work for this',expenseValues[activity.id])
        }

            return <div key={activity.id + activity.type} className= {activity.type==='expense' ? "callout alert" :"callout success"}>

              {activity.type==='expense' ?
              <div>
                <div>Title: {activity.title} Time:{prettyDate(activity.created_at)} Amount: ${activity.amount}
                <button title="groupView"  className="button primary tiny button" onClick={()=>this.props.toggleDisplay(index)}>details</button>

                  {this.props.userInfo.id===activity.paid_by?
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
                  />:null}
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
                {activity.pending ? <div><button className="button success tiny button" disabled={this.props.userInfo.id !== activity.recipient} onClick={()=>this.props.updatePaymentStatus({group_id: +ID[1], id:activity.id, pending:0})}><i className="fa fa-check circle"></i>Received</button>
                <br></br><p>Pending recipient approval</p></div>:<div><i className="fa fa-check-circle-o" aria-hidden="true"></i>Received</div>}
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


