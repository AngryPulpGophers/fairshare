import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeCallout } from '../actions/calloutActions';
import { getGroups } from '../actions/groupActions';
import Dashboard from '../components/dashboard';

class PageDashboard extends Component {
  render() {
    return (
      <Dashboard
        url={this.props.url}
        callouts={this.props.callouts}
        removeCallout={this.props.removeCallout}
        getGroups={this.props.getGroups}
        isAuthed={this.props.isAuthed}
        groups={this.props.groups}
      />
    )
  }
}

PageDashboard.propTypes = {
  url: PropTypes.string.isRequired,
  callouts: PropTypes.array.isRequired,
  removeCallout: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  groups:PropTypes.array.isRequired
}

function mapStateToProps(state) {
console.log('state notifications:',state.notifications)
  
  return {
    url: state.routing.location.pathname,
    callouts: state.notifications.callouts,
    groups: state.groups.groups,
    isAuthed: state.auth.isAuthed
  }
}

export default connect(mapStateToProps, {
  removeCallout,
  getGroups
})(PageDashboard)
