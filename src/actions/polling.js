import constants from '../constants';
import { CALL_API } from '../middleware/api';
const poll = {
  notification : 0,
  command : 0
};

export function updateTab(tab){
  return dispatch => {
    dispatch({
      type : constants.polling.UPDATE_TAB,
      payload : tab
    });
    dispatch(pollData(tab));
  }
}

export function pollData(tab){
  return (dispatch, getState) => {
    if (tab === getState().polling.get(`tab`) && poll[tab] === 0){
      poll[tab] += 1;
      switch(tab){
      case `command`:
        return dispatch(getDeviceCommandPoll(getState().devices.get(`device`)))
          .then(() => {
            poll[tab] -= 1;
            return dispatch(pollData(tab));
          })
      case `notification`:
        return dispatch(getDeviceNotificationPoll(getState().devices.get(`device`)))
          .then(() => {
            poll[tab] -= 1;
            return dispatch(pollData(tab));
          })
      }
    }
  }
}

export function getDeviceNotificationPoll(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_NOTIFICATION_POLL_REQUEST, constants.polling.GET_DEVICE_NOTIFICATION_POLL_SUCCESS, constants.polling.GET_DEVICE_NOTIFICATION_POLL_FAILURE],
        endpoint : `/device/${id}/notification/poll`
      }
    });
}

export function getDeviceCommandPoll(id){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_COMMAND_POLL_REQUEST, constants.polling.GET_DEVICE_COMMAND_POLL_SUCCESS, constants.polling.GET_DEVICE_COMMAND_POLL_FAILURE],
        endpoint : `/device/${id}/command/poll`
      }
    });
}