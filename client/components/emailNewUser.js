import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import PureInput from './PureInput';
import Modal from './modal';
import request from 'superagent';
export const fields = [ 'email', 'note'];

export default class EmailNewUser extends Component {

  constructor(props){
    super(props);
    this.state = ({isModalOpen: false});
    //this.state = ({initialValue: true})
  }
  openModal = () => {
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }


  handleSubmit(data) {
    if (this.props.userInfo){
      //ID= ID[1].split('&')
        var obj = {};
        obj.email = data.email;
        obj.note = data.note;
        //obj.group_id = Number(ID[1]);
        console.log('send to post expense', obj);
        this.setState({isModalOpen:false});
        this.props.destroyForm();
        this.props.emailNewUser(JSON.stringify(obj));

        //location.replace(baseURL+'/groupView?id='+ID[1]);


    }
    else{
      console.log("ERROR NO CURRENT USER");
    }
}


  render(){

    const {

      fields: { email, note },
      handleSubmit,
      resetForm,
      submitting
      } = this.props;


    return (
      <span>
      <a onClick={this.openModal}>Invite a Friend</a>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
      <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this)).bind(this)}>
        <i onClick={this.closeModal} className="fa fa-times-circle-o" aria-hidden="true" style = {{cursor:'pointer'}}></i>
        <div>
          <h2>Suggest Friend to join</h2>
          <label>Friends Email Address</label>
          <div>
            <input type="email" placeholder="Email" required{...email}/>
          </div>
        </div>
        <div>
          <label>Note</label>
          <div>
            <input type="text" placeholder="Note" required{...note}/>
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
      </Modal>
      </span>
    )
  }
}

export default reduxForm({
  form: 'newUserEmail',
  fields
})(EmailNewUser)
