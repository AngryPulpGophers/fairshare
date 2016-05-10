import * as ActionTypes from '../actions/userActions';
import update from 'react-addons-update';

export function users(state = { isFetching: false, users: [], friendProfile : {} }, action) {
    switch (action.type) {

      case ActionTypes.USERS_REQUEST:
        return update(state, {isFetching: {$set: true}})

      case ActionTypes.USERS_SUCCESS:
        return update(state, {
          isFetching: {$set: false},
          users: {$set: cleanUsers(action.response)}
        })

      case ActionTypes.USERS_FAILURE:
        return update(state, {
          isFetching: {$set: false}})

// what does this reducer need to do differently vs. USERS_SUCCESS?
// needs action. 

      case ActionTypes.FRIEND_REQUEST:
        return update(state, {
          isFetching: {$set: true}
        })

      case ActionTypes.FRIEND_SUCCESS:
        console.log("*******Inside action response*******", action)
        return update(state, {
          isFetching: {$set: false},
          friendProfile: {$set: action.response}
        })

        case ActionTypes.FRIEND_FAILURE:
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
    newObj.push({'name':obj[i].name,'image':obj[i].img_url,'value': ''+obj[i].id});
  }
  return newObj
}