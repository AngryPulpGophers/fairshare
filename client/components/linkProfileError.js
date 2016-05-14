import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ErrorModal from './errorModal';


export default class LinkError extends Component{

	constructor(props){
     super(props)
     this.state = ({
       isModalOpen: true,
     })
   }
 
   closeModal = () => {
     this.setState({isModalOpen: false});
   }
 
 	  render(){
 	    return(
 	    	<ErrorModal isOpen={this.state.isModalOpen}>
 	        <div className='text-center' style={{backgroundColor:'#ffb3b3'}}>
 	          <h4>There was a problem linking your account. Sorry about that.</h4>
 	          <a href= '/profile' className='button primary button extended' onClick={this.closeModal} style = {{cursor:'pointer', textDecoration:'underline'}}>Back to your profile</a>
 	        </div>
 	      </ErrorModal>
     )
  }
}