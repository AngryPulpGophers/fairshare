import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

export default class Overview extends Component {

  render() {
    // setting this to bypas the need for authentication
    return (
      <div className="row">
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>You are owed:</h3>
          <strong className="success">${Number((Number(this.props.dashboard.owedToUser) - Number(this.props.dashboard.payments)).toFixed(2))}</strong>
        </div>
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>You owe:</h3>
          <strong className="alert">${Number(Number(this.props.dashboard.userOwes).toFixed(2))}</strong>
        </div>
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>Current Balance:</h3>
          <strong>${Number((Number(this.props.dashboard.owedToUser) - Number(this.props.dashboard.payments) - Number(this.props.dashboard.userOwes)).toFixed(2))}</strong>
        </div>
      </div>
    )
  }
}

Overview.PropTypes = {
  userInfo: PropTypes.object.isRequired,
}

