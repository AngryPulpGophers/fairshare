import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, location } from 'react-router';
import Profile from '../components/profile';
import Friend from '../components/friendProfileView';
import { getFriendProfile } from '../actions/userActions';
import { getGroups } from '../actions/groupActions';
import {updateUserInfo, resetAlert, unlinkSocialAcc, stopSocialModal} from '../actions/authActions';

class PageProfile extends Component {

  componentWillMount(){
    let currentURL = window.location.href.split('username=')[1];
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login');
    }
  }

  componentWillReceiveProps(nextProps){
    //changed from nextProps.isAuthed
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login');
    }
  }
  componentDidMount(){
    this.props.getGroups();
  }

  render() {

    let username = window.location.href.split('username=')[1];
    let isFriend = true;

    if ( username === undefined || this.props.userInfo.username === username) {
      isFriend = false;
    } else if (this.props.friendProfile.username !== username){
      username ? this.props.getFriendProfile(username) : null;
    }

    const myInitialValues = {
      initialValues: {
        name: this.props.userInfo.name,
        email: this.props.userInfo.email,
        username: this.props.userInfo.username
      }
    };

    return !isFriend ? (

     <Profile
        {...myInitialValues}
        userInfo = {this.props.userInfo}
        updateUserInfo = {this.props.updateUserInfo}
        userIsUpdated = {this.props.userIsUpdated}
        resetAlert = {this.props.resetAlert}
        unlinkSocialAcc = {this.props.unlinkSocialAcc}
        stopSocialModal = {this.props.stopSocialModal}
     />
    ) :
    (<Friend
      friendProfile = {this.props.friendProfile}
      groups = { this.props.groups }
      userInfo = {this.props.userInfo}
    />
    )
  }
}

function mapStateToProps(state) {
  return {
   userInfo : state.auth.userInfo,
   isAuthed: state.auth.isAuthed,
   userIsUpdated: state.auth.userIsUpdated,
   friendProfile : state.users.friendProfile,
   groups: state.groups.groups
  }
}

export default connect(mapStateToProps, {
  updateUserInfo,
  resetAlert,
  getFriendProfile,
  unlinkSocialAcc,
  stopSocialModal,
  getGroups
})(PageProfile);
