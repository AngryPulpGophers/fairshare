import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import Modal from './modal';


export const fields = ['payee', 'recipient', 'amount', 'note'];

export default class PaymentForm extends Component{

	constructor(props){
    super(props)
    this.state = ({isModalOpen: false,
                   chosenOne:null,
                  })
  }
  openModal = () => {
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }
  handleSubmit = (data) => {
    console.log('data before type changes:', data)
    data.group_id= window.location.href.match(/id.+/)[0].split('=')[1];
    data.recipient = Number(this.state.chosenOne);
    data.payee = this.props.userInfo.id;
    data.amount = Number(Number(data.amount).toFixed(2));
    data.group_id = Number(data.group_id);
    console.log('data after setting recipient:', data);
    // ReactDOM.unmountComponentAtNode(document.getElementById('modHanger'));
    this.setState({isModalOpen:false});
    // console.log('makePayment:', this.props.makePayment);
    this.props.makePayment(JSON.stringify(data));
  }
  resetForm = () => {
  	//do something
  }

  onChange = () => {
   var boxes = document.getElementsByClassName('recip');
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
		  fields: {payee, recipient, amount, note},
		  handleSubmit,
		  resetForm,
      submitting
     } = this.props

    const memberCheckboxes = this.props.groupMembers.filter((obj) => {
      return obj.user_id !== this.props.userInfo.id;
    }).map(obj => { 
      return this.makeCheckBox(obj);  
    })

    return(
    	<div>
    	 <button className = 'button primary button tiny'onClick={this.openModal}>Make Payment</button>
            <Modal id='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
    	<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
         <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
          <div>
            <h2>Make a Payment</h2>
              <label>Select One</label>
                <div>
                  {[...memberCheckboxes]}
                </div>
          </div>
          <div>
            <label>Amount</label>
          <div>
            <input type="number" placeholder="100.00,etc." defaultValue=""
            {...amount}/>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <textarea placeholder="Additional Info" defaultValue=""
          {...note}/>
          <div>
          </div>
        </div>
        <div>
          <button type="submit" className='button primary button tiny' disabled={submitting}>
            {submitting ? <i/> : <i/>} Make Payment
          </button>
          <button type="button" className = 'button alert button tiny' disabled={submitting} onClick={resetForm} style={{marginLeft: 5}}>
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
