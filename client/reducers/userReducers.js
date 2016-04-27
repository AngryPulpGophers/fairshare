import * as ActionTypes from '../actions/userActions';
import update from 'react-addons-update';

export function users(state = { isFetching: false, users: []}, action) {
    //console.log('groups actions:', action)
    switch (action.type) {
      case ActionTypes.USERS_REQUEST:
      return update(state, {isFetching: {$set: true}})

        // return Object.assign({}, state, {
        //   isFetching: true
        // })
      case ActionTypes.USERS_SUCCESS:
        console.log('got our type and resp:', action.response)
        return update(state, {
          isFetching: {$set: false},
          users: {$set: cleanUsers(action.response)}
        })
      case ActionTypes.USERS_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

      default:
        return state
      }
}

//get a new user object that fuzzy search can work with
function cleanUsers(text){
  var obj = JSON.parse(text);
  let newObj = [];
  for(var i = 0; i < obj.length; i++) {
    newObj.push({'name':obj[i].username,'value': ''+obj[i].id});
  }
  return newObj
}