import React, { Component, PropTypes, Link } from 'react';
import stopSocialModal from '../actions/authActions'
import Modal from './modal';


export default class SocialModal extends Component{

/*stopSocialModal fires async action that flips boolean in userProfile to close modal 
permanently during current session.*/

//href lines 20,23,26 sends user through respective Oauth strategy


  render(){
    return(
        <Modal className='modal' isOpen={this.props.userInfo.showModal} transitionName="modal-anim">
            <div className="component-wrapper text-center">
              <span onClick={ ()=> this.props.stopSocialModal({id:this.props.userInfo.id, showModal:0})} aria-hidden="true" style = {{cursor:'pointer'}}>skip</span>
               <h3>Link other accounts?</h3>
                <div className="row">
                  <div className="small-12 large-4 columns">
                    <a href= 'auth/facebook' disabled={this.props.userInfo.facebook} className="large primary button"><i className="fa fa-facebook-square"></i> Facebook</a>
                  </div>
                  <div className="small-12 large-4 columns">
                    <a href='/auth/google' disabled={this.props.userInfo.google} className="large alert button"><i className="fa fa-google-plus-square"></i> Google +</a>
                  </div>
                  <div className="small-12 large-4 columns">
                    <a href='/auth/paypal' disabled={this.props.userInfo.paypal} className="large secondary button"><i className='fa fa-paypal'></i> PayPal</a>
                  </div>
                </div>
            </div>
        </Modal>
  		)
  }

}

SocialModal.propTypes ={
  userInfo: PropTypes.object.isRequired,
  stopSocialModal:PropTypes.func.isRequired
}


