import React from 'react';
import { Route, IndexRedirect, browserhistory } from 'react-router';
import App from './containers/app';
import WelcomePage from './containers/page-welcome';
import CreateGroup from './containers/page-create-group';
import Login from './containers/page-login';
import Dashboard from './containers/page-dashboard';
import NotFound from './containers/page-not-found';
import GroupView from './containers/page-groupView';
import Profile from './containers/page-profile';
import ResetPassword from './containers/page-reset';
import friendProfileView from './components/friendProfileView';


export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/welcome'/>
    <Route path='/welcome' component={WelcomePage}/>
    <Route path='/login' component={Login} />
    <Route path='/home' component={Dashboard}/>
    <Route path='/create-group' component={CreateGroup} />
    <Route path='/groupView' component = {GroupView} />
    <Route path='/profile' component={Profile} />
    <Route path='/resetPassword' component={ResetPassword}/>
    <Route path='*' component={NotFound} />
  </Route>
)
