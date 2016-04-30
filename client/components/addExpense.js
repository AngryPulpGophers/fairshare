import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import PureInput from './PureInput'
export const fields = [ 'title', 'note', 'imgUrl', 'sex', 'favoriteColor', 'members0','members1','members2',
                        'members3', 'members4','members5','members6','members7','members8','members9', 'notes','amount' ]
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
    console.log(this,'this')
    //if (this.props.currentGroupUsers){
    // for (var i = 0; i < 3; i++){
    //    console.log(this,'lucky',i)
    //   this.props.fields['members'+1].initialValue=true;
     
    // }
  //}
  }

  handleAddMember(){
    return members.addField();
  }
  handleSubmit(data) {
    console.log('addExpense',this.props.currentGroupUsers)
     console.log('I SUBMITTED',data)
     
     var currentURL = window.location.href
        console.log(currentURL)
    var ID = currentURL.split('id=')
    ID= ID[1].split('&')
    var obj = {}
    obj.members = []
    //hard coded to 10, which is number of hard coded members max
    for (var i = 0 ; i< 10 ; i++){
      if (data['members'+i]){
        obj.members.push(this.props.currentGroupUsers[i].user_id)
      }
    }
    obj.paid_by = 1;
    obj.title = data.title;
    obj.amount = Number(Number(data.amount).toFixed(2))
    obj.img_url = data.imgUrl;
    obj.note = data.note;
    obj.group_id = Number(ID[0])
    console.log('what PJ sends to post expense',obj)
    this.props.addExpense(JSON.stringify(obj))


    console.log('I SUBMITTED',data)
  }

  

  render(){
    console.log('maybe work444',this.props.currentGroupUsers)

//use ID[0] for current group ID

    const {

      fields: { title, note, imgUrl, sex, favoriteColor, members0,members1,members2,
                members3, members4, members5, members6, members7, members8, members9, notes,amount },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
     

    return (<form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this)).bind(this)}>
        <div>
          <h2>Add Expense</h2>
          <label>Title</label>
          <div>
            <input type="text" placeholder="Title" {...title}/>
          </div>
        </div>
        <div>
          <label>Note</label>
          <div>
            <input type="text" placeholder="Note" {...note}/>
          </div>
        </div>
        
        <div>
          <label>imgUrl</label>
          <div>
            <input type="text" placeholder="Image URL" {...imgUrl}/>
          </div>
        </div>
        <div>
          <label>Amount</label>
          <div>
            <input type="text" placeholder="Amount" {...amount}/>
          </div>
        </div>


        {/*
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
      */}
        <div>
        <h3>Members Involved</h3>
        {this.props.currentGroupUsers.map(function(user,index){
          //console.log(members[index],'what is this')
          console.log('big thing',this)
       //members.push({value:true})
         var string = 'members'+index
          return (
          <label>
            
               <PureInput type="checkbox"  field={this.props.fields[string]}/> {user.name}
            
          </label>)
          }.bind(this))
            }
        </div>
        {/*}
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
      */}
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
