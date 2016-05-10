import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Profile from '../components/profile';
import Friend from '../components/friendProfileView'
import { getFriendProfile } from '../actions/userActions'
import {updateUserInfo, resetAlert, unlinkSocialAcc} from '../actions/authActions'

class PageProfile extends Component {

  componentWillMount(){
    getFriendProfile('PJMatteucci')

    let currentURL = window.location.href.split('username=')[1];
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.isAuthed){
      browserHistory.push('/login')
    }
  }

  render() {
    let username = window.location.href.split('username=')[1];
    console.log("User profile url", username);

    let isFriend = true;
    if ( username === undefined || this.props.userInfo.username === username) {
      isFriend = false;
    } else {
      username? getFriendProfile(username) : null;
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
     />
    ) :
    (<Friend/>
    )
  }
}

function mapStateToProps(state) {
  return {
   userInfo : state.auth.userInfo,
   isAuthed: state.auth.isAuthed,
   userIsUpdated: state.auth.userIsUpdated,
  }
}


// injection to child
export default connect(mapStateToProps, {
  updateUserInfo,
  resetAlert,
  unlinkSocialAcc
})(PageProfile);

