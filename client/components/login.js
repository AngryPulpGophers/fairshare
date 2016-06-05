import React, { Component, PropTypes } from 'react';
import SignUpForm from './signUpForm';

export default class Login extends Component {
  

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
                  <br />
                  - or -
                  <br />
                  <p>use your <span onClick={()=>this.props.localSignIn()} style={{color:'blue', cursor:'pointer'}}>email</span></p>
                </div>
                {this.props.signIn ?
                  <SignUpForm
                   signUp={this.props.signUp}
                  />
                 : null } 
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
}


