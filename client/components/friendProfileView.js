import React, { Component, PropTypes } from 'react';

export default class FriendProfileView extends Component {

  render() {
    return (
      <div className="login">
        <div className="row">
            <div className="small-12 large-7 large-centered columns">
              <div className="component-wrapper">
                <h3>Profile</h3>
                  <div className="row">
                    <div className="small-12 large-12 columns">
                      
                      </div>
                          <div className="small-12 large-8 columns">            
                              <div> isFriend.username </div>
                              <div> isFriend.email </div>
                          </div>  
                </div>
              </div>
            </div>      
        </div>
    </div>
    );
  }
}


FriendProfileView.propTypes = {
  // isFriend: PropTypes.object.isRequired;
}

