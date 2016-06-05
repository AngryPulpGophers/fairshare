import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export const fields = ['email','password'];

export default class SignUpForm extends Component{

  handleSubmit = (formData) => {
    this.props.destroyForm();
    this.props.signUp(formData);
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
        <div className='text-left'>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <small>email</small>
              <input type='text' pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$' style={{padding:'2px'}} required {...email}/>
            <small>password--6-8 characters-use letters and numbers</small>
              <input type="password" pattern='^(?=.*\d).{6,8}$' required {...password}/>
              <button type="submit" className='expanded info button' disabled={submitting}>
                {submitting ? <i/> : <i/>} Sign Up
              </button>
          </form>
        </div>  
      </ReactCSSTransitionGroup>
		  )
  }
}

SignUpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired
}



export default reduxForm({
  form: 'signup',
  fields
})(SignUpForm)