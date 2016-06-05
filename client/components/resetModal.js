import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import Modal from './modal'
import ResetPwordSuccess from './resetPasswordSuccess'
import LoginError from './loginError'

export const fields = ['email','password', 'confirm'];

export default class ResetModal extends Component{

  handleSubmit = (formData) => {
    this.props.destroyForm();
    this.props.sendReset(formData);
  }

	render(){
	console.log('props in modal', this.props)
		const{
		  fields: {email, password, confirm},
		  handleSubmit,
		  resetForm,
      submitting
    } = this.props;

    return(
      <Modal className = 'modal' isOpen = {this.props.resetOpen} transitionName = 'modal.anim'>
        <div className='text-left'>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <small>email</small>
              <input type='text' pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$' style={{padding:'2px'}} required {...email}/>
            <small>password 6-8 characters-use letters and numbers</small>
              <input type="password" pattern='^(?=.*\d).{6,8}$' required {...password}/>
            <small>confirm password</small>
              <input type="password" pattern='^(?=.*\d).{6,8}$' required {...confirm}/>
            <div className = "text-center">
		          {this.props.resetSuccess ? 
		            <ResetPwordSuccess
		              clearResetSuccess = {this.props.clearResetSuccess}
		            /> 
		            : null}
              {this.props.loginError !== '' ? 
                <LoginError 
                  clearLoginError = {this.props.clearLoginError}
                  loginError = {this.props.loginError}
                /> 
                : null}  
              <button type="submit" className='expanded info button' disabled={submitting}>
                {submitting ? <i/> : <i/>} Reset Password
              </button>
            </div>
          </form>
        </div>  
      </Modal>
		)
  }
}

ResetModal.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  sendReset: PropTypes.func.isRequired,
  clearResetSuccess: PropTypes.func.isRequired,
  resetSuccess: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'resetmodal',
  fields
})(ResetModal)