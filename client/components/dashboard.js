import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import GroupList from './groupList';
import Overview from './overview';


export default class Dashboard extends Component {

  render() {
  // setting this to bypas the need for authentication
  const isAuthed = this.props.isAuthed;

    return isAuthed ? (
      <div className="dashboard">
        <div className="component-wrapper">
          <Overview 
            userInfo={this.props.userInfo}
            dashboard={this.props.dashboard} 
          />
          <Link to='/create-group' className="large primary button expanded">+ New Group</Link>
          <GroupList
            getGroups={this.props.getGroups}
            groups={this.props.groups}
            userInfo={this.props.userInfo}
            stopSocialModal={this.props.stopSocialModal}
          />
        </div>
      </div>
      )
      : (
      <div className="dashboard">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <div className="component-wrapper">
              <h1>Welcome to Fairshare</h1>
              <Link to='/login' title="Get Started" className="button primary"><i className="fa fa-balance-scale"></i>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  stopSocialModal: PropTypes.func.isRequired,
  callouts: PropTypes.array.isRequired,
  getGroups: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired
}
