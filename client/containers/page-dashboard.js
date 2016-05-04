import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeCallout } from '../actions/calloutActions';
import { getGroups } from '../actions/groupActions';
import Dashboard from '../components/dashboard';

class PageDashboard extends Component {

  render() {
    return (
        <div>
          <Dashboard
            url={this.props.url}
            callouts={this.props.callouts}
            getGroups={this.props.getGroups}
            isAuthed={this.props.isAuthed}
            groups={this.props.groups}
            userInfo={this.props.userInfo}
          />
      </div>
    )
  }
}

PageDashboard.propTypes = {
  url: PropTypes.string.isRequired,
  callouts: PropTypes.array.isRequired,
  getGroups: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  groups:PropTypes.array.isRequired
}

function mapStateToProps(state) {
  
  return {
    url: state.routing.location.pathname,
    callouts: state.notifications.callouts,
    groups: state.groups.groups,
    isAuthed: state.auth.isAuthed,
    userInfo: state.auth.userInfo
  }
}

export default connect(mapStateToProps, {
  removeCallout,
  getGroups
})(PageDashboard)
