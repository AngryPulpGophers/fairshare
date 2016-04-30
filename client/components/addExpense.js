import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import PureInput from './PureInput'
import Modal from './modal';
export const fields = [ 'title', 'note', 'imgUrl', 'members0','members1','members2',
                        'members3', 'members4','members5','members6','members7','members8','members9', 'amount' ]

export default class AddExpense extends Component {

  constructor(props){
    super(props)
    this.state = ({isModalOpen: false})
  }
  openModal = () => {
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }
  
  componentWillMount(){
    console.log('currentURL',window.location.href )
    console.log('currentURL type',typeof window.location.href )
    //call our get groups function only if we haven't called it yet
        var currentURL = window.location.href
        console.log(currentURL)
    var ID = currentURL.split('id=')
    //ID= ID[1].split('&')
    this.props.getUserByGroup(ID[1])
    console.log('maybe work33', this.props.currentGroupUsers)
    console.log(this,'this')
  
  }

  
  handleSubmit(data) {
    // console.log('addExpense',this.props.currentGroupUsers)
    //  console.log('I SUBMITTED',data)
     

     var currentURL = window.location.href
     var baseURL = currentURL.split('/')[0]
        console.log(currentURL)
    var ID = currentURL.split('id=')
    //ID= ID[1].split('&')
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
    obj.group_id = Number(ID[1])
    console.log('what PJ sends to post expense',obj)
    this.props.addExpense(JSON.stringify(obj))


    console.log('I SUBMITTED',data)
    location.replace(baseURL+'/groupView?id='+ID[1])
  }

  

  render(){
    console.log('maybe work444',this.props.currentGroupUsers)


    const {

      fields: { title, note, imgUrl, members0,members1,members2,
                members3, members4, members5, members6, members7, members8, members9, amount },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
     

    return (
      <div>
      <button className = 'button primary button tiny'onClick={this.openModal}>Add Expense</button>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this)).bind(this)}>
        <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
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
   
        <div>
          <button type="submit" className="button primary float-left tiny button" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
      </Modal>
      </div>
    )
  }
}

export default reduxForm({
  form: 'simple',
  fields
})(AddExpense)
