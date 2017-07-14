import { List, Map } from 'immutable';
import constants from '../constants';

const initialState = Map({
  usersList : List([]),
  user : Map({})
});

/**
 * users reducer
 * 
 * @export
 * @param {Object} [state=initialState] 
 * @param {Object} action 
 * @returns 
 */
export default function users(state = initialState, action){
  switch (action.type){
  case constants.users.GET_USERS_REQUEST:
    return state
      .set(`usersList`, List([]));
  case constants.users.GET_USERS_SUCCESS:
    return state
      .set(`usersList`, List(action.payload));
  case constants.users.GET_USERS_FAILURE:
    return state;
  case constants.users.GET_USER_REQUEST:
    return state
      .set(`user`, Map({}));
  case constants.users.GET_USER_SUCCESS:
    return state
      .set(`user`, Map(action.payload));
  case constants.users.GET_USER_FAILURE:
    return state;
  case constants.auth.LOGOUT:
    return state
      .set(`usersList`, List([]));
  default:
    return state;
  }
}