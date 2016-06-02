import * as ActionTypes from '../actions/authActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
console.log(ActionTypes);
export function auth(state = {isFetching: false, isAuthed: false, isOpen: true, signIn: false, 
  logIn:false, loginError: '', emailPass: false, emailSuccess: false, userInfo: {}}, action){
	
  switch (action.type){

    case ActionTypes.OPEN_EMAIL:
      return update(state,{
        emailPass: {$set:true}
      })

    case ActionTypes.SEND_EMAIL:
      return update(state,{
        isFetching: {$set:true}
      })
    case ActionTypes.SEND_SUCCESS:
      return update(state,{
        isFetching: {$set:false},
        emailSuccess: {$set: true}
      })
    case ActionTypes.SEND_FAILURE:
      return update(state,{
        isFetching: {$set: false},
        loginError: {$set: action.error}
      })
    case ActionTypes.CLEAR_EMAIL:
      return update(state,{
        emailSuccess: {$set: false},
        emailPass: {$set: false}
      })

    case ActionTypes.SIGNUP_LOCAL:
      return update(state,{
        signIn: {$set: true}
      })
    case ActionTypes.LOGIN_ATTEMPT:
      return update(state,{
        logIn: {$set:true}
      })

    case ActionTypes.SIGNUP_REQUEST:
      return update(state,{
        isFetching: {$set: true}
      })
    case ActionTypes.SIGNUP_SUCCESS:
    window.location = '/';
      return update(state,{
        isFetching: {$set: false},
        isAuthed: {$set: true}
      })
    case ActionTypes.SIGNUP_FAILURE:
      return update(state,{
        isFetching: {$set: false}
      })
    case ActionTypes.LOCAL_LOGIN:
      return update(state,{
        isFetching: {$set: true}
      })
    case ActionTypes.LOCAL_SUCCESS:
    window.location = '/';
      return update(state,{
        isFetching: {$set: false},
        isAuthed: {$set: true}
      })
    case ActionTypes.LOCAL_FAILURE:
      return update(state,{
        isFetching: {$set: false},
        loginError: {$set: action.error}
      })
    case ActionTypes.LOGIN_ERROR:
      return update(state,{
        loginError: {$set: ""}
      })
		case ActionTypes.USER_LOGIN:
		console.log('in auth reducer');
		  return update(state, {
        isFetching:{$set: true},
			  isAuthed: {$set:false},
		  });

    case ActionTypes.USER_SUCCESS:
    //console.log('action.response in USER_SUCCESS:', action.response);
    //take advantage of localstorage
    window.localStorage.setItem("isAuthed", true);
      return update(state, {
    	  isFetching:{$set: false},
	      isAuthed: {$set: true},
	      userInfo: {$set: JSON.parse(action.response)}
	    });

    case ActionTypes.USER_FAILURE:
      return update(state, {
        isFetching:{$set: false},
        isAuthed: {$set: false}
      });

	  case ActionTypes.LOGOUT_REQUEST:
	    return update(state, {
	      isFetching: {$set: true}
	    });

	  case ActionTypes.LOGOUT_SUCCESS:
      //make sure local storage is cleared
	    return update(state,{
        isFetching: {$set:false},
        isAuthed: {$set: false}
      })

	  case ActionTypes.LOGOUT_FAILURE:
	    return update(state, {
	  	  isFetching: {$set: false}
	    });

    case ActionTypes.UPDATE_USER_REQUEST:
      return update(state, {
        isFetching: {$set: true}
      });

    case ActionTypes.UPDATE_USER_SUCCESS:
    // console.log("Action.response  in authReducers.js", action.response);
      return update(state, {
        isFetching: {$set: false},
        userInfo: {$set: JSON.parse(action.response)},
        userIsUpdated: {$set: true}
      });

    case ActionTypes.RESET_ALERT:
      return update(state, {
        userIsUpdated: {$set: false}
      });

    case ActionTypes.UPDATE_USER_FAILURE:
      return update(state, {
      isFetching: {$set: false}
    });

    case ActionTypes.RESET_MODAL:
      return update(state, {
        isFetching: {$set: true}
    });
    case ActionTypes.RESET_MODAL_SUCCESS:
      return update(state, {
        isFetching: {$set: false},
        userInfo: {$set: JSON.parse(action.response)}
    });
     case ActionTypes.RESET_MODAL_FAILURE:
      return update(state, {
        isFetching: {$set: false}
    });
      case ActionTypes.UNLINK_REQUEST:
      return update(state, {
        isFetching: {$set: true}
    });
    case ActionTypes.UNLINK_SUCCESS:
      return update(state, {
        isFetching: {$set: false},
        userInfo: {$set: JSON.parse(action.response)}
    });
     case ActionTypes.UNLINK_FAILURE:
      return update(state, {
        isFetching: {$set: false}
    });

    default:
			return state;
	}
}

