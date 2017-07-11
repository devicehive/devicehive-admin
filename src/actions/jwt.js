import { CALL_API } from '../middleware/api';
import constants from '../constants';
import jwtDecode from 'jwt-decode';

export function createToken(token, expiration = ``){
  const userData = jwtDecode(token).payload;
  userData.expiration = expiration;
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.jwt.CREATE_TOKEN_REQUEST, constants.jwt.CREATE_TOKEN_SUCCESS, constants.jwt.CREATE_TOKEN_FAILURE],
        endpoint : `/token/create`,
        method : `POST`,
        body : userData
      }
    })
}