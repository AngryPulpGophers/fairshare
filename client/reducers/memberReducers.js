import { MEMBER_ADDED, MEMBER_REMOVED }from '../actions/memberActions';
import update from 'react-addons-update';

export function members(state = { members: []}, action) {
    //console.log('groups actions:', action)
    switch (action.type) {
      case MEMBER_ADDED:
        return update(state, {
          members: {$push: [action.id]}
        })
      case MEMBER_REMOVED:
        return update(state, {
          members: {$unshift: [action.id]}
        })

    default:
      return state
    }
}