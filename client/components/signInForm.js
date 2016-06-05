import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoginError from './loginError'
import EmailReset from './emailResetModal'

export const fields = ['email','password'];

export default class SignInForm extends Component{

  handleSubmit = (formData) => {
    this.props.destroyForm();
    this.props.localLogIn(formData);
  }

	render(){
		const{
		  fields: {email, password},
		  handleSubmit,
		  resetForm,
      submitting
    } = this.props;

    return(
      <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className='signin'>
          <form  className='form'onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <div>
              </div>
                  <small>email</small>
                  <input type='text' width='48px' {...email}/>
                  <small>password</small>
                  <input type="password" width='48px' {...password}/>
                  {this.props.loginError !== '' ? 
                    <LoginError 
                      clearLoginError = {this.props.clearLoginError}
                      loginError = {this.props.loginError}
                    /> 
                    : null}
              <button type="submit" className='tiny expanded info button'  disabled={submitting}>
                {submitting ? <i/> : <i/>} Login
              </button>
            <div className='text-center'>
              <small onClick={()=>this.props.openEmailModal()} style={{cursor: 'pointer'}}>Forgot password?</small>
            </div>
          </form>
          <EmailReset
            sendEmail = {this.props.sendEmail}
            emailPass = {this.props.emailPass}
            loginError = {this.props.loginError}
            clearLoginError = {this.props.clearLoginError}
            emailSuccess = {this.props.emailSuccess}
            clearEmailSuccess = {this.props.clearEmailSuccess}
          />
        </div>
      </ReactCSSTransitionGroup>
		  )
  }
}

SignInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  localLogIn: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  emailPass: PropTypes.bool.isRequired,
  openEmailModal: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  emailSuccess: PropTypes.bool.isRequired,
  clearEmailSuccess: PropTypes.func.isRequired
}



export default reduxForm({
  form: 'signin',
  fields
})(SignInForm)