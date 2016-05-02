import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
//import { load as loadAccount } from '../redux/modules/account';

const FIELDS = {
    name : {
        type : 'input',
        label : 'name'
    },
    username : {
        type : 'input',
        label: 'username'
    },
    email : {
        type : 'input',
        label: 'email'
    }
};

export default class Profile extends Component {

    handleSubmit(userData) {
     userData.id = this.props.userInfo.id
     this.props.updateUserInfo(userData)
     alert("profile updated successfully");
    }

    renderField(fieldConfig, field) { // one helper per ea field declared
      const fieldHelper = this.props.fields[field];
      return (
         <div>
          <label>{fieldConfig.label}</label>
          <div>
            <fieldConfig.type placeholder={fieldConfig.label} {...fieldHelper}/>
          </div>
          {fieldHelper.touched && fieldHelper.error && <div>{fieldHelper.error}</div>}
        </div>
      );
    }

  render() {
      const {resetForm, handleSubmit, submitting, initialValues} = this.props;
    return (
        <div>
        {console.log("this.props.userInfo inside profile.js", this.props.userInfo)}
            <img className="image" src={this.props.userInfo.img_url}/>
            <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
            <div>
            {_.map(FIELDS, this.renderField.bind(this))}
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <i/> : <i/>} Submit
              </button>
              <div> - don't forget to style those buttons</div>
              <button type="button" className="btn btn-danger" disabled={submitting} onClick={resetForm}>
                Clear Values
              </button>
            </div>
          </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}
     // if (!values.name) {
     //    errors.name = 'Required'
     //  }
     //  if (!values.username) {
     //    errors.username = 'Required'
     //  } else if (values.username.length > 15) {
     //    errors.username = 'Must be 15 characters or less'
     //  }
     //  if (!values.email) {
     //    errors.email = 'Required'
     //  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     //    errors.email = 'Invalid email address'
     //  }

    //type is config obj, field is actual field-name

 _.each(FIELDS, (type, field) => {
    if (!values[field]) {
        errors[field] = `${field} required`;
    }
 }); 

  return errors
}

Profile.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Profile',
  fields: _.keys(FIELDS),
  validate
})(Profile)


/*
1. create a form
2. default text is user's info from userInfo
    editable field
4. update info to db
5. change image later?

*/
