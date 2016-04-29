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
          />
          {/*<div className="row">
        <div className="small-12 large-4 large-push-8 columns small-uncollapse large-collapse">
          column here
        </div>
        <div className="small-12 large-8 large-pull-4 columns small-uncollapse large-collapse">
        </div>
      </div>*/}
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
