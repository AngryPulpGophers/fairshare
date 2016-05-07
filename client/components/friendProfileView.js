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
                              <div> friend user name </div>
                              <div> friend email </div>
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
}


/*
1 - click on user image at dashboard
2 - fire off a click event
3 - need to track users (new end point?)
4- to pass state to friendProfileView
5 - write page display in render() 

*/
