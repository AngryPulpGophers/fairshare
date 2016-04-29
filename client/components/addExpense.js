import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]
//a helpful function when looking at retrieved data
// function puke (obj) {
//   return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
// }
// function puke (obj) {
//   return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
// }



export default class AddExpense extends Component {

  
  componentWillMount(){
    console.log('currentURL',window.location.href )
    console.log('currentURL type',typeof window.location.href )
    //call our get groups function only if we haven't called it yet
        var currentURL = window.location.href
        console.log(currentURL)
    var ID = currentURL.split('id=')
    ID= ID[1].split('&')
    this.props.getUserByGroup(ID[0])
    console.log('maybe work33', this.props.currentGroupUsers)

  }

  handleSubmit(data) {



    console.log('I SUBMITTED',data)
  }

  

  render(){
    console.log('maybe work444',this.props.currentGroupUsers)



    const {

      fields: { firstName, lastName, email, sex, favoriteColor, employed, notes },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
     
    return (<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...firstName}/>
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...lastName}/>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input type="email" placeholder="Email" {...email}/>
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <input type="radio" {...sex} value="male" checked={sex.value === 'male'}/> Male
            </label>
            <label>
              <input type="radio" {...sex} value="female" checked={sex.value === 'female'}/> Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <select
              {...favoriteColor}
              // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
              value={favoriteColor.value || ''}>
              <option></option>
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </select>
          </div>
        </div>
        <div>
        {this.props.currentGroupUsers.map(function(user,index){
          console.log(employed[index],'what is this')
          return (
          <label>
            
               <input type="checkbox" {...employed}/> {user.name}
            
          </label>)
          })
            }
        </div>
        <div>
          <label>Notes</label>
          <div>
            <textarea
              {...notes}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={notes.value || ''}/>
          </div>
        </div>
        <div>
          <button type="submit" className="button primary float-left tiny button" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}
//     )
//   }
// }
export default reduxForm({
  form: 'simple',
  fields
})(AddExpense)
