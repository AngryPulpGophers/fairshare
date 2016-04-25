import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {  getGroups, getActivity } from '../actions';
import GroupView from '../components/groupView';

class PageGroupView extends Component {

  render() {
    return (
      <GroupView
        getActivity={this.props.getActivity}
        activity={this.props.activity}
      />
    )
  }
}

PageGroupView.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity:PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    //I have no idea if this is right
    activity: state.groups.activity
  }
}

export default connect(mapStateToProps, {
  getActivity
})(PageGroupView)
