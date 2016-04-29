import { groups } from './groupReducers';
import { notifications } from './calloutReducers';
import { users } from './userReducers';
import { members } from './memberReducers';
import {reducer as form} from 'redux-form';
import { auth } from './authReducers';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  routing: routeReducer,
  notifications,
  users,
  groups,
  members,
  form,
  auth
});

export default rootReducer;
