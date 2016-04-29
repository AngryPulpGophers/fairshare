import * as ActionTypes from '../actions/authActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
console.log(ActionTypes);

export function auth(state = {isFetching: false, isAuthed: false, userInfo: {}}, action){
	switch (action.type){
		
		case ActionTypes.USER_LOGIN:
		console.log('in auth reducer')
		return update(state, {
      isFetching:{$set: true},
			isAuthed: {$set:false}, 
			userInfo: {}
		})
    
    case ActionTypes.USER_SUCCESS:
    console.log('action.response in USER_SUCCESS:', action.response);
    return update(state, {
    	isFetching:{$set: false},
	    isAuthed: {$set: true},
	    userInfo: {$set: JSON.parse(action.response)}
	  })
    
    case ActionTypes.USER_FAILURE:
      return update(state, {
      isFetching:{$set: false},
      isAuthed: {$set: false}
    })
	  
	  case ActionTypes.LOGOUT_REQUEST:
	    return update(state, {
	    isFetching: {$set: true}
	  })
	  
	  case ActionTypes.LOGOUT_SUCCESS:
	    return [];
	  
	  case ActionTypes.LOGOUT_FAILURE:
	    return update(state, {
	  	isFetching: {$set: false}
	  })	

		default: 
			return state;
	}
}

