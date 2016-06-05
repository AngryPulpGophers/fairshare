import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResetModal from '../components/resetModal';
import {sendReset, clearResetSuccess, clearResetFailure} from '../actions/authActions';

class ResetPassword extends Component{


	render(){
		return(
			<ResetModal
			  resetOpen = {this.props.resetOpen}
				sendReset = {this.props.sendReset}
				resetSuccess = {this.props.resetSuccess}
				resetFailure = {this.props.resetFailure}
				clearResetSuccess = {this.props.clearResetSuccess}
		  />
		)
	};
};

function mapStateToProps(state){
	return{
	  resetOpen : state.auth.resetOpen,
	  resetSuccess : state.auth.resetSuccess,
	  resetFailure : state.auth.resetFailure
	}
}

ResetPassword.PropTypes = {
	resetOpen : PropTypes.bool.isRequired,
	sendReset : PropTypes.func.isRequired,
	resetSuccess : PropTypes.bool.isRequired,
	resetFailure : PropTypes.bool.isRequired,
	clearResetSuccess : PropTypes.func.isRequired,
	clearResetFailure : PropTypes.func.isRequired
};

export default connect( mapStateToProps, {
	sendReset,
	clearResetSuccess,
	clearResetFailure
})(ResetPassword)