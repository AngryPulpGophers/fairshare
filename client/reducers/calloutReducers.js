import * as ActionTypes from '../actions/calloutActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import update from 'react-addons-update';
console.log(ActionTypes);

export function notifications(state = {callouts: [], displayActive: []}, action) {
  // console.log('pj1',action)
  switch (action.type) {

    case ActionTypes.CREATE_CALLOUT:
      return update(state, {callouts: {$push: [action.payload]}});

    case ActionTypes.REMOVE_CALLOUT:
      const { id } = action.payload;
      const index = state.callouts.map(item => item.id).indexOf(id);
      return update(state, {callouts: {$splice: [[index, 1]]}});

    case ActionTypes.START_DISPLAY:
    var temp = [];
      for (var i = 0; i < action.payload.amount; i++){
        temp.push({
          display: 'none'
        });
      }
      return update(state, {displayActive:{$set:temp}});

    case ActionTypes.TOGGLE_DISPLAY:
      if (state.displayActive[action.payload.id].display==='none'){
        return update(state, {displayActive: {$splice: [[action.payload.id,1,{}]]} });
      }
      else {
        return update(state, {displayActive: {$splice: [[action.payload.id,1,{display: 'none'}]]} });
      }
      return;

    default:
      return state;
  }
}
