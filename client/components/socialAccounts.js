import React, { Component, PropTypes } from 'react';


export default class SocialAccounts extends Component {
  render() {
    let [fbook,google,pay] = [this.props.userInfo.facebook,this.props.userInfo.google,this.props.userInfo.paypal];
    let id = this.props.userInfo.id;
    let primary = this.props.userInfo.primary;
    
    return(
      <div>
          {fbook || google || pay  ?
            <span>
              {fbook && primary !== 'Facebook' ? 
                  <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>Facebook</button>
                  : fbook && primary === 'Facebook' ? <div>Logged in with: {primary}</div> : null}
              {google && primary !== 'Google' ?
                  <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,google:0,provider:'google'})}><i className="fa fa-lock"></i>Google+</button>
                  : google && primary === 'Google' ? <div>Logged in with: {primary}</div> : null}
              {pay && primary !== 'Paypal' ?
                  <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,paypal:0,provider:'paypal'})}><i className="fa fa-lock"></i>PayPal</button>
                  : pay && primary === 'Paypal' ? <div>Logged in with: {primary}</div> : null}
            </span>
           
            :null}
          {!fbook || !google || !pay ?
              <div>
                <h6>Link Accounts:</h6>
                  <span>
                    {!fbook ? 
                        <a href='auth/facebook' className="button secondary button tiny"><i className="fa fa-unlock"></i>Facebook</a> 
                      :null}
                    {!google ? 
                        <a href='auth/google' className="button secondary button tiny"><i className="fa fa-unlock"></i>Google+</a> 
                      :null}
                    {!pay ? 
                      
                        <a href='auth/paypal' className="button secondary button tiny"><i className="fa fa-unlock"></i>PayPal</a>
                      :null}
                  </span>
              </div>
          :null} 
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