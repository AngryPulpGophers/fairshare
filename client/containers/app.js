import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/navigation';
import { createCallout } from '../actions/calloutActions';
import { getUserInfo, logoutUser, openLogin, closeLogin, localLogIn, 
       clearLoginError, openEmailModal, closeEmailModal, sendEmail, clearEmailSuccess} from '../actions/authActions';
import { emailNewUser } from '../actions/userActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/index.css';
import '../styles/foundation.scss';


//load jquery and foundation in the window scope

import 'script!jquery';
import 'script!what-input';
import 'script!foundation-sites';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // children are components which defined in the routes as children of App
    const { children } = this.props;
    return (
      <ReactCSSTransitionGroup transitionName='example' transitionAppear={true}  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div>
          <Navigation 
            createCallout={this.props.createCallout} 
            gotResp={this.props.gotResp} 
            isAuthed = {this.props.isAuthed}
            userInfo = {this.props.userInfo} 
            logoutUser ={this.props.logoutUser} 
            emailNewUser = {this.props.emailNewUser}
            openLogin = {this.props.openLogin}
            closeLogin = {this.props.closeLogin}
            logIn = {this.props.logIn}
            localLogIn = {this.props.localLogIn}
            loginError = {this.props.loginError}
            clearLoginError = {this.props.clearLoginError}
            openEmailModal = {this.props.openEmailModal}
            closeEmailModal = {this.props.closeEmailModal}
            emailPass = {this.props.emailPass}
            sendEmail = {this.props.sendEmail}
            emailSuccess = {this.props.emailSuccess}
            clearEmailSuccess = {this.props.clearEmailSuccess}
            />
          <div className='row'>
            <div className='large-12 columns'>
              {children}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }

  componentDidMount() {
    $(document).foundation()
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node,
  getUserInfo: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  gotResp: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  logIn: PropTypes.bool.isRequired,
  localLogIn: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  openEmailModal: PropTypes.func.isRequired,
  closeEmailModal: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  clearEmailSuccess: PropTypes.func.isRequired,
  emailSuccess: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    gotResp: state.auth.gotResp,
    isAuthed: state.auth.isAuthed,
    userInfo: state.auth.userInfo,
    logIn: state.auth.logIn,
    loginError: state.auth.loginError,
    emailPass: state.auth.emailPass,
    emailSuccess: state.auth.emailSuccess
  }
}

export default connect(mapStateToProps, {
  createCallout,
  getUserInfo,
  logoutUser,
  emailNewUser,
  openLogin,
  closeLogin,
  localLogIn,
  clearLoginError,
  openEmailModal,
  closeEmailModal,
  sendEmail,
  clearEmailSuccess
})(App)
