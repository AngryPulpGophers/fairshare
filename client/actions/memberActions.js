//import { CALL_API } from '../middleware';
export const INPUT_FOCUSED = 'INPUT_FOCUSED';
// export function focusOnInput() {
//   return {
//     type: INPUT_FOCUSED,

//   }
// }
//add a member to a group
export const MEMBER_ADDED = 'MEMBER_ADDED';
export function addMember(userObj) {
  if(Object.keys(userObj).length > 0){
    if(userObj.value){
      userObj.user_id = userObj.value;
    }
    return {
      type: MEMBER_ADDED,
      userObj: userObj,
    };
  }
}

//remove a member from a group
export const MEMBER_REMOVED = 'MEMBER_REMOVED';
export function removeMember(id) {
  return {
    type: MEMBER_REMOVED,
    id: id,
  };
}

//clear all members (to prevent prepopulation in form)
export const MEMBER_CLEAR = 'MEMBER_CLEAR';
export function clearMembers(){
  //console.log('trying to CLEAR IT');
  return {
    type: MEMBER_CLEAR
  };
}
