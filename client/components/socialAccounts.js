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
                <span>
                  {fbook && primary !== 'facebook' ? 
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>Facebook</button>
                      : fbook && primary === 'facebook' ? <div>Logged in with: {primary}</div> : null}
                  {google && primary !== 'google' ?
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>Google+</button>
                      : google && primary === 'google' ? <div>Logged in with: {primary}</div> : null}
                  {pay && primary !== 'paypal' ?
                      <button className="button info button tiny" onClick={()=>this.props.unlinkSocialAcc({id:id,facebook:0,provider:'facebook'})}><i className="fa fa-lock"></i>PayPal</button>
                      : google && primary === 'paypal' ? <div>Logged in with: {primary}</div> : null}
                </span>
            </div>
            :null}
          {!fbook || !google || !pay ?
              <div>
                <h6>Link Accounts:</h6>
                  <span>
                    {!fbook ? 
                        <a href='auth/facebook' className="button alert button tiny"><i className="fa fa-unlock"></i>Facebook</a> 
                      :null}
                    {!google ? 
                        <a href='auth/google' className="button alert button tiny"><i className="fa fa-unlock"></i>Google+</a> 
                      :null}
                    {!pay ? 
                      
                        <a href='auth/paypal' className="button alert button tiny"><i className="fa fa-unlock"></i>PayPal</a>
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