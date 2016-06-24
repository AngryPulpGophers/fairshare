import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import Modal from './modal';
import LoginError from './loginError'
import EmailSuccess from './emailSuccess'


export const fields = ['email'];


export default class EmailReset extends Component{

	handleSubmit = (formData) => {
    this.props.sendEmail(formData);
  }

	render(){
		const{
		  fields: {email},
		  handleSubmit,
		  resetForm,
      submitting
    } = this.props;

	  return(
	  	<Modal className = 'modal' isOpen={this.props.emailPass} transitionName='modal-anim'>
	      <div className='text-left'>
	        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <h3> Oops! Memory isn't quite what it used to be eh?</h3>
            <p>No problem! Just type in your email address and we'll help you out.</p>
            <input type='text' pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$' required {...email}/>
            <button type="submit" className='button' disabled={submitting}>
              {submitting ? <i/> : <i/>} Send
            </button>
            <button onClick={()=>this.props.closeEmailModal()} className="secondary button">Cancel</button>

	              {this.props.loginError !== '' ? 
                    <LoginError 
                      clearLoginError = {this.props.clearLoginError}
                      loginError = {this.props.loginError}
                    /> 
                    : null}
                {this.props.emailSuccess ? 
                  <EmailSuccess
                    clearEmailSuccess = {this.props.clearEmailSuccess}
                  />
                  : null}
	            
	        </form>
	      </div>  
	    </Modal>
		)
	}
}

EmailReset.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  sendEmail: PropTypes.func.isRequired,
  emailPass: PropTypes.bool.isRequired,
  emailSuccess: PropTypes.bool.isRequired,
  clearEmailSuccess: PropTypes.func.isRequired
}



export default reduxForm({
  form: 'emailreset',
  fields
})(EmailReset)
