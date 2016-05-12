import { MEMBER_ADDED, MEMBER_REMOVED, MEMBER_CLEAR } from '../actions/memberActions';
import update from 'react-addons-update';

export function members(state = { members: []}, action) {
    switch (action.type) {

      //clear member data
      case MEMBER_CLEAR:
        return update(state, {
          members: {$set: []}
        })

      // add a member
      case MEMBER_ADDED:
        console.log('member state', state)
        if(checkMem(state,action.userObj)){
          return update(state, {
            members: {$push: [action.userObj]}
          })
        } 

      // remove a member
      case MEMBER_REMOVED:
        console.log('TO BE REMOVED',action.id)
        return update(state, {
          members: {$set: removeMem(state,action.id)}
        })

    default:
      return state
    }
}

function checkMem(state,userObj) {
  console.log('each of our members', userObj)
  for (var i = 0; i < state.members.length; i++) {
    //console.log(Number(state.members[i].value), 'does not equal', userObj)
    if (state.members[i].value && state.members[i].value === userObj.value) {
      return false;
    } else if (state.members[i].user_id && state.members[i].user_id === userObj.user_id) {
      return false
    }
  }
  return true;
}


function removeMem(state,id){
  return state.members.filter(function(item){
    return Number(item.value) !== id
  })
}