import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CancelPayment from '../components/cancelPaypal';

class CancelPayPal extends Component {

  render() {
    return (
    	<CancelPayment />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
})(CancelPayPal);
