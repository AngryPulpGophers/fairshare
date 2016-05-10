import { CALL_API } from '../middleware';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export function getUsers(bool) {
  if(bool){
    return {
      [CALL_API]: {
        endpoint: 'users?notCurr='+ bool,
        req: 'GET',
        id: bool,
        types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE]
      }

    }
  } else {
    return {
      [CALL_API]: {
        endpoint: 'users',
        req: 'GET',
        id: bool,
        types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE]
      }
    }
  }
}


// action passes logic - to component from container
// call action or function from component
// set state in reducer


export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const FRIEND_SUCCESS = 'FRIEND_SUCCESS';
export const FRIEND_FAILURE = 'FRIEND_FAILURE';

export function getFriendProfile (username) {
  console.log("TAO DE MOI ", username)
  return  {

      [CALL_API] : {
        endpoint : 'users/'+username,
        req: 'POST',
        types : [FRIEND_REQUEST, FRIEND_SUCCESS, FRIEND_FAILURE]
        }
  }
}