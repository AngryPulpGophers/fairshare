import React, { Component, PropTypes, Link } from 'react';
import stopSocialModal from '../actions/authActions';
import SocialHelper from '../utility/socialAccountHelper'
import Modal from './modal';


export default class SocialModal extends Component{

/*stopSocialModal fires async action that flips boolean in userProfile to close modal
permanently during current session.*/

  render(){
    let authProviders = SocialHelper.createModalAnchors(this.props.userInfo)
    return(
      <Modal className='modal' isOpen={this.props.userInfo.showModal} transitionName="modal-anim">
        <div className="text-center">
          <h3>Link other accounts?</h3>
            <div className='text-center'>
              {[...authProviders]}
            </div>
            <span onClick={ ()=> this.props.stopSocialModal({id:this.props.userInfo.id, showModal:0})} aria-hidden="true" style = {{cursor:'pointer'}}>close</span>
          </div>
      </Modal>
		)
  }
}

SocialModal.propTypes ={
  userInfo: PropTypes.object.isRequired,
  stopSocialModal:PropTypes.func.isRequired
}
