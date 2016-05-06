import { DASH_REQUEST, DASH_SUCCESS, DASH_FAILURE } from '../actions/dashActions';
import update from 'react-addons-update';

export function dashboard(state = { dashboard: []}, action) {
  switch (action.type) {
    case DASH_REQUEST:
    return update(state, {isFetching: {$set: true}})
    // return Object.assign({}, state, {
    //   isFetching: true
    case DASH_SUCCESS:
      return update(state, {
        isFetching: {$set: false},
        dashboard: {$set: JSON.parse(action.response)}
      })
    case DASH_FAILURE:
      return update(state, {
        isFetching: {$set: false}})
    default:
      return state
  }

}