import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Profile from '../components/profile';
import {updateUserInfo, resetAlert} from '../actions/authActions'

class PageProfile extends Component {

  componentWillMount(){
    //console.log('component did update:',nextProps)
    if(!window.localStorage.isAuthed){
      browserHistory.push('/login')
    }
  }
  componentWillReceiveProps(nextProps){
    //console.log('component did update:',nextProps)
    if(!nextProps.isAuthed){
      browserHistory.push('/login')
    }
  }


  render() {

    const myInitialValues = {
      initialValues: {
        name: this.props.userInfo.name,
        email: this.props.userInfo.email,
        username: this.props.userInfo.username
      }
    };

    return (
     <Profile
        {...myInitialValues}
        userInfo = {this.props.userInfo}
        updateUserInfo = {this.props.updateUserInfo}
        userIsUpdated = {this.props.userIsUpdated}
        resetAlert = {this.props.resetAlert}
     />
    )
  }
}

function mapStateToProps(state) {
  return {
   userInfo : state.auth.userInfo,
   isAuthed: state.auth.isAuthed,
   userIsUpdated: state.auth.userIsUpdated
  }
}


// injection to child
export default connect(mapStateToProps, {
  updateUserInfo,
  resetAlert
})(PageProfile);

