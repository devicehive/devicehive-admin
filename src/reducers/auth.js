import constants from '../constants';
import { Map } from 'immutable';

const initialState = Map({
  refreshPromise : null,
  isRefreshing : false,
  isAuthenticated : false,
  tokens : Map({
    jwtToken : ``,
    refreshToken : ``
  })
});

export default function auth(state = initialState, action){
  switch(action.type){
  case constants.auth.LOGIN_REQUEST:
    return state
      .set(`isRefreshing`, false)
      .set(`isAuthenticated`, false)
      .set(`refreshPromise`, null)
      .setIn([`tokens`, `jwtToken`], ``)
      .setIn([`tokens`, `refreshToken`], ``);
  case constants.auth.LOGIN_SUCCESS:
    return state
      .set(`isAuthenticated`, true)
      .setIn([`tokens`, `jwtToken`], action.payload.accessToken)
      .setIn([`tokens`, `refreshToken`], action.payload.refreshToken);
  case constants.auth.LOGIN_FAILURE:
    return state
      .set(`isRefreshing`, false)
      .set(`isAuthenticated`, false)
      .set(`refreshPromise`, null)
      .setIn([`tokens`, `jwtToken`], ``)
      .setIn([`tokens`, `refreshToken`], ``);
  case constants.auth.REFRESH_REQUEST:
    return state
      .set(`isRefreshing`, true);
  case constants.auth.REFRESH_SUCCESS:
    return state
      .set(`isRefreshing`, false)
      .set(`isAuthenticated`, true)
      .set(`refreshPromise`, null)
      .setIn([`tokens`, `jwtToken`], action.payload.accessToken);
  case constants.auth.REFRESH_FAILURE:
    return state
      .set(`isRefreshing`, false)
      .set(`isAuthenticated`, false)
      .set(`refreshPromise`, null);
  case constants.auth.REFRESH_PROMISE:
    return state
      .set(`refreshPromise`, action.payload);
  case constants.auth.AUTH_ERROR:
    return state
      .set(`isAuthenticated`, false);
  case constants.auth.LOGOUT:
    return state
      .set(`isAuthenticated`, false);
  default:
    return state;
  }
}