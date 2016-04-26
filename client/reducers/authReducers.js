import * as ActionTypes from '../actions/authActions';
//import { GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE} from '../actions';
import update from 'react-addons-update';
console.log(ActionTypes);

export function auth(state = {authenticated: false}, action){
	switch (action.type){
		case ActionTypes.FACEBOOK_AUTH:
		console.log('in auth reducer')
		return update(state, {authenticated: {$set: true}})

		default: 
			return state;
	}
}