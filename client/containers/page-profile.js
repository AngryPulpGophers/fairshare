import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../components/Profile';

class PageProfile extends Component {

  render() {
    return (
     <Profile 
        userInfo = {this.props.userInfo}
     />
    )
  }
}
// requiring this page before rendering -- breaks page
PageProfile.propTypes = {
   //userInfo: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
   userInfo : state.auth.userInfo
  }
}



// injection to child
export default connect(mapStateToProps, {
})(PageProfile);

