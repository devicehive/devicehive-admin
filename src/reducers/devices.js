import { List, Map } from 'immutable';
import constants from '../constants';

const initialState = Map({
  devicesList : List([])
});

/**
 * Devices reducer
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {any} action 
 * @returns 
 */
export default function devices(state = initialState, action){
  switch (action.type){
  case constants.devices.GET_DEVICES_REQUEST:
    return state
      .set(`devicesList`, List([]));
  case constants.devices.GET_DEVICES_SUCCESS:
    return state
      .set(`devicesList`, List(action.payload));
  case constants.devices.GET_DEVICES_FAILURE:
    return state;
  case constants.devices.REMOVE_DEVICE_REQUEST:
    return state;
  case constants.devices.REMOVE_DEVICE_SUCCESS:
    return state;
  case constants.devices.REMOVE_DEVICE_FAILURE:
    return state;
  case constants.auth.LOGOUT:
    return state
      .set(`devicesList`, List([]))
  default:
    return state;
  }
}