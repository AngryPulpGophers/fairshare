import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {  getGroups, getActivity,getUserByGroup , addExpense} from '../actions/groupActions';
import GroupView from '../components/groupView';
import { startDisplay, toggleDisplay } from '../actions/calloutActions';
import makePayment from '../actions/paymentActions'

class PageGroupView extends Component {
  // our hacky way of dealing with auth
  constructor(props){
    super(props)
    if(!this.props.isAuthed){
      browserHistory.push('/login')
    }
  }
  render() {
    return (
      <GroupView
        getActivity={this.props.getActivity}
        activity={this.props.activity}
        currentGroupUsers = {this.props.currentGroupUsers}
        userInfo = {this.props.userInfo}
        url = {this.props.url}
        getUserByGroup = {this.props.getUserByGroup}
        startDisplay = {this.props.startDisplay}
        toggleDisplay = {this.props.toggleDisplay}
        displayActive = {this.props.displayActive}
        userInfo = {this.props.userInfo}
        addExpense = {this.props.addExpense}
        makePayment = {this.props.makePayment}
      />
    )
  }
}

PageGroupView.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity:PropTypes.array.isRequired,
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
    makePayment: PropTypes.func.isRequired
  }
}

export default connect(mapStateToProps, {
  getActivity,getUserByGroup,startDisplay,toggleDisplay, addExpense
})(PageGroupView)
