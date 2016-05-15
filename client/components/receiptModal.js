import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export default class ReceiptModal extends Component {
  constructor(props){
    super(props);
    this.state = ({isModalOpen: false});
    //this.state = ({initialValue: true})
  }
  render(){
    return (
      <span>
      <a onClick={()=> { this.setState({isModalOpen:true}) } }>
        <img src={this.props.img_src} />
      </a>
      <Modal key={this.props.key+'modal'} className='modal' isOpen={this.state.isModalOpen} transitionName="modal-anim">
        <div className="row">
          <div className="small-12 large-10 large-centered columns text-center">
            <img src={this.props.img_src} />
            <div className="row">
              <div className="align-center">
              <p>
                <br />
                <button onClick={ ()=> {this.setState({isModalOpen:false}) } } className="secondary button">Close</button>
              </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      </span>
    )
  }
}