import { CALL_API } from '../middleware/api';
import constants from '../constants';

/**
 * Action creator for user login
 * 
 * @export
 * @param {String} login 
 * @param {String} password 
 * @returns 
 */
export function loginUser(login, password){
  return dispatch => {
    dispatch({
      [CALL_API] : {
        types : [constants.auth.LOGIN_REQUEST, constants.auth.LOGIN_SUCCESS, constants.auth.LOGIN_FAILURE],
        endpoint : `/token`,
        method : `POST`,
        body : {
          login,
          password
        }
      }
    });
  }
}

/**
 * Action creator for logging user out
 * 
 * @export
 * @returns 
 */
export function logoutUser(){
  return dispatch => 
    dispatch({
      type : constants.auth.LOGOUT
    });
}