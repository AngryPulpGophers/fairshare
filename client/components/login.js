import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';
import SignUpForm from './signUpForm';

export default class Login extends Component {
  
  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthed){
      this.props.getUserInfo();
      browserHistory.push('/home');
    }
  }

  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <div className="component-wrapper">
              <h3>Want to track your expenses? You gotta' login!</h3>
              <p>We've made it easy on you. No need to remember another password. Just use one of these three options and off you go:</p>
              <div className="row">
                <div className="small-12 columns">
                  <a href= 'auth/facebook' className="large expanded primary button"><i className="fa fa-facebook-square"></i> Facebook</a>
                  <a href='auth/google' className="large expanded success button"><i className="fa fa-google-plus-square"></i> Google +</a>
                  - or -
                  <SignUpForm
                   signUp = {this.props.signUp}
                   loginError = {this.props.loginError}
                   clearLoginError = {this.props.clearLoginError}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  signIn: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  localSignIn: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  clearLoginError: PropTypes.func.isRequired
}


