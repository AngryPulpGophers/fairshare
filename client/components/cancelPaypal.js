import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


export default class CancelPayment extends Component {

  render() {
  	return(
  		<div>
  		  <h2>You cancelled your PayPal transaction</h2>
  		  <a href= {sessionStorage.getItem('locale')} className='button primary' onClick={() => sessionStorage.clear()}>Get back to your group</a>
  		</div>
  		)
  }
}

CancelPayment.propTypes ={
	clearSessionStorage:PropTypes.func.isRequired
}