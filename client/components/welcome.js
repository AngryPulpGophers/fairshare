import React, {Component} from 'react';
import render from 'react-dom';
import { Link, browserHistory } from 'react-router';
import ScreenShot from '../images/screen-shot.png';



export default class Welcome extends Component{

  componentWillMount(){
    if(this.props.isAuthed){
      browserHistory.push('/home');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isAuthed){
      this.props.getUserInfo();
      browserHistory.push('/home');
    }
  }	

  render(){
  	return(
      <div className="dashboard guest">
        <div className="row">
          <div className="small-12 large-7 large-centered columns text-center">
            <div className="component-wrapper">
              <h1>Welcome to Fairshare</h1>
              <p>We know it's hard to keep track of expenses with friends &amp; roommates. Sometimes you just need a little help! Sign in add your shared bills and let us do the rest.</p>
              <img src={ScreenShot}/>
              <Link to='/login' title="Get Started" className="button primary"><i className="fa fa-balance-scale"></i>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}