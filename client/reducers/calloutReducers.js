import * as ActionTypes from '../actions/calloutActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import update from 'react-addons-update';
console.log(ActionTypes);

export function notifications(state = {callouts: []}, action) {
  // console.log('pj1',action)
  switch (action.type) {

    case ActionTypes.CREATE_CALLOUT:
      return update(state, {callouts: {$push: [action.payload]}});

    case ActionTypes.REMOVE_CALLOUT:
      const { id } = action.payload;
      const index = state.callouts.map(item => item.id).indexOf(id);
      return update(state, {callouts: {$splice: [[index, 1]]}});

    default:
      return state;
  }
}
