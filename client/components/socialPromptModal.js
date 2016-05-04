import React, { Component, PropTypes, Link } from 'react';
import Modal from './modal';


export default class SocialModal extends Component{

	constructor(props){
    super(props)
    this.state = ({
      isModalOpen: true,
    })
  }

  openModal(){
  	this.setState({isModalOpen: true})
  }

  closeModal(){
  	this.setState({isModalOpen: false})
  }

  render(){
  	return(
        <Modal className='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
            <div className="component-wrapper text-center">
              <span onClick={() => this.closeModal()} aria-hidden="true" style = {{cursor:'pointer'}}>skip</span>
               <h3>Link other accounts?</h3>
                <div className="row">
                  <div className="small-12 large-4 columns">
                    <a href= 'auth/facebook' className="large primary button"><i className="fa fa-facebook-square"></i> Facebook</a>
                  </div>
                  <div className="small-12 large-4 columns">
                    <a href='/auth/google' className="large alert button"><i className="fa fa-google-plus-square"></i> Google +</a>
                  </div>
                  <div className="small-12 large-4 columns">
                    <a href='/auth/paypal' className="large secondary button"><i className='fa fa-paypal'></i> PayPal</a>
                  </div>
                </div>
            </div>
        </Modal>
  		)
  }

}