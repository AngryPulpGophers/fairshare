import React, { Component, PropTypes } from 'react';
import SocialHelper from '../utility/socialAccountHelper';


export default class SocialAccounts extends Component {

  render() {
    // console.log('info in render method:', this.props.userInfo)
    let userInfo = this.props.userInfo;
    let [buttons,anchors] = SocialHelper.createLinkedAccounts(userInfo, this);
    console.log('buttons', anchors);
    return(
      <div>
        {[...buttons]}
        <h5>Link Accounts</h5>
        {[...anchors]}
      </div>
    )
  }
}

//unlinkSocialAcc--fires async action that clears database of auth token issued by provider

SocialAccounts.propTypes = {
  unlinkSocialAcc : PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
}
