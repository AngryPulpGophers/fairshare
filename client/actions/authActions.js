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
      types:[USER_REQUEST, USER_SUCCESS, USER_FAILURE]
	  }
	}
}

export function logoutUser (){
	return {
		[CALL_API]:{
			endpoint: 'auth/logout',
			types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
		}
	}
}