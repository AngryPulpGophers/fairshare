import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {signUp, localSignIn} from '../actions/authActions'
import Login from '../components/login';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PageLogin extends Component {


  render() { 
    return (
    <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <Login
       signUp = {this.props.signUp}
       localSignIn = {this.props.localSignIn}
       signIn = {this.props.signIn}
      />
    </ReactCSSTransitionGroup>  
    );
  }

}

PageLogin.propTypes = {
  signUp: PropTypes.func.isRequired,
  localSignIn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
   signIn: state.auth.signIn,
   isAuthed: state.auth.isAuthed,
  };
}

export default connect(mapStateToProps, {
  signUp,
  localSignIn,
})(PageLogin);
