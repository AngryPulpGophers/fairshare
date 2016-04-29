import { MEMBER_ADDED, MEMBER_REMOVED, MEMBER_CLEAR } from '../actions/memberActions';
import update from 'react-addons-update';

export function members(state = { members: []}, action) {
    console.log('groups actions:', action.type)
    switch (action.type) {

      //clear member data
      case MEMBER_CLEAR:
        console.log('HERE IS WHERE WE CLEAR IT')
        return update(state, {
          members: {$set: []}
        })

      // add a member
      case MEMBER_ADDED:
        return update(state, {
          members: {$push: [action.id]}
        })

      // remove a member
      case MEMBER_REMOVED:
        return update(state, {
          members: {$unshift: [action.id]}
        })

    default:
      console.log('WE DIDNT CLEAR IT')
      return state
    }
}