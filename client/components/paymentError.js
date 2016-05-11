import React, { Component, PropTypes } from 'react';
import Modal from './modal';

export default class PaymentError extends Component {

  render(){
    return(
    	<Modal isOpen={this.props.errorStatus}>
        <div style={{backgroundColor:'#ffb3b3',height:'100%',width:'100%',textAlign:'center'}}>
          <p>{this.props.errMessage}</p>
          <p onClick={() => this.props.clearError()} style = {{cursor:'pointer', textDecoration:'underline'}}>close</p>
        </div>
      </Modal>
    )
  }
}


  PaymentError.propTypes = {
	  errorStatus: PropTypes.bool.isRequired,
	  clearError: PropTypes.func.isRequired,
	  errMessage: PropTypes.string.isRequired
  }