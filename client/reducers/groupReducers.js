import * as ActionTypes from '../actions/groupActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
//console.log(ActionTypes);

export function groups(state = { isFetching: false, newGroup:{}, groups: [],activity : [], currentGroupUsers: []}, action) {
    //console.log('groups actions:', action)
    switch (action.type) {
      case ActionTypes.GROUPS_REQUEST:
      return update(state, {isFetching: {$set: true}})
      // return Object.assign({}, state, {
      //   isFetching: true
      case ActionTypes.GROUPS_SUCCESS:
        console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          groups: {$set: JSON.parse(action.response)}
        })
      case ActionTypes.GROUPS_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.CREATE_REQUEST:
        return update(state, {
          isFetching: {$set: true}})
      case ActionTypes.CREATE_SUCCESS:
        //console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          groups: {$push: [JSON.parse(action.response)]}
        })
      case ActionTypes.CREATE_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.ACTIVITY_REQUEST:
        return update(state, {isFetching: {$set: true}})

      case ActionTypes.ACTIVITY_SUCCESS:
      console.log('PJPJPJPJ',action.id)
        return update(state, {
          isFetching: {$set: false},
          activity: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.ACTIVITY_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.USERBYGROUP_REQUEST:
      return update(state, {isFetching: {$set: true}})

        // return Object.assign({}, state, {
        //   isFetching: true
        // })
      case ActionTypes.USERBYGROUP_SUCCESS:
        console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          currentGroupUsers: {$set: JSON.parse(action.response)}
        })
      case ActionTypes.USERBYGROUP_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      default:
        return state
      }
    }
