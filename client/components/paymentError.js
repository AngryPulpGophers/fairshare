import React, { Component, PropTypes } from 'react';
import ErrorModal from './errorModal';

export default class PaymentError extends Component {

  render(){
    return(
    	<ErrorModal isOpen={this.props.errorStatus}>
        <div className='text-center' style={{backgroundColor:'#ffb3b3'}}>
          <h4>{this.props.errMessage}</h4>
          <p onClick={() => this.props.clearError()} style = {{cursor:'pointer', textDecoration:'underline'}}>close</p>
        </div>
      </ErrorModal>
    )
  }
}


  PaymentError.propTypes = {
	  errorStatus: PropTypes.bool.isRequired,
	  clearError: PropTypes.func.isRequired,
	  errMessage: PropTypes.string.isRequired
  }