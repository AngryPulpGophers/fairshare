import { CALL_API } from '../middleware';

export const FACEBOOK_AUTH = 'FACEBOOK_AUTH';
// export const GROUPS_SUCCESS = 'GROUPS_SUCCESS';
// export const GROUPS_FAILURE = 'GROUPS_FAILURE';

export function setAuth (){
	return {
	  type: FACEBOOK_AUTH
	}
}