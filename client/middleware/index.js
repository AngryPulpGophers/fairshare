import { UPDATE_LOCATION } from 'react-router-redux';
const BASE_URL = 'http://localhost:3000/';

let config = {};
//console.log('made it to middleware:')

function callApi(endpoint, id){
  console.log('got an id:', id);

  config.id = id;
  return fetch(BASE_URL + endpoint, config)
    .then(response => 
        response.text()
        .then(text => ({ text, response }))
      )
    .then(({ text, response }) => {
      console.log('text:', text, 'response:', response)
      if (!response.ok) {
        return Promise.reject(text);
      }
      return text
    }).catch(err => console.log('api error:',err));
}

export const CALL_API = Symbol('Call API');

// hook into any action without to use the reducer
export default store => next => action => {
  // if (action.type === UPDATE_LOCATION) {
  //   // console.log('page changed')
  // }
  // return next(action)

  const callAPI = action[CALL_API]
  
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  
  let { endpoint, types, id } = callAPI
  const [ requestType, successType, errorType ] = types
  
  return callApi(endpoint, types, id).then(
    response => next({
      response,
      type: successType
    }),
    error => next({
      error: error.message || 'There was an error.'

    })
  )

}
