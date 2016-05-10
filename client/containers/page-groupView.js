import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {  getGroups, getActivity,getUserByGroup , addExpense, makePayment, deleteGroup, setCurrentGroup, indBalance, updateExpense } from '../actions/groupActions';
import GroupView from '../components/groupView';
import { startDisplay, toggleDisplay } from '../actions/calloutActions';


class PageGroupView extends Component {
  // our hacky way of dealing with auth


  componentWillReceiveProps(nextProps){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
    }
  }

  componentWillMount(){
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
    }
    var currentURL = window.location.href
    var ID = currentURL.split('id=')
    this.props.getUserByGroup(ID[1])

    //var clickedOnGroup = (this.props.url.location.query.id)
    this.props.getActivity(ID[1])
    //the number on the next line should be the number of activities for the group but PJ had issues with that
    //this number can be as big as you want, just takes up more space in state
    this.props.startDisplay(100)

    this.props.setCurrentGroup(ID[1])
  }

  render() {
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
        userInfo = {this.props.userInfo}
        addExpense = {this.props.addExpense}
        makePayment = {this.props.makePayment}
        deleteGroup = {this.props.deleteGroup}
        indBalance = {this.props.indBalance}
        updateExpense = {this.props.updateExpense}
      />
    </div>
    )
  }
}

PageGroupView.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity:PropTypes.array.isRequired,
  makePayment: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
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
    currentGroup: state.groups.currentGroup
  }
}

export default connect(mapStateToProps, {
  getActivity,
  getUserByGroup,
  startDisplay,
  toggleDisplay,
  addExpense,
  makePayment,
  deleteGroup,
  setCurrentGroup,
  indBalance,
  updateExpense
})(PageGroupView)
