import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import MemberList from './memberList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ErrorModal extends Component {
  render(){
      if(this.props.isOpen){
        return(   
          <div className = 'modal-overlay'>
            <div className='modal' style={{backgroundColor:'#ffb3b3'}}>
              {this.props.children}
            </div>
          </div>
        )
      }else {
        return <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}/>;
      }
    }

};