import * as ActionTypes from '../actions/authActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
console.log(ActionTypes);
export function auth(state = {isFetching: false, isAuthed: false, isOpen: true, userInfo: {}}, action){
	switch (action.type){

		case ActionTypes.USER_LOGIN:
		console.log('in auth reducer');
		return update(state, {
      isFetching:{$set: true},
			isAuthed: {$set:false},
			userInfo: {}
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
      window.localStorage.clear();
	    return [];

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

