import * as ActionTypes from '../actions/authActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
console.log(ActionTypes);

export function auth(state = {isFetching: false, userInfo: null}, action){
	switch (action.type){
		case ActionTypes.USER_REQUEST:
		console.log('in auth reducer')
		return update(state, {
			isFetching: {$set: true}, 
			userInfo: null
		})
    case ActionTypes.USER_SUCCESS:
    
	  return update(state, {
	  	isFetching: {$set: false},
	  	userInfo: {$set: JSON.parse(action.response)}
	  })	

		default: 
			return state;
	}
}