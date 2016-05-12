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

export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const FRIEND_SUCCESS = 'FRIEND_SUCCESS';
export const FRIEND_FAILURE = 'FRIEND_FAILURE';

export function getFriendProfile (username) {
  return  {

      [CALL_API] : {
        endpoint : 'users/'+username,
        req: 'GET',
        types : [FRIEND_REQUEST, FRIEND_SUCCESS, FRIEND_FAILURE]
        }
  }
}


export const NEW_EMAIL_REQUEST = 'NEW_EMAIL_REQUEST';
export const NEW_EMAIL_SUCCESS = 'NEW_EMAIL_SUCCESS';
export const NEW_EMAIL_FAILURE = 'NEW_EMAIL_FAILURE';

export function emailNewUser(formData) {
  //console.log('called actions with:', members, formData)
  return {
    [CALL_API]: {
      endpoint: 'users/invite',
      body: formData,
      req: 'POST',
      types: [NEW_EMAIL_REQUEST, NEW_EMAIL_SUCCESS, NEW_EMAIL_FAILURE]
    }
  }
}
