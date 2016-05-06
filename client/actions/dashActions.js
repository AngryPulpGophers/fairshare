import { CALL_API } from '../middleware';

export const DASH_REQUEST = 'DASH_REQUEST';
export const DASH_SUCCESS = 'DASH_SUCCESS';
export const DASH_FAILURE = 'DASH_FAILURE';

export function getDashboard() {
  // console.log('got an id:', id)
  return {
    [CALL_API]: {
      endpoint: 'dashboard/',
      req: 'GET',
      types: [DASH_REQUEST, DASH_SUCCESS, DASH_FAILURE]
    }

  }
}