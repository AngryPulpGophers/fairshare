import { UPDATE_LOCATION } from 'react-router-redux'
const BASE_URL = 'http://localhost:3000/'

let config = {};
console.log('made it to middleware:')

function callApi(endpoint, id){
  console.log('got an id:', id)

  config.id = id;
  return fetch(BASE_URL + endpoint, config)
    .then(response => 
        response.text()
        .then(text => ({ text, response }))
      )
    .then(({ text, response }) => {
      console.log('text:', text, 'response:', response)
      if (!response.ok) {
        return Promise.reject(text)
      }
      return text
    }).catch(err => console.log('api error:',err))
}

export const CALL_API = Symbol('Call API')

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
  
  let { endpoint, id } = callAPI
  
  // const [ requestType, successType, errorType ] = types
  
  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, id).then(
    response => next({
      response
    }),
    error => next({
      error: error.message || 'There was an error.'

    })
  )

}



// function callApi(endpoint, authenticated) {
  
//   let token = localStorage.getItem('id_token') || null
//   let config = {}
  
//   if(authenticated) {
//     if(token) {
//       config = {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }
//     } else {
//       throw "No token saved!"
//     }
//   }
  
//   return fetch(BASE_URL + endpoint, config)
//     .then(response =>
//       response.text()
//       .then(text => ({ text, response }))
//     ).then(({ text, response }) => {
//       if (!response.ok) {
//         return Promise.reject(text)
//       }
      
//       return text
//     }).catch(err => console.log(err))
// }

//export const CALL_API = Symbol('Call API')

// export default store => next => action => {
  
//   const callAPI = action[CALL_API]
  
//   // So the middleware doesn't get applied to every single action
//   if (typeof callAPI === 'undefined') {
//     return next(action)
//   }
  
//   let { endpoint, types, authenticated } = callAPI
  
//   const [ requestType, successType, errorType ] = types
  
//   // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
//   return callApi(endpoint, authenticated).then(
//     response =>
//       next({
//         response,
//         authenticated,
//         type: successType
//       }),
//     error => next({
//       error: error.message || 'There was an error.',
//       type: errorType
//     })
//   )
// }