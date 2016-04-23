import * as ActionTypes from '../actions'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import update from 'react-addons-update'

function notifications(state = {callouts: []}, action) {
  console.log('pj1',action)
  switch (action.type) {

    case ActionTypes.CREATE_CALLOUT:
      return update(state, {callouts: {$push: [action.payload]}})

    case ActionTypes.REMOVE_CALLOUT:
      const { id } = action.payload
      const index = state.callouts.map(item => item.id).indexOf(id)
      return update(state, {callouts: {$splice: [[index, 1]]}})

    default:
      return state
  }
}

function groups(state= {groups: []}, action) {
  console.log('pj0',action)
  switch (action.type) {

    case ActionTypes.GET_GROUPS:
    console.log('pjpjpj1')
      return update(state, {groups: {$set: action.payload.groups}})

    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  notifications,
  groups
})

export default rootReducer
