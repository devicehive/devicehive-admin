import { CALL_API } from '../middleware/api';
import constants from '../constants';

/**
 * Action creator for devices fetch
 * 
 * @export
 * @param {Object} filter 
 * @returns 
 */
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

/**
 * Action creator for device removal
 * 
 * @export
 * @param {String} id 
 * @returns 
 */
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

/**
 * Action creator for device update
 * 
 * @export
 * @param {Object} body 
 * @returns 
 */
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

/**
 * Action creator for sending device command
 * 
 * @export
 * @param {String} deviceId 
 * @param {Object} body 
 * @returns 
 */
export function sendCommand(deviceId, body){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.devices.SEND_DEVICE_COMMAND_REQUEST, constants.devices.SEND_DEVICE_COMMAND_SUCCESS, constants.devices.SEND_DEVICE_COMMAND_FAILURE],
        endpoint : `/device/${deviceId}/command`,
        method : `POST`,
        body
      }
    });
}

/**
 * Action creator for sending device notification
 * 
 * @export
 * @param {String} deviceId 
 * @param {Object} body 
 * @returns 
 */
export function sendNotification(deviceId, body){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.devices.SEND_DEVICE_NOTIFICATION_REQUEST, constants.devices.SEND_DEVICE_NOTIFICATION_SUCCESS, constants.devices.SEND_DEVICE_NOTIFICATION_FAILURE],
        endpoint : `/device/${deviceId}/notification`,
        method : `POST`,
        body
      }
    })
}

/**
 * Action creator for refreshing device command
 * 
 * @export
 * @param {String} deviceId 
 * @param {String} commandId 
 * @returns 
 */
export function refreshCommand(deviceId, commandId){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.devices.REFRESH_DEVICE_COMMAND_REQUEST, constants.devices.REFRESH_DEVICE_COMMAND_SUCCESS, constants.devices.REFRESH_DEVICE_COMMAND_FAILURE],
        endpoint : `/device/${deviceId}/command/${commandId}`,
        method : `GET`
      }
    })
}