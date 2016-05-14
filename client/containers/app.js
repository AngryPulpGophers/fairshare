import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';
import Navigation from '../components/navigation';
import { createCallout } from '../actions/calloutActions';
import { getUserInfo } from '../actions/authActions';
import { logoutUser }  from '../actions/authActions';
import { emailNewUser } from '../actions/userActions';
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
      <div>
        <Navigation createCallout={this.props.createCallout} 
          isAuthed={this.props.isAuthed} 
          userInfo = {this.props.userInfo} 
          logoutUser ={this.props.logoutUser} 
          emailNewUser = {this.props.emailNewUser}/>
        <div className='row'>
          <div className='large-12 columns'>
            {children}
          </div>
        </div>
      </div>

    )
  }

  componentWillMount(){
    this.props.getUserInfo()  
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
  userInfo: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    isAuthed: state.auth.isAuthed,
    userInfo: state.auth.userInfo
  }
}

export default connect(mapStateToProps, {
  createCallout,getUserInfo,logoutUser,emailNewUser
})(App)
