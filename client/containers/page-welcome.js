import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Welcome from '../components/welcome';
import { getUserInfo } from '../actions/authActions';
import ScreenShot from '../images/screen-shot.png';



class WelcomePage extends Component{

	render(){
		return(
		  <Welcome
		    isAuthed = {this.props.isAuthed}
		    getUserInfo = {this.props.getUserInfo}
		  />
	  )
	}
}

function mapStateToProps(state){
	return {
		isAuthed: state.auth.isAuthed
	}
}

export default connect(mapStateToProps, {
	getUserInfo
})(WelcomePage)