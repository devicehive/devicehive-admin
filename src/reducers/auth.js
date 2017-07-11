import constants from '../constants';
import jwtDecode from 'jwt-decode';
import { Map } from 'immutable';

const initialState = Map({
  refreshPromise : null,
  isRefreshing : false,
  isAuthenticated : false,
  role : null,
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
      .set(`role`, null)
      .setIn([`tokens`, `jwtToken`], ``)
      .setIn([`tokens`, `refreshToken`], ``);
  case constants.auth.LOGIN_SUCCESS:
    const decodedTokenActions = jwtDecode(action.payload.accessToken).payload.actions;
    const admin = decodedTokenActions.includes(`*`);
    return state
      .set(`isAuthenticated`, true)
      .set(`role`, admin ? `admin` : `user`)
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
      .set(`isAuthenticated`, false)
      .set(`isRefreshing`, false)
      .set(`refreshPromise`, null)
      .set(`role`, null)
      .setIn([`tokens`, `jwtToken`], ``)
      .setIn([`tokens`, `refreshToken`], ``);
  default:
    return state;
  }
}