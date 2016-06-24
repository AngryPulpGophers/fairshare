import React, { Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class LoginError extends Component{

	componentDidMount = () => {
    setTimeout( () => this.props.clearLoginError(), 2000)
	}

	render(){
		return(
	    <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				<div className= 'text-center expanded' style={{backgroundColor:'#ffb3b3'}}>
				  {this.props.loginError}
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

LoginError.PropTypes ={
	loginError: PropTypes.string.isRequired,
	clearLoginError: PropTypes.func.isRequired
}