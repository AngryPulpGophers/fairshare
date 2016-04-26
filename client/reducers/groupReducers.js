import * as ActionTypes from '../actions/groupActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
//console.log(ActionTypes);


export function groups(state = { isFetching: false, groups: [],activity : [], currentGroup: ''}, action) {
    //console.log('groups actions:', action)
    switch (action.type) {
      case ActionTypes.GROUPS_REQUEST:
      return update(state, {isFetching: {$set: true}})

        // return Object.assign({}, state, {
        //   isFetching: true
        // })
      case ActionTypes.GROUPS_SUCCESS:
        console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          groups: {$set: JSON.parse(action.response)}
        })
      case ActionTypes.GROUPS_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      case ActionTypes.ACTIVITY_REQUEST:
        return update(state, {isFetching: {$set: true}})

      case ActionTypes.ACTIVITY_SUCCESS:
      console.log('PJPJPJPJ',action.id)
        return update(state, {
          isFetching: {$set: false},
          currentGroup: {$set: action.id},
          activity: {$set: JSON.parse(action.response)}
        })

      case ActionTypes.ACTIVITY_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      default:
        return state
      }
}

