import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkError from '../components/linkProfileError';

export default class SocialAccountError extends Component {



  render() {
    return (
    	<LinkError/>
    );
  }

}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, {
})(SocialAccountError);


