import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Login from '../components/login';
class PageLogin extends Component {
	//pjs potential hotfix
	componentWillReceiveProps(nextProps){
	    if(nextProps.isAuthed){
	      browserHistory.push('/profile');
	    }
	  }

  render() {
    return (
      <Login

      />
    )
  }

};

PageLogin.propTypes = {
}

function mapStateToProps(state) {
  console.log('mapstatetprops called:',state);
  return {

  }
}

export default connect(mapStateToProps, {
})(PageLogin);
