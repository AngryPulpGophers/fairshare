import { CALL_API } from '../middleware';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_FAILURE = 'USER_FAILURE';
// export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
// export const GROUPS_FAILURE = 'GROUPS_FAILURE';

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
			type: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
		}
	}
}