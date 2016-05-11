import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

export default class Overview extends Component {

  render() {
    function round(num) {
    //console.log('broke here',num)
    num=Number(num)
    return Number(num.toFixed(2))
  }
    // setting this to bypas the need for authentication
    return (
      <div className="row">
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>You are owed:</h3>
          <strong className="success">${round(this.props.dashboard.owedToUser)}</strong>
        </div>
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>You owe:</h3>
          <strong className="alert">${round(this.props.dashboard.userOwes*-1)}</strong>
        </div>
        <div className="small-12 large-4 columns text-center dash-stat">
          <h3>Current Balance:</h3>
          <strong>${round(round(this.props.dashboard.owedToUser) +  round(this.props.dashboard.userOwes))}</strong>
        </div>
      </div>
    )
  }
}

Overview.PropTypes = {
  userInfo: PropTypes.object.isRequired,
}

