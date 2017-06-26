import { CALL_API } from '../middleware/api';
import constants from '../constants';

export function getDevices(filter){
  return dispatch => {
    dispatch({
      [CALL_API] : {
        types : [constants.devices.GET_DEVICES_REQUEST, constants.devices.GET_DEVICES_SUCCESS, constants.devices.GET_DEVICES_FAILURE],
        endpoint : `/device`,
        query : filter
      }
    })
  }
}

export function removeDevice(id){
  return dispatch => {
    dispatch({
      [CALL_API] : {
        types : [constants.devices.REMOVE_DEVICE_REQUEST, constants.devices.REMOVE_DEVICE_SUCCESS, constants.devices.REMOVE_DEVICE_FAILURE],
        endpoint : `/device/${id}`,
        method : `DELETE`
      }
    })
    .then(() => dispatch(getDevices()));
  }
}

export function saveDevice(body){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.devices.SAVE_DEVICE_REQUEST, constants.devices.SAVE_DEVICE_SUCCESS, constants.devices.SAVE_DEVICE_FAILURE],
        endpoint : `/device/${body.id}`,
        method : `PUT`,
        body
      }
    });
  
}