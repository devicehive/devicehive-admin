import { Map } from 'immutable';
import constants from '../constants';

const initialState = Map({
  user : Map({})
});

/**
 * Profile reducer
 * 
 * @export
 * @param {Object} [state=initialState] 
 * @param {Object} action 
 * @returns 
 */
export default function profile(state = initialState, action){
  switch (action.type){
  case constants.profile.GET_PROFILE_REQUEST:
    return state
      .set(`user`, Map({}));
  case constants.profile.GET_PROFILE_SUCCESS:
    return state
      .set(`user`, Map(action.payload));
  case constants.profile.GET_PROFILE_FAILURE:
    return state;
  case constants.auth.LOGOUT:
    return state
      .set(`user`, Map({}));
  default:
    return state;
  }
}