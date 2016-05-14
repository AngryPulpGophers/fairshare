import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route, browserHistory } from 'react-router';
import {  getGroups, getGroup, getActivity,getUserByGroup , addExpense, makePayment, setCurrentGroup, indBalance, updateExpense, usePaypal, updatePaymentStatus, clearError, clearActivity, clearEdit } from '../actions/groupActions';
import GroupView from '../components/groupView';
import { startDisplay, toggleDisplay } from '../actions/calloutActions';


class PageGroupView extends Component {

  // our hacky way of dealing with auth
  componentWillReceiveProps(nextProps){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login');
    }
  }

  componentWillMount(){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login');
    }
    var currentURL = window.location.href;
    var ID = currentURL.split('id=');
    this.props.getUserByGroup(ID[1]);
    this.props.getGroups();
    //var clickedOnGroup = (this.props.url.location.query.id)
    this.props.getActivity(ID[1]);
    //the number on the next line should be the number of activities for the group but PJ had issues with that
    //this number can be as big as you want, just takes up more space in state
    this.props.startDisplay(100);

    this.props.setCurrentGroup(ID[1]);
    //call

    this.props.getGroup(ID[1]);

  }
  componentWillUnmount(){
    //clear out our saved form data
    this.props.clearEdit();
  }
  render() {
    console.log('this.props in page groupview:', this.props);
    return (
    <div>
      <GroupView
        getActivity={this.props.getActivity}
        activity={this.props.activity}
        currentGroupUsers = {this.props.currentGroupUsers}
        currentGroup = {this.props.currentGroup}
        userInfo = {this.props.userInfo}
        url = {this.props.url}
        getUserByGroup = {this.props.getUserByGroup}
        toggleDisplay = {this.props.toggleDisplay}
        displayActive = {this.props.displayActive}
        addExpense = {this.props.addExpense}
        makePayment = {this.props.makePayment}
        indBalance = {this.props.indBalance}
        groups = {this.props.groups}
        updateExpense = {this.props.updateExpense}
        usePaypal={this.props.usePaypal}
        updatePaymentStatus={this.props.updatePaymentStatus}
        errorStatus={this.props.errorStatus}
        errMessage={this.props.errMessage}
        clearError={this.props.clearError}
        clearActivity = {this.props.clearActivity}
        currGroup={this.props.editGroup}

      />
    </div>
    )
  }
}

PageGroupView.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity:PropTypes.array.isRequired,
  makePayment: PropTypes.func.isRequired,
}

function mapStateToProps(state) {

  return {
    //I have no idea if this is right
    activity: state.groups.activity,
    currentGroupUsers: state.groups.currentGroupUsers,
    url: state.routing,
    displayActive: state.notifications.displayActive,
    userInfo: state.auth.userInfo,
    isAuthed: state.auth.isAuthed,
    auth: state.auth,
    currentGroup: state.groups.currentGroup,
    groups: state.groups.groups,
    errorStatus: state.groups.activityError,
    errMessage: state.groups.errorMessage,
    editGroup: state.groups.editGroup,
  }
}

export default connect(mapStateToProps, {
  getActivity,
  getUserByGroup,
  startDisplay,
  toggleDisplay,
  addExpense,
  makePayment,
  setCurrentGroup,
  indBalance,
  getGroups,
  updateExpense,
  usePaypal,
  updatePaymentStatus,
  clearError,
  clearActivity,
  getGroup,
  clearEdit
})(PageGroupView)
