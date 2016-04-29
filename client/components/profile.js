import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
//export const fields = [ 'name', 'username', 'email'];
const FIELDS = {
    name : {
        type : 'input',
        label : 'name',
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
    onSubmit(props) {
      alert('Profile Updated');
    }

    renderField(fieldConfig, field) { // one helper per ea field declared
      const fieldHelper = this.props.fields[field];

      return (
         <div>
          <label>{fieldConfig.label}</label>
          <div>
            <fieldConfig.type type="text" value={fieldConfig.label} placeholder={fieldConfig.label} {...fieldHelper}/>
          </div>
          {fieldHelper.touched && fieldHelper.error && <div>{fieldHelper.error}</div>}
        </div>
      );
    }

  render() {
      const {resetForm, handleSubmit, submitting } = this.props;

    return (
        <div>
            <img className="image" src={this.props.userInfo.img_url}/>
            <form onSubmit={handleSubmit}>
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

// export default class Profile extends Component {
//     render() {
//         return (
//         <div>
//             <h2>{this.props.userInfo.name} Profile</h2>
//                     <div >name: {this.props.userInfo.name}</div>
//                     <div>email: {this.props.userInfo.email}</div>
//                 
//         </div>
//         )
//     }
// }

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
        errors[field] = 'Enter a ${field}'
    }
 }); 

  return errors
}



// requiring from parent comp.
    // Profile.PropTypes = {
    //     userInfo: PropTypes.object.isRequired
    // }

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
