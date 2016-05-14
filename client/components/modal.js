import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import MemberList from './memberList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends Component {
  render(){
      if(this.props.isOpen){
        return(   
          <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className = 'modal-overlay'>
              <div className='modal'>
                {this.props.children}
              </div>
            </div>
          </ReactCSSTransitionGroup>
        )
      }else {
        return <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}/>;
      }
    }

};