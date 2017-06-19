import { CALL_API } from '../middleware/api';
import constants from '../constants';

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

export function logoutUser(){
  return dispatch => 
    dispatch({
      type : constants.auth.LOGOUT
    });
}