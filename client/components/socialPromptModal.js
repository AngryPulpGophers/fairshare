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
            <h3>Thanks for joining!!</h3>
              <div>
                <p>
                  Take a minute to verify your profile info<br></br>
                  Feel free to link some of your other accounts<br></br>
                  Click the grid in the top left corner to get going<br></br>
                </p>
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


