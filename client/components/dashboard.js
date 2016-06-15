import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import GroupList from './groupList';
import Overview from './overview';
import ScreenShot from '../images/screen-shot.png';
import { getUserInfo } from '../actions/authActions';


export default class Dashboard extends Component {

  componentWillReceiveProps(nextProps){
    if(!nextProps.isAuthed){
      browserHistory.push('/');
    }
  }

  render() {
    return(
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
