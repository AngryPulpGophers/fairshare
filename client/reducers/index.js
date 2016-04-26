import * as ActionTypes from '../actions';
import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE,ACTIVITY_REQUEST, ACTIVITY_SUCCESS, ACTIVITY_FAILURE} from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import update from 'react-addons-update';


function notifications(state = {callouts: []}, action) {
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

//types: [ACTIVITY_REQUEST, ACTIVITY_SUCCESS, ACTIVITY_FAILURE]
// The quotes reducer
function groups(state = { isFetching: false, groups: [],activity : [], currentGroup: ''}, action) {
  //console.log('groups actions:', action)
  switch (action.type) {
    case GROUPS_REQUEST:
    return update(state, {isFetching: {$set: true}})

      // return Object.assign({}, state, {
      //   isFetching: true
      // })
    case GROUPS_SUCCESS:
      console.log('got our type and resp:', action.response)
      return update(state, {
        isFetching: {$set: false},
        groups: {$set: JSON.parse(action.response)}
      })
    case GROUPS_FAILURE:
      return update(state, {
        isFetching: {$set: false}})

    case ACTIVITY_REQUEST:
      return update(state, {isFetching: {$set: true}})

    case ACTIVITY_SUCCESS:
    console.log('PJPJPJPJ',action.id)
      return update(state, {
        isFetching: {$set: false},
        currentGroup: {$set: action.id},
        activity: {$set: JSON.parse(action.response)}
      })

    case ACTIVITY_FAILURE:
      return update(state, {
        isFetching: {$set: false}})



    default:
      return state
    }
}


const rootReducer = combineReducers({
  routing: routeReducer,
  notifications,
  groups
});

export default rootReducer;
