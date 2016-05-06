import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from '../components/login';
class PageLogin extends Component {


  render() {
    return (
      <Login
     
      />
    )
  }

};

PageLogin.propTypes = {
}

function mapStateToProps(state) {
  console.log('mapstatetprops called:',state);
  return {
  
  }
}

export default connect(mapStateToProps, {
})(PageLogin);
