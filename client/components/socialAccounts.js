import React, { Component, PropTypes } from 'react';


export default class SocialAccounts extends Component {
  render() {
    let [fbook,google,pay] = [this.props.userInfo.facebook,this.props.userInfo.google,this.props.userInfo.paypal];
    let id = this.props.userInfo.id;
    let primary = this.props.userInfo.primary;
    
    return(
      <div style={{float:'right'}}>
          {fbook || google || pay  ?
            <div>
              <h5>Social Connections</h5>
                <ul className='menu simple'>
                  {fbook && primary !== 'facebook' ? 
                    <li>
                      <p>Facebook</p><i className="fa fa-lock" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}></i>
                    </li>: fbook && primary === 'facebook' ? <span>Primary Account: {primary}</span> : <span></span>}
                  {google && primary !== 'google' ?
                    <li>
                      <p>Google+</p><i className="fa fa-lock"  onClick={()=>this.props.unlinkSocialAcc({id:id,google:0,provider:'google'})}></i>
                    </li>: google && primary === 'google' ? <span>Primary Account: {primary}</span> : <span></span>}
                  {pay && primary !== 'paypal' ?
                    <li>
                      <p>PayPal</p><i className="fa fa-lock" onClick={()=>this.props.unlinkSocialAcc({id:id, paypal:0,provider:'paypal'})}></i>
                    </li>: google && primary === 'paypal' ? <span>Primary Account: {primary}</span> : <span></span>}
                </ul>
            </div>
            :<span></span>}
          {!fbook || !google || !pay ?
              <div>
                <h5>Link Accounts</h5>
                  <ul className='menu simple'>
                    {!fbook ? 
                      <li>
                        <a href='auth/facebook'><i className="fa fa-unlock"></i></a><p>Facebook</p>
                      </li>:<span></span>}
                    {!google ? 
                      <li>
                        <a href='auth/google'><i className="fa fa-unlock"></i></a><p>Google+</p>
                      </li>:<span></span>}
                    {!pay ? 
                      <li>
                        <a href='auth/paypal'><i className="fa fa-unlock"></i></a><p>PayPal</p>
                      </li>:<span></span>}
                  </ul>
              </div>
          :<span></span>} 
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