import jwtDecode from 'jwt-decode';
import 'isomorphic-fetch';
import { CALL_API } from './api';
import { API_URL } from '../config';
import moment from 'moment';
import constants from '../constants'

export function refreshToken(store){
  store.dispatch({ 
    type : constants.auth.REFRESH_REQUEST
  });
  const refreshPromise = 
    fetch(`${API_URL}/token/refresh`, {
      method : `POST`,
      headers : {
        'Content-Type' : `application/json`,
        'Accept' : `application/json`
      },
      body : JSON.stringify({
        refreshToken : store.getState().auth.getIn([`tokens`, `refreshToken`])
      })
    })
    .then(response => response.text().then(text => ({ json : text ? JSON.parse(text) : {}, response })))
    .then(({ json, response }) => {
      if (!response.ok){
        return Promise.reject(json);
      }
      return json;
    })
    .then(response => {
      store.dispatch({
        type : constants.auth.REFRESH_SUCCESS, 
        payload : response
      });
      return response.accessToken;
    },
    error => {
      console.error(error);
      store.dispatch({
        type : constants.auth.REFRESH_FAILURE
      });
    })
    .catch(console.error);

  store.dispatch({
    type : constants.auth.REFRESH_PROMISE,
    payload : refreshPromise
  });
  
  return refreshPromise;
}

export function runAuthorizedAction(action, next, token){
  const callAPI = action[CALL_API];
  if (typeof callAPI === `undefined`){
    return next(action);
  }
  const authorizedAction = Object.assign({}, action);
  authorizedAction[CALL_API].headers = {
    'Authorization' : `Bearer ${token}`
  };
  return next(authorizedAction);
}

export default store => next => action => {
  if (action[CALL_API]){
    const [request, success, failure] = action[CALL_API].types;
    if (request.indexOf(`LOGIN`) === -1 && success.indexOf(`LOGIN`) === -1 && failure.indexOf(`LOGIN`) === -1){
      if (store.getState().auth.getIn([`tokens`, `jwtToken`])){
        const expirationTime = jwtDecode(store.getState().auth.getIn([`tokens`, `jwtToken`])).payload.expiration;
        if (expirationTime && moment(expirationTime) - moment() < 600000 && moment(expirationTime) - moment() > 0){
          if (!store.getState().auth.get(`refreshPromise`)) {
            return refreshToken(store).then(runAuthorizedAction.bind(this, action, next));
          } else {
            return store.getState().auth.get(`refreshPromise`).then(runAuthorizedAction.bind(this, action, next));
          }
        } else if (expirationTime && moment(expirationTime) - moment() >= 600000) {
          return runAuthorizedAction(action, next, store.getState().auth.getIn([`tokens`, `jwtToken`]));
        } else {
          return store.dispatch({
            type : constants.auth.AUTH_ERROR, 
            payload : `Your token has expired.`
          });
        }
      }
    }
  }
  return next(action);
}