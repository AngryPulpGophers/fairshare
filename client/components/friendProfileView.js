import React, { Component } from 'react';
import { Link } from 'react-router'


export default class FriendProfileView extends Component {
 render() {
    return (
    <div className="login">
    <div className="row">
    <div className="small-12 large-7 large-centered columns">
      <div className="component-wrapper">
      <h3>{this.props.friendProfile.name}'s Profile</h3>
        <div className="row">
          <div className="small-12 large-4 columns">
            <img className="image" src={this.props.friendProfile.img_url}/>
          </div>

          <div className="small-12 large-8 columns"> 
            <div> name: {this.props.friendProfile.name} </div>  
            <div> username: {this.props.friendProfile.username} </div>
            <div> email: {this.props.friendProfile.email} </div>
            <div> our shared expenses: </div>

            <div>
              {this.props.groups.map(function(group) {
                for (var i = 0; i < group.members.length; i++) {
                  if (group.members[i].user_id === this.props.friendProfile.id) {
                    return (
                      <div><Link key={group.id} to={{pathname:'/groupView',query:{ id: group.id }}} title="groupView" className="callout callout-nav"> {group.name} </Link></div>
                    )}
                }
              }.bind(this))}
            </div>
          </div>  
        </div>
      </div>
    </div>      
    </div>
    </div>
    );
  }
}

