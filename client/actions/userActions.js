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
