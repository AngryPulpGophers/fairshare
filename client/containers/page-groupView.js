import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {  getGroups, getActivity } from '../actions/groupActions';
import GroupView from '../components/groupView';

class PageGroupView extends Component {

  render() {
    return (
      <GroupView
        getActivity={this.props.getActivity}
        activity={this.props.activity}
        currentGroup = {this.props.currentGroup}
        url = {this.props.url}
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
    currentGroup: state.groups.currentGroup,
    url: state.routing
  }
}

export default connect(mapStateToProps, {
  getActivity
})(PageGroupView)
