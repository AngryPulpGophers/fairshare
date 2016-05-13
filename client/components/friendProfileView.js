import React, { Component } from 'react';
import { Link } from 'react-router'


export default class FriendProfileView extends Component {
 render() {
    let mailToLink = 'mailto:' + this.props.friendProfile.email;
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
                <div><span className="secondary label">Name:</span><h5> {this.props.friendProfile.name}</h5></div>  
                <div><span className="secondary label">Username:</span><h5> {this.props.friendProfile.username}</h5></div>
                <div><span className="secondary label">Email:</span><h5> <a href={mailToLink}>{this.props.friendProfile.email}</a></h5></div>
              </div>  
              <div className="small-12 columns">
                <h4>Your shared groups: </h4>
                <div className="shared-groups">
                  {this.props.groups.map(function(group) {
                    for (var i = 0; i < group.members.length; i++) {
                      if (group.members[i].user_id === this.props.friendProfile.id) {
                        return (
                          <div className="group-item">
                            <Link key={group.id} to={{pathname:'/groupView',query:{ id: group.id }}} title="groupView" className="callout callout-nav">
                              <div className="slide-call">View</div>
                              {group.name} 
                            </Link>
                          </div>
                        )
                      }
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
