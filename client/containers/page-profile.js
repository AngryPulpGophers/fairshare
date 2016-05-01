import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import {updateUserInfo} from '../actions/authActions'

class PageProfile extends Component {

   render() {

    const myInitialValues = {
      initialValues: {
        name: this.props.userInfo.name,
        email: this.props.userInfo.email,
        username: this.props.userInfo.username
      }
    }

    return (
     <Profile 
        {...myInitialValues}
        userInfo = {this.props.userInfo}
        updateUserInfo = {this.props.updateUserInfo}
     />
    )
  }
}

function mapStateToProps(state) {
  return {
   userInfo : state.auth.userInfo
  }
}


// injection to child
export default connect(mapStateToProps, {
  updateUserInfo
})(PageProfile);

