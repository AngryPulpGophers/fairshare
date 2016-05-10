import React, { Component } from 'react';


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

                               <div> shared expenses groups: </div>

                                { console.log('MY INFOOOOO INSIDE FRIEND PROF VIEW', this.props.userInfo.id) }
                                <div>
                                    {this.props.groups.map(function(group) {
                                        for (var i = 0; i < group.members.length; i++) {
                                          if (group.members[i].user_id === this.props.friendProfile.id) {
                                              return <div>{group.name}</div>
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
