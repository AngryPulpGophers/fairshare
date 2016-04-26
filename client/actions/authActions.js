import { CALL_API } from '../middleware';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
// export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
// export const GROUPS_FAILURE = 'GROUPS_FAILURE';

export function getUserInfo (){
	return {
	[CALL_API]:{
	  endpoint: 'users',
      types:[USER_REQUEST, USER_SUCCESS]
	  }
	}
}