import constants from '../constants';
import jwtDecode from 'jwt-decode';
import { Map } from 'immutable';

const initialState = Map({
  access : Map({
    token : ``,
    expiration : ``
  }),
  refresh : Map({
    token : ``,
    expiration : ``
  })
});

export default function jwt(state = initialState, action){
  switch(action.type){
  case constants.jwt.CREATE_TOKEN_REQUEST:
    return state
      .setIn([`access`, `token`], ``)
      .setIn([`access`, `expiration`], ``)
      .setIn([`refresh`, `token`], ``)
      .setIn([`refresh`, `expiration`], ``);
  case constants.jwt.CREATE_TOKEN_SUCCESS:
    const expirationAccess = jwtDecode(action.payload.accessToken).payload.expiration;
    const expirationRefresh = jwtDecode(action.payload.refreshToken).payload.expiration;
    return state
      .setIn([`access`, `token`], action.payload.accessToken)
      .setIn([`access`, `expiration`], expirationAccess)
      .setIn([`refresh`, `token`], action.payload.refreshToken)
      .setIn([`refresh`, `expiration`], expirationRefresh);
  case constants.jwt.CREATE_TOKEN_FAILURE:
    return state;
  case constants.auth.LOGOUT:
    return state
      .setIn([`access`, `token`], ``)
      .setIn([`access`, `expiration`], ``)
      .setIn([`refresh`, `token`], ``)
      .setIn([`refresh`, `expiration`], ``);
  default:
    return state;
  }
}