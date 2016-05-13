import React, { Component, PropTypes } from 'react';
import SocialHelper from '../utility/socialAccountHelper'



export default class SocialAccounts extends Component {

  render() {
    // console.log('info in render method:', this.props.userInfo)
    let userInfo = this.props.userInfo;
    let [buttons,anchors] = SocialHelper.createLinkedAccounts(userInfo, SocialHelper.makeButtons, SocialHelper.makeAnchors,this)
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
//href in lines 37,41,and 45 sends user through respective Oauth strategy(facebook,google+ or paypal)

SocialAccounts.propTypes = {
  unlinkSocialAcc : PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
}