import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import EmailNewUser from './emailNewUser';
import defaultPicture from '../images/fs-logo.png';
import SignInForm from './signInForm';


export default class Navigation extends Component {
  render() {
    const instance = this;
    const isAuthed = this.props.isAuthed;
    return isAuthed ? (
      <div>
        <div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
          <button className="menu-icon" type="button" data-toggle></button>
          <div className="title-bar-title"><h1>Fairshare</h1></div>
        </div>
        <div className="top-bar" id="example-menu">
          <div className="top-bar-title">
            <Link to='/' title="Dashboard"><h1> Fairshare</h1></Link>
          </div>
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <Link to='/' title="Dashboard">Dashboard</Link>
              </li>
              <li>
                <EmailNewUser
                  userInfo = {this.props.userInfo}
                  emailNewUser = {this.props.emailNewUser}
                />
              </li>
            </ul>
          </div>
          <div className="top-bar-right">
            {/*<span> Welcome, {this.props.userInfo.name.split(' ')[0]}</span>*/}
            <ul className="menu">
              <li>
                <Link to="/profile" className="img-placeholder">
                  <img className = 'roundCorner-image' src = {this.props.userInfo.img_url || defaultPicture}/>
                </Link>
              </li>
              <li><button onClick={() => {this.props.logoutUser()}} type='button' className='primary button'>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>

    ) :
    (
      <div>
        <div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
          <button className="menu-icon" type="button" data-toggle></button>
          <div className="title-bar-title"><h1>Fairshare</h1></div>
        </div>
        <div className="top-bar" id="example-menu">
          <div className="top-bar-title">
            <Link to='/' title="Dashboard"><h1> Fairshare</h1></Link>
          </div>
          {!this.props.logIn ? 
          <div className="top-bar-right">
            <ul className="menu">
              <li><button className='button primary' onClick={()=> this.props.openLogin()}>Sign in</button></li>
            </ul>
          </div>
          : <SignInForm 
             closeLogin = {this.props.closeLogin}
             loginError = {this.props.loginError}
             clearLoginError = {this.props.clearLoginError}
             localLogIn = {this.props.localLogIn}
             emailPass = {this.props.emailPass}
             openEmailModal = {this.props.openEmailModal}
             closeEmailModal = {this.props.closeEmailModal}
             sendEmail = {this.props.sendEmail}
             emailSuccess = {this.props.emailSuccess}
             clearEmailSuccess = {this.props.clearEmailSuccess}
            />
            }
        </div>
          
      </div>
    )
  }
}

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired,
  logIn: PropTypes.bool.isRequired,
  localLogIn: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  openEmailModal: PropTypes.func.isRequired,
  closeEmailModal: PropTypes.func.isRequired,
  emailPass: PropTypes.bool.isRequired,
  sendEmail: PropTypes.func.isRequired,
  emailSuccess: PropTypes.bool.isRequired,
  clearEmailSuccess: PropTypes.func.isRequired
}
