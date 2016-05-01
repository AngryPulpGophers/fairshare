import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import Modal from './modal';


export const fields = ['Payee', 'Recipient', 'Amount', 'Notes'];

export default class PaymentForm extends Component{

	constructor(props){
    super(props)
    this.state = ({isModalOpen: false,
                   chosenOne:null})
  }
  openModal = () => {
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }
  handleSubmit = (data) => {
    data.Recipient = this.state.chosenOne;
    console.log('data after setting recipient:', data);
    // ReactDOM.unmountComponentAtNode(document.getElementById('modHanger'));
    this.setState({isModalOpen:false});
    this.props.makePayment(this.props.groupMembers,data);
  }
  resetForm = () => {
  	//do something
  }

  onChange = () => {
   console.log('starting val of chosenOne:' ,this.state.chosenOne);
   var boxes = document.getElementsByClassName('recip');
   // console.log('boxes in onchange:', boxes);
    for(var i =0; i< boxes.length;i++){
      if(boxes[i].checked){
        this.setState({chosenOne:boxes[i].value});
      }
   }
  }

  makeCheckBox = (data) => {
    return (
      <label><input className='recip' name='recipient' onChange={this.onChange} type='radio' value={data.user_id}/>{data.name}</label>
      )
  }

	render(){
		const{
		  fields: {Payee, Recipient, Amount, Notes},
		  handleSubmit,
		  resetForm,
      submitting
     } = this.props

     const memberCheckboxes = this.props.groupMembers.map((obj) => {
      return this.makeCheckBox(obj);
     });

    return(
    	<div>
    	 <button className = 'button primary button tiny'onClick={this.openModal}>Make Payment</button>
            <Modal id='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
    	<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
         <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
				  <div>
              <label>Payee</label>
            <div>
              <input type="text" value={this.props.userInfo.name.split(' ')[0]}
              {...Payee}/>
            </div>
          </div>
          <div>
            <label>Select</label>
            <div>
              {[...memberCheckboxes]}
            </div>
          </div>
          <div>
            <label>Amount</label>
          <div>
            <input type="text" placeholder="100.00,etc." defaultValue=""
            {...Amount}/>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <textarea placeholder="Additional Info" defaultValue=""
          {...Notes}/>
          <div>
          </div>
        </div>
        <div>
          <button type="submit" className='button primary button tiny' disabled={submitting}>
            {submitting ? <i/> : <i/>} Make Payment
          </button>
          <button type="button" className = 'button alert button tiny' disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
      </Modal>
     </div> 
			)
         
  }
}

PaymentForm.propTypes = {
	userInfo: PropTypes.object.isRequired,
	groupMembers: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'payment',
  fields
})(PaymentForm)
