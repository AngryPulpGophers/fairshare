import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {  getGroups, getActivity,getUserByGroup } from '../actions/groupActions';
import GroupView from '../components/groupView';

class PageGroupView extends Component {

  render() {
    return (
      <GroupView
        getActivity={this.props.getActivity}
        activity={this.props.activity}
        currentGroupUsers = {this.props.currentGroupUsers}
        url = {this.props.url}
        getUserByGroup = {this.props.getUserByGroup}
      />
    )
  }
}

PageGroupView.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity:PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  console.log('page-groupview',state)
  return {
    //I have no idea if this is right
    activity: state.groups.activity,
    currentGroupUsers: state.groups.currentGroupUsers,
    url: state.routing
  }
}

export default connect(mapStateToProps, {
  getActivity,getUserByGroup
})(PageGroupView)
