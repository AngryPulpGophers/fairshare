import { CALL_API } from '../middleware';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function getUserInfo (){
	return {
	  [CALL_API]:{
	    endpoint: 'users/id',
	    req: 'GET',
      types:[USER_REQUEST, USER_SUCCESS, USER_FAILURE]
	  }
	}
}

export function logoutUser (){
  //make sure local storage is cleared
	return {
		[CALL_API]:{
			endpoint: 'auth/logout',
			req: 'GET',
			types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
		}
	}
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export function updateUserInfo(userObj) {
  return {
    [CALL_API]: {
      endpoint: 'users/username',
      req: 'PUT',
      body: JSON.stringify(userObj),	
      types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE]
    }
  }
}

export const RESET_ALERT = 'RESET_ALERT';
export function resetAlert() {
  return {
      type: RESET_ALERT,
      userIsUpdated: false
  }
}
