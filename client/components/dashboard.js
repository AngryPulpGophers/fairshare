import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import GroupList from './groupList';


export default class Dashboard extends Component {

  render() {
  // setting this to bypas the need for authentication
  const isAuthed = this.props.isAuthed;
   
    return isAuthed ? (
      <div className="dashboard">
        {/*<h3>Dashboard</h3>*/}
        <Link to='/create-group' className="large primary button expanded">+ New Group</Link>
        <GroupList getGroups={this.props.getGroups} groups={this.props.groups}/>
      </div>
      ) 
      : (
      <div className="dashboard">
        <div className="row">
          <div className="small-12 large-centered columns text-center">
            <h1>Welcome to Divvy</h1>
            <Link to='/login' title="Get Started" className="button primary"><i className="fa fa-balance-scale"></i>Get Started</Link>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  callouts: PropTypes.array.isRequired,
  getGroups: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired
}
