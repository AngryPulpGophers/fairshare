import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResetModal from '../components/resetModal';
import {sendReset, clearResetSuccess, clearLoginError} from '../actions/authActions';

class ResetPassword extends Component{


	render(){
		return(
			<ResetModal
			  resetOpen = {this.props.resetOpen}
				sendReset = {this.props.sendReset}
				resetSuccess = {this.props.resetSuccess}
				loginError = {this.props.loginError}
				clearResetSuccess = {this.props.clearResetSuccess}
				clearLoginError = {this.props.clearLoginError}
		  />
		)
	};
};

function mapStateToProps(state){
	return{
	  resetOpen : state.auth.resetOpen,
	  resetSuccess : state.auth.resetSuccess,
	  loginError : state.auth.loginError
	}
}

ResetPassword.PropTypes = {
	loginError: PropTypes.string.isRequired,
	resetOpen : PropTypes.bool.isRequired,
	sendReset : PropTypes.func.isRequired,
	resetSuccess : PropTypes.bool.isRequired,
	clearResetSuccess : PropTypes.func.isRequired,
	clearLoginError : PropTypes.func.isRequired
};

export default connect( mapStateToProps, {
	sendReset,
	clearResetSuccess,
	clearLoginError
})(ResetPassword)