import React, { Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ResetPwordSuccess extends Component{

	componentDidMount = () => {
    setTimeout( () => this.props.clearResetSuccess(), 2500)
	}

	render(){
		return(
	    <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionAppearTimeout={500} transitionLeaveTimeout={300}>
				<div className= 'text-center expanded' style={{backgroundColor:'#B2FFB2'}}>
				  <h3>Your password was successfully reset</h3>
				  <p>Click sign in in the top right corner  to get started</p>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

ResetPwordSuccess.PropTypes ={
  clearResetSuccess: PropTypes.func.isRequired
}