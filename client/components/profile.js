import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ExpireAlert from '../components/alert';
import SocialAccount from '../components/socialAccounts';
import SocialModal from '../components/socialPromptModal';
import defaultPicture from '../images/fs-logo.png';

const FIELDS = {
    name : {
        type : 'input',
        label : 'name',
        fieldType: 'text'
    },
    username : {
        type : 'input',
        label: 'username',
        fieldType: 'text'
    },
    email : {
        type : 'input',
        label: 'email',
        fieldType : 'text'
    }
};

let alert = false;

export default class Profile extends Component {

    componentWillReceiveProps(nextProps){
      if(nextProps.userIsUpdated){
        alert = !alert;
      }
    }

    handleSubmit(userData) { // update profile
     userData.id = this.props.userInfo.id;
     this.props.updateUserInfo(userData);
    }

    renderField(fieldConfig, field) { // one helper per ea field declared
      const fieldHelper = this.props.fields[field];
      return (
        <label>{fieldConfig.label}
          <fieldConfig.type type={fieldConfig.fieldType}
          className = {fieldHelper.touched && fieldHelper.error ? 'is-invalid-input' : ''}
          style = {{marginBottom:4.8}}
          placeholder={fieldConfig.label} {...fieldHelper}/>
          {fieldHelper.touched && fieldHelper.error && <span  style = {{marginBottom:0}} className = 'form-error is-visible'>{fieldHelper.error}</span>}
        </label>
      );
    }

  render() {
    const {resetForm, handleSubmit, submitting, initialValues} = this.props;
      return (
        <div className="login">
        <SocialModal
          userInfo = {this.props.userInfo}
          stopSocialModal = {this.props.stopSocialModal}
        />
          <div className="row">
            <div className="small-12 large-7 large-centered columns">
              <div className="component-wrapper">
                <ExpireAlert
                    set={this.props.userIsUpdated}
                    reset={this.props.resetAlert}
                    status="success"
                    delay={3000}>
                    <strong> That was a splendid update! </strong>
                </ExpireAlert>
                <h3>Your Profile</h3>
                <SocialAccount
                  userInfo={this.props.userInfo}
                  unlinkSocialAcc={this.props.unlinkSocialAcc}
                />
                <form className="profile-form" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
                  <div className="row">
                    <div className="small-12 large-4 columns">
                      <img className="image" src={this.props.userInfo.img_url || defaultPicture}/>
                    </div>
                    <div className="small-12 large-8 columns">
                      {_.map(FIELDS, this.renderField.bind(this))}
                    </div>
                    <div className="small-12 columns">
                      <button type="submit" className="primary button expanded" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}
    if (!values.name) {
      errors.name = 'Name is Required'
    }
    if (!values.username) {
      errors.username = 'Username is Required'
    } else if (values.username.length > 30) {
      errors.username = 'Must be 30 characters or less'
    }
    if (!values.email) {
      errors.email = 'Email is Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = ('Invalid email address')
    }
  return errors;
}

Profile.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  stopSocialModal: PropTypes.func.isRequired,
  unlinkSocialAcc: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'Profile',
  fields: _.keys(FIELDS)
  ,
  validate
})(Profile)

