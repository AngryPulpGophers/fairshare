import React, { Component, PropTypes } from 'react';

export default class Profile extends Component {
  render() {
    return (
        <h3>Profile</h3>
// username
    <div> {this.props.userInfo} </div>
    console.log("this.props within components/profile", this.props);

// password


// real name

// email

// picture

      
    )
  }
}

// requiring from parent comp.
Profile.PropTypes = {
    userInfo : PropTypes.object.isRequired
}