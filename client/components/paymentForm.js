import React, { Component, PropTypes, Link } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import Modal from './modal';
import PayHelp from '../utility/PaymentViewHelper';

export const fields = ['payee', 'recipient', 'email', 'amount', 'note'];

export default class PaymentForm extends Component{

	constructor(props){
    super(props)
    this.state = ({
      isModalOpen: false,
      chosenOne:null,
    })
  }

//PayHelp methods and explanations --> client/utility/PaymentViewHelper.js

  openModal = () => {
    PayHelp.openModal(this);
  }
  closeModal = () => {
    PayHelp.closeModal(this);
  }

  handleSubmit = (data) => {
    PayHelp.handleSubmit(this,data);
  }

  onChange = () => {
    let userID = PayHelp.getRadioButtons('recip');
    this.setState({chosenOne: userID})
  }



	render(){
		const{
		  fields: {payee, recipient, email, amount, note},
		  handleSubmit,
		  resetForm,
      submitting
     } = this.props

    let RadioButtons = PayHelp.memberButtons(this, PayHelp.makeRadioButton);

    return(
    	<span>
       <a onClick={this.openModal}><i className="fa fa-dollar"></i> Make Payment</a>
      <Modal className='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
         <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
          <div>
            <h2>Make a Payment</h2>
            <label>Select One</label>
              <div>
                {[...RadioButtons]}
              </div>
          </div>
            <div>
              <label>Email</label>
            <div>
              <input type="text"  placeholder="Required for PayPal transaction only"  title ='If using paypal,recipient email is required.'
              {...email}/>
            </div>
          </div>
          <div>
            <label>Amount</label>
            <div>
              <input type="text" placeholder="100.00" pattern = '[0-9]{1,}\.[0-9]{2}' title ='include two decimal places'
              {...amount} required/>
            </div>
          </div>
          <div>
            <label>Notes</label>
            <div>
              <textarea placeholder="Additional Info" defaultValue= ""
              {...note} required/>
            </div>
          </div>
        <div>
          <button type="submit" onClick={()=>sessionStorage.setItem('cash',true)} className='button primary button tiny' disabled={submitting}>
            {submitting ? <i/> : <i/>} Register Cash Payment
          </button>
          <button type="button" className = 'button alert button tiny' disabled={submitting} onClick={resetForm} style={{marginLeft: 5}}>
            Clear Values
          </button>
          <button type='submit' onClick={()=>sessionStorage.setItem('paypal',true)} className = 'button info expand' disabled={submitting} style={{marginLeft: 5}}><i className= 'fa fa-paypal' style={{marginRight:'2px'}}></i>Settle up through PayPal</button>
        </div>
      </form>
      </Modal>
     </span> 
			)
         
  }
}

PaymentForm.propTypes = {
	userInfo: PropTypes.object.isRequired,
	groupMembers: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  usePaypal: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}



export default reduxForm({
  form: 'payment',
  fields
})(PaymentForm)


