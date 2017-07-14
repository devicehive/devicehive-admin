import 'isomorphic-fetch';
import { API_URL } from '../config';
import URLSearchParams from 'url-search-params';

/**
 * URL with params creator
 * 
 * @export
 * @param {String} urlString 
 * @param {Object} [params={}] 
 * @returns 
 */
export function urlWithParams(urlString, params = {}){
  const url = new URL(urlString);
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    searchParams.append(key, encodeURI(params[key]));
  });
  url.search = searchParams.toString();
  return url.toString();
}

/**
 * Form data encoder
 * 
 * @export
 * @param {Object} formData 
 */
export function encodeFormData(formData){
  const searchParams = new URLSearchParams();
  Object.keys(formData).forEach(key => searchParams.set(key, formData[key]));
}

/**
 * API request creator
 * 
 * @export
 * @param {Object} { endpoint, query, body, headers = {}, method = `GET`, encoding = `json` } 
 * @returns 
 */
export function callApi({ endpoint, query, body, headers = {}, method = `GET`, encoding = `json` }){
  let fullURL = endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;
  if (query){
    fullURL = urlWithParams(fullURL, query);
  }
  const params = {
    method,
    headers
  };

  if (body){
    if (encoding === `json`){
      params.body = JSON.stringify(body);
      params.headers[`Accept`] = `application/json`;
      params.headers[`Content-Type`] = `application/json`;
    } else if (encoding === `form`){
      params.body = encodeFormData(body);
    }
  }

  return fetch(fullURL, params)
    .then(response => response.text().then(text => ({ json : text ? JSON.parse(text) : {}, response })))
    .then(({ json, response }) => {
      if (!response.ok){
        return Promise.reject(json);
      }
      return json;
    });
}

export const CALL_API = Symbol(`CALL_API`);

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === `undefined`){
    return next(action);
  }
  let { endpoint } = callAPI;
  const { types, query, method, headers, body, encoding, actionParams } = callAPI;

  if (typeof endpoint === `function`){
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== `string`){
    throw new Error(`Specify a string endpoint URL.`);
  }

  if (!Array.isArray(types) || types.length !== 3){
    throw new Error(`Expected an array of three action types.`);
  }

  if (!types.every(type => typeof type === `string`)){
    throw new Error(`Expected action types to be strings.`)
  }

  /**
   * Action extractor
   * 
   * @param {Object} data 
   * @returns 
   */
  function actionWith(data){
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type : requestType }));

  return callApi({ endpoint, query, method, headers, body, encoding })
    .then(response => next(actionWith({
      payload : response,
      type : successType,
      actionParams
    })),
    error => next(actionWith({
      type : failureType,
      error : error.message || `Something bad happend`
    })));
}