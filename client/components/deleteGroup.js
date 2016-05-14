import React, { Component, PropTypes } from 'react';
import { deleteGroup } from '../actions/groupActions';
import Modal from './modal';

export default class DeleteGroup extends Component {
  constructor(props){
    super(props);
    this.state = ({
      isModalOpen: false
    });
  }

  handleDeleteGroup(){
    this.setState({isModalOpen:true});
  }

  render(){
    console.log('the group to delete:',this.props.groupID);
    return this.props.groupID ? (
      <div className="delete-group">
      <button onClick={() => { this.handleDeleteGroup()} } className="alert button">Delete Group</button>
      <Modal className='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <h3>Are you sure?</h3>
            <p>This process cannot be undone. All group expense and payment info will be lost!</p>
            <p>
              <button onClick={()=>{this.props.deleteGroup(this.props.groupID)}} className="alert button">Delete</button>
              <button onClick={()=>{this.setState({isModalOpen:false})}} className="secondary button">Cancel</button>
            </p>
          </div>
        </div>
      </Modal>
      </div>
    ): null
  }
}
