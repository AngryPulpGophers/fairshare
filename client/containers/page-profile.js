import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../components/Profile';

class PageProfile extends Component {

  render() {
    return (
      <Profile 
        userInfo = this.props.userInfo


      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo : state.auth.userInfo
  };
}

// injection to child
export default connect(mapStateToProps, {
})(PageProfile);

// requiring this page before rendering
PageProfile.PropTypes = {
    userInfo : PropTypes.object.isRequired
}