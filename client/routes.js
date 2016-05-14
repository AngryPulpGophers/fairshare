import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './containers/app'
import CreateGroup from './containers/page-create-group'
import Login from './containers/page-login'
import Dashboard from './containers/page-dashboard'
import NotFound from './containers/page-not-found'
import GroupView from './containers/page-groupView'
import Profile from './containers/page-profile'
import CancelPayPal from './containers/page-cancel-paypal'
import SocialAccountError from './containers/page-link-failure'
import friendProfileView from './components/friendProfileView'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="/login" component={Login} />
    <Route path="/create-group" component={CreateGroup} />
    <Route path = "/groupView" component = {GroupView} />
    <Route path="/profile" component={Profile} />
    <Route path="/cancel"  component={CancelPayPal}/>
    <Route path="/linkerror" component={SocialAccountError}/>
    <Route path="*" component={NotFound} />
  </Route>
)
