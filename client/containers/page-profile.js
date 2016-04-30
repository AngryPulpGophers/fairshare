import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';

class PageProfile extends Component {

  render() {
    const initForm = {
      initialValues: {name: 'toto',username:'test',email:'test@gmail.com'}
    }
    return (
     <Profile 
        userInfo = {this.props.userInfo}
        initialValues = {initForm}
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
})(PageProfile);

