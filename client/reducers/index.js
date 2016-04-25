import { groups } from './groupReducers';
import { notifications } from './calloutReducers';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  routing: routeReducer,
  notifications,
  groups
});

export default rootReducer;
