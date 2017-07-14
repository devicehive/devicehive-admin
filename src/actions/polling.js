import { CALL_API } from '../middleware/api';
import { POLL_HISTORY_SIZE } from '../config';
import constants from '../constants';

const poll = {};

/**
 * Action creator for updating polling tab
 * Also starts new polling
 * 
 * @export
 * @param {String} tab 
 * @param {String} id 
 * @returns 
 */
export function updateTab(tab, id){
  return dispatch => {
    dispatch({
      type : constants.polling.UPDATE_TAB,
      payload : tab
    });
    tab === `command` ? dispatch(getDeviceCommandPollHistory(id)) : dispatch(getDeviceNotificationPollHistory(id));
    dispatch(pollData(tab, id));
  }
}

/**
 * Polling function
 * Related to multiple polling params
 * 
 * @export
 * @param {String} tab 
 * @param {String} id 
 * @returns 
 */
export function pollData(tab, id){
  return (dispatch, getState) => {
    if (tab === getState().polling.get(`tab`) && 
        id === getState().polling.get(`device`) && (poll[id] === undefined || (poll[id] !== undefined && (poll[id][tab] === undefined || poll[id][tab] === 0))) &&
        getState().polling.get(`to`) === ``){
      if (poll[id] && poll[id][tab]){
        poll[id][tab] += 1;
      } else if ( poll[id] && !poll[id][tab]) {
        poll[id][tab] = 1;
      } else {
        poll[id] = {
          [tab] : 1
        };
      }
      switch(tab){
      case `command`:
        return dispatch(getDeviceCommandPoll(getState().polling.get(`device`), getState().polling.get(`from`)))
          .then(() => {
            poll[id][tab] -= 1;
            return dispatch(pollData(tab, id));
          })
      case `notification`:
        return dispatch(getDeviceNotificationPoll(getState().polling.get(`device`), getState().polling.get(`from`)))
          .then(() => {
            poll[id][tab] -= 1;
            return dispatch(pollData(tab, id));
          })
      }
    }
  }
}

/**
 * Action creator for notification poll request
 * 
 * @export
 * @param {String} id 
 * @param {String} timestamp 
 * @returns 
 */
export function getDeviceNotificationPoll(id, timestamp){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_NOTIFICATION_POLL_REQUEST, constants.polling.GET_DEVICE_NOTIFICATION_POLL_SUCCESS, constants.polling.GET_DEVICE_NOTIFICATION_POLL_FAILURE],
        endpoint : `/device/${id}/notification/poll`,
        query : {
          timestamp
        },
        actionParams : {
          id
        }
      }
    });
}

/**
 * Action creator for command poll request
 * 
 * @export
 * @param {String} id 
 * @param {String} timestamp 
 * @returns 
 */
export function getDeviceCommandPoll(id, timestamp){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_COMMAND_POLL_REQUEST, constants.polling.GET_DEVICE_COMMAND_POLL_SUCCESS, constants.polling.GET_DEVICE_COMMAND_POLL_FAILURE],
        endpoint : `/device/${id}/command/poll`,
        query : {
          timestamp
        },
        actionParams : {
          id
        }
      }
    });
}

/**
 * Action creator for fetching command poll history
 * 
 * @export
 * @param {String} id 
 * @returns 
 */
export function getDeviceCommandPollHistory(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_REQUEST, constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_SUCCESS, constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_FAILURE],
        endpoint : `/device/${id}/command`,
        query : {
          take : POLL_HISTORY_SIZE
        },
        actionParams : {
          id
        }
      }
    })
}

/**
 * Action creator for fetching notification poll history
 * 
 * @export
 * @param {String} id 
 * @returns 
 */
export function getDeviceNotificationPollHistory(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_REQUEST, constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_SUCCESS, constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_FAILURE],
        endpoint : `/device/${id}/notification`,
        query : {
          take : POLL_HISTORY_SIZE
        },
        actionParams : {
          id
        }
      }
    })
}

/**
 * Action creator for setting current device polling id
 * 
 * @export
 * @param {String} id 
 * @returns 
 */
export function setDeviceId(id){
  return dispatch =>
    dispatch({
      type : constants.polling.SET_DEVICE,
      payload : id
    });
}

/**
 * Action creator for configuring polling time period
 * 
 * @export
 * @param {String} from 
 * @param {String} to 
 * @returns 
 */
export function setTimePeriod(from, to){
  return (dispatch, getState) => {
    dispatch({
      type : constants.polling.SET_TIME_PERIOD,
      payload : {
        from,
        to
      }
    });
    if (to !== ``){
      getState().polling.get(`tab`) === `command` ? 
        dispatch(getDeviceCommandPollPeriod(getState().polling.get(`device`), from, to))
      :
        dispatch(getDeviceNotificationPollPeriod(getState().polling.get(`device`), from, to));
    } else {
      dispatch(pollData(getState().polling.get(`tab`), getState().polling.get(`device`)));
    }
  }
}

/**
 * Action creator for fetching command poll by time period
 * 
 * @export
 * @param {String} id 
 * @param {String} from 
 * @param {String} to 
 * @returns 
 */
export function getDeviceCommandPollPeriod(id, from, to){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_REQUEST, constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_SUCCESS, constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_FAILURE],
        endpoint : `/device/${id}/command`,
        query : {
          start : from,
          end : to
        }
      }
    })
}

/**
 * Action creator for fetching notification poll by time period
 * 
 * @export
 * @param {String} id 
 * @param {String} from 
 * @param {String} to 
 * @returns 
 */
export function getDeviceNotificationPollPeriod(id, from, to){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_REQUEST, constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_SUCCESS, constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_FAILURE],
        endpoint : `/device/${id}/notification`,
        query : {
          start : from,
          end : to
        }
      }
    })
}

/**
 * Action creator for polling params removal
 * 
 * @export
 * @returns 
 */
export function clearPolling(){
  return dispatch =>
    dispatch({
      type : constants.polling.CLEAR_POLLING_INFO,
      payload : null
    })
}