import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <div className="component-wrapper">
              <h3>Want to track your expenses? You gotta' login!</h3>
              <div className="row">
                <div className="small-12 large-4 columns">
                  <a href= 'auth/facebook' className="large primary button"><i className="fa fa-facebook-square"></i> Facebook</a>
                </div>
                <div className="small-12 large-4 columns">
                  <a href='/auth/google' className="large alert button"><i className="fa fa-google-plus-square"></i> Google +</a>
                </div>
                <div className="small-12 large-4 columns">
                  <a href='/auth/paypal' className="large secondary button"><i className='fa fa-paypal'></i> PayPal</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

