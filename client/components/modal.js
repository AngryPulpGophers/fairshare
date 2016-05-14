import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// import MemberList from './memberList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends Component {
  render(){
      let transition = this.props.transitionName ? this.props.transitionName : 'modal-anim';
      if(this.props.isOpen){
        return(   
          <ReactCSSTransitionGroup transitionName={transition} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className = 'modal-overlay'>
              <div className='modal'>
                {this.props.children}
              </div>
            </div>
          </ReactCSSTransitionGroup>
        )
      }else {
        return <ReactCSSTransitionGroup transitionName={transition} transitionEnterTimeout={500} transitionLeaveTimeout={300}/>;
      }
    }

};