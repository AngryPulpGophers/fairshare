import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class EmailSuccess extends Component{

	componentDidMount = () => {
    setTimeout( () => this.props.clearEmailSuccess(), 2000)
	}

	render(){
	console.log('props in success:', this.props)
		return(
	    <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				<div className= 'text-center expanded' style={{backgroundColor:'#B2FFB2'}}>
				  <h3>Check your email to reset your password</h3>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

EmailSuccess.PropTypes ={
  clearEmailSuccess: PropTypes.func.isRequired
}