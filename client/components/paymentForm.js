import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Modal from './modal';

export const fields = ['Payee', 'Recipient', 'Amount'];

export default class PaymentForm extends Component{

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
  handleSubmit(data){
  	console.log(data);
  }
  resetForm(){
  	//do something
  }

	render(){
    {console.log('users:', this.props.groupMembers)}
    {console.log('current user:', this.props.userInfo)}
		const{
		  fields: {Payee, Recipient, Amount},
		  handleSubmit,
		  resetForm,
      submitting
     } = this.props
    return(
    	<div>
    	 <button className = 'button primary button tiny'onClick={this.openModal}>Make Payment</button>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
    	<form onSubmit={handleSubmit}>
         <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
				  <div>
              <label>Payee</label>
            <div>
              <input type="text" placeholder="Payee"/>
            </div>
          </div>
          <div>
            <label>Recipient</label>
            <div>
              <input type="text" placeholder="Recipient"/>
            </div>
          </div>
          <div>
            <label>Amount</label>
          <div>
            <input type="text" placeholder="Amount"/>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
          </div>
        </div>
        <div>
          <button type="submit" className='button primary button tiny' disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
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
	user: PropTypes.object.isRequired,
	groupMembers: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'payment',
  fields
})(PaymentForm)
