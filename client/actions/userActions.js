import { CALL_API } from '../middleware';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export function getUsers() {
  // console.log('got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'users',
      types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE]
    }

  }
}
