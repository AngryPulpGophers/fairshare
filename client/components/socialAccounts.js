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
                <span>
                  {fbook && primary !== 'Facebook' ? 
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>Facebook</button>
                      : fbook && primary === 'Facebook' ? <div>Primary Account: {primary}</div> : <span></span>}
                  {google && primary !== 'Google' ?
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>Google+</button>
                      : google && primary === 'Google' ? <div>Primary Account: {primary}</div> : <span></span>}
                  {pay && primary !== 'Paypal' ?
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>PayPal</button>
                      : google && primary === 'Paypal' ? <div>Primary Account: {primary}</div> : <span></span>}
                </span>
            </div>
            :<span></span>}
          {!fbook || !google || !pay ?
              <div>
                <h5>Link Accounts</h5>
                  <span>
                    {!fbook ? 
                        <a href='auth/facebook' className="button alert button tiny"><i className="fa fa-unlock"></i>Facebook</a>
                      :<span></span>}
                    {!google ? 
                        <a href='auth/google' className="button alert button tiny"><i className="fa fa-unlock"></i>Google+</a>
                      :<span></span>}
                    {!pay ? 
                      
                        <a href='auth/paypal' className="button alert button tiny"><i className="fa fa-unlock"></i>PayPal</a>
                      :<span></span>}
                  </span>
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