import { UPDATE_LOCATION } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
// const BASE_URL = 'http://' + window.location.href.split('/')[2] + '/';
const BASE_URL = 'http://localhost:3000/';


function callApi(endpoint, id, req, body) {
    let config = { credentials: 'include' };
    // console.log('got an id:', id);
    //config.header = { Accept: 'application/json'};
    if (req === 'POST' || req === 'PUT') {
        console.log('making POST or PUT req');
        config.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        config.method = req;
        config.body = body;
    } else if (req === 'DELETE') {
        console.log('we are deleting', req)
        config.method = req

    } else {
        config.id = id;
    }

    return fetch(BASE_URL + endpoint, config)
        .then(response =>
            response.text()
            .then(text => ({ text, response }))
        )
        .then(({ text, response }) => {
            console.log('text:', text, 'response:', response)

            if (!response.ok) {

                return Promise.reject(text)
            } else {
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

    const callAPI = action[CALL_API]
        //console.log('here is our callAPI', callAPI)
        // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, id, req, body, types } = callAPI
    const [requestType, successType, errorType] = types

    return callApi(endpoint, id, req, body, types).then(
        response => next({
            response,
            type: successType,
            id: id

        }),
        error => next({
            type: errorType
        })
    )

}
