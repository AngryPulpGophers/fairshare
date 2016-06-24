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
	};
}

export const SIGNUP_LOCAL = 'SIGNUP_LOCAL';

export function localSignIn (){
  console.log('called local signin')
  return {
    type: SIGNUP_LOCAL,
  }
}

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';

export function openLogin (){
  return {
    type: 'LOGIN_ATTEMPT'
  }
}

export const LOGIN_CLOSE = 'LOGIN_CLOSE';

export function closeLogin (){
  return {
    type: 'LOGIN_CLOSE'
  }
}

export const LOCAL_LOGIN = 'LOCAL_LOGIN';
export const LOCAL_SUCCESS = 'LOCAL_SUCCESS';
export const LOCAL_FAILURE = 'LOCAL_FAILURE';

export function localLogIn(formData){
  console.log('called local login with', formData);
  return {
    [CALL_API]:{
      endpoint: 'auth/signin',
      req: 'POST',
      body: JSON.stringify(formData),
      types: [LOCAL_LOGIN, LOCAL_SUCCESS, LOCAL_FAILURE]
    }
  }
}

export const LOGIN_ERROR = 'LOGIN_ERROR';

export function clearLoginError(){
  return {
    type: LOGIN_ERROR
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export function signUp (formData){
  console.log('called signUp with following:', formData);
  return {
    [CALL_API]:{
      endpoint: 'auth/signup',
      req: 'POST',
      body: JSON.stringify(formData),
      types:[SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE]
    }
  }
}

export function logoutUser (){
  //make sure local storage is cleared
  window.localStorage.clear();
	return {
		[CALL_API]:{
			endpoint: 'auth/logout',
			req: 'GET',
			types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
		}
	};
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
  };
}

export const RESET_ALERT = 'RESET_ALERT';
export function resetAlert() {
  return {
    type: RESET_ALERT,
    userIsUpdated: false
  };
}

export const RESET_MODAL = 'RESET_MODAL';
export const RESET_MODAL_SUCCESS = 'RESET_MODAL_SUCCESS';
export const RESET_MODAL_FAILURE = 'RESET_MODAL_FAILURE';

export function stopSocialModal(obj){
  return {
    [CALL_API]:{
      endpoint: 'users/username',
      req:'PUT',
      body: JSON.stringify(obj),
      types:[RESET_MODAL,RESET_MODAL_SUCCESS,RESET_MODAL_FAILURE]
    }
  };
}

export const OPEN_EMAIL = 'OPEN_EMAIL';

export function openEmailModal(){
  return {
    type: OPEN_EMAIL
  }
}

export const CLOSE_EMAIL = 'CLOSE_EMAIL';

export function closeEmailModal(){
  return {
    type: CLOSE_EMAIL
  }
}

export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAILURE = 'SEND_FAILURE';

export function sendEmail(email){
  return {
    [CALL_API]:{
      endpoint: 'cred/sendEmail',
      req:'POST',
      body: JSON.stringify(email),
      types:[SEND_EMAIL, SEND_SUCCESS, SEND_FAILURE]
    }
  }
}
export const CLEAR_EMAIL = 'CLEAR_EMAIL';

export function clearEmailSuccess(){
  return{
    type: CLEAR_EMAIL
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function sendReset(formData){
  return {
    [CALL_API]:{
      endpoint: 'cred/reset',
      req:'PUT',
      body: JSON.stringify(formData),
      types:[RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE]
    }
  }
}

export const CLEAR_RESET_SUCCESS = 'CLEAR_RESET_SUCCESS';

export function clearResetSuccess(){
  return {
    type: CLEAR_RESET_SUCCESS
  }
}

export const ClEAR_RESET_FAILURE = 'ClEAR_RESET_FAILURE';

export function clearResetFailure(){
  return {
    type: ClEAR_RESET_FAILURE
  }
}


export const UNLINK_REQUEST = 'UNLINK_REQUEST';
export const UNLINK_SUCCESS = 'UNLINK_SUCCESS';
export const UNLINK_FAILURE = 'UNLINK_FAILURE';

export function unlinkSocialAcc(obj){
  return {
    [CALL_API]:{
      endpoint: 'users/unlinkAccount',
      req:'POST',
      body: JSON.stringify(obj),
      types:[UNLINK_REQUEST,UNLINK_SUCCESS,UNLINK_FAILURE]
    }
  };
}
