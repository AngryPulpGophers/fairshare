import { UPDATE_LOCATION } from 'react-router-redux';
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://' + window.location.href.split('/')[2] + '/';

function callApi(endpoint, id, req, body){
  let config = {credentials : 'include' };
  // console.log('got an id:', id);
  //config.header = { Accept: 'application/json'};
  // console.log(arguments);
  if(req === 'POST' || req === 'PUT'){
    console.log('making POST or PUT req:', body );
    config.headers= {
      "Content-Type":"application/json",
      "Accept":"application/json"
    }
    config.method = req;
    config.body = body;
  } else if(req === 'DELETE'){
    console.log('we are deleting', req)
    config.method = req
    //console.log('method',config.method,'method',config.body,'body')

  } else {
    // console.log('making GET req')

    config.id = id;
    console.log('here is our config',config)
  }

  return fetch( BASE_URL + endpoint, config)
    .then(response =>
        response.text()
        .then(text => ({ text, response }))
      )
    .then(({ text, response }) => {
      // console.log('text:', text, 'response:', response)
      // console.log('response.ok in middleware:', response.ok)
      if (!response.ok) {
        // throw new Error (text);
        return Promise.reject(text)
      }else{
        return text;
      }
    })
}

export const CALL_API = Symbol('Call API');

// hook into any action without to use the reducer
export default store => next => action => {
  // if (action.type === UPDATE_LOCATION) {
  //   // console.log('page changed')
  // }
  // return next(action)
  console.log('got into middleware');
  const callAPI = action[CALL_API]
  //console.log('here is our callAPI', callAPI)
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, id, req, body, types } = callAPI
  let dbEntry = callAPI.cookie ? callAPI.cookie : null;
  const [ requestType, successType, errorType ] = types

  return callApi(endpoint, id, req, body, types).then(
    response => {
      if(!dbEntry){
        next({
          response,
          type: successType,
          id: id
        })
      }else{
        next({
          response,
          type:successType,
          id:id,
          cookie: dbEntry
        })
      }
    },
    error => next({
      type: errorType
    })
  )

}
