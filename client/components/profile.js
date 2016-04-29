import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'name', 'username', 'email']

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
 if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

export default class Profile extends Component {
  render() {
    const { fields: { username, email, name }, resetForm, handleSubmit, submitting } = this.props
    return (
        <div>
        <img className="image" src={this.props.userInfo.img_url}/>
        

        <form onSubmit={handleSubmit}>
        <div>
        <div>
          <label>name</label>
          <div>
            <input type="text" value="male" placeholder="name" {...name}/>
          </div>
          {name.touched && name.error && <div>{name.error}</div>}
        </div>
          <label>Username</label>
          <div>
            <input type="text" placeholder="Username" {...username}/>
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="text" placeholder="Email" {...email}/>
          </div>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <div>- don't forget to style those buttons</div>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
      </div>
    )
  }
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
  fields,
  validate
})(Profile)


/*
1. create a form
2. default text is user's info from userInfo
    editable field
4. update info to db
5. change image later?

*/
