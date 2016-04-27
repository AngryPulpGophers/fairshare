import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <h3>Want to track your expenses? You gotta' login!</h3>
            <h4 className="subheader">Take yer pick</h4>
            <div className="row">
              <div className="small-12 large-4 columns">
                <a href= 'auth/facebook' className="large primary button"><i className="fa fa-facebook-square"></i> Facebook</a>
              </div>
              <div className="small-12 large-4 columns">
                <button className="large alert button"><i className="fa fa-google-plus-square"></i> Google +</button>
              </div>
              <div className="small-12 large-4 columns">
                <button className="large secondary button"><i className="fa fa-github-square"></i> GitHub</button>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

