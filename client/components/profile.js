import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ExpireAlert from '../components/alert';
import SocialAccount from '../components/socialAccounts'
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


let alert = false;
export default class Profile extends Component {
    

    //setup for our alert
    

    componentWillReceiveProps(nextProps){
      //console.log('*************OUR PROPS:',nextProps)
      if(nextProps.userIsUpdated){
        alert = !alert
      }
    }

    handleSubmit(userData) {
     userData.id = this.props.userInfo.id
     this.props.updateUserInfo(userData)
     //alert("profile updated successfully");
    }

    renderField(fieldConfig, field) { // one helper per ea field declared
      const fieldHelper = this.props.fields[field];
      console.log('deafultValue',fieldConfig.defaultValue);
      return (
        <label>{fieldConfig.label}
          <fieldConfig.type type="text" placeholder={fieldConfig.label} {...fieldHelper}/>
          {fieldHelper.touched && fieldHelper.error && <div>{fieldHelper.error}</div>}
        </label>
      );
    }

  render() {
      const {resetForm, handleSubmit, submitting, initialValues} = this.props;
    return (
        <div className="login">
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
                      <img className="image" src={this.props.userInfo.img_url}/>
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
