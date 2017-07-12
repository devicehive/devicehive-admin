import constants from '../constants';
import { List, Map } from 'immutable';
import moment from 'moment';

const initialState = Map({
  tab : `command`,
  device : ``,
  from : ``,
  to : ``,
  commandsPoll : List([]),
  notificationsPoll : List([])
});

export default function polling(state = initialState, action){
  switch(action.type){
  case constants.polling.UPDATE_TAB:
    return state
      .set(`tab`, action.payload)
      .set(`timestamp`, ``);
  case constants.polling.GET_DEVICE_COMMAND_POLL_REQUEST:
    return state;
  case constants.polling.GET_DEVICE_COMMAND_POLL_SUCCESS:
    if (action.actionParams.id === state.get(`device`) && state.get(`to`) === ``){
      const commandsTimestamp = moment.max(action.payload.map(item => moment(item.timestamp)));
      const newCommandsPoll = state
        .get(`commandsPoll`)
        .concat(List(action.payload));
      return state
        .set(`commandsPoll`, newCommandsPoll)
        .set(`from`, commandsTimestamp.format(`YYYY-MM-DD[T]HH:mm:ss.SSS`));
    } else {
      return state;
    }
  case constants.polling.GET_DEVICE_COMMAND_POLL_FAILURE:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_REQUEST:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_SUCCESS:
    if (action.actionParams.id === state.get(`device`) && state.get(`to`) === ``){
      const notificationsTimestamp = moment.max(action.payload.map(item => moment(item.timestamp)));
      const newNotificationsPoll = state
        .get(`notificationsPoll`)
        .concat(List(action.payload));
      return state
        .set(`notificationsPoll`, newNotificationsPoll)
        .set(`from`, notificationsTimestamp.format(`YYYY-MM-DD[T]HH:mm:ss.SSS`));
    } else {
      return state;
    }
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_FAILURE:
    return state;
  case constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_REQUEST:
    return state
      .set(`commandsPoll`, List([]))
      .set(`from`, ``)
      .set(`to`, ``);
  case constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_SUCCESS:
    if (action.actionParams.id === state.get(`device`)){
      const newCommandsPoll = state
        .get(`commandsPoll`)
        .concat(List(action.payload));
      return state
        .set(`commandsPoll`, newCommandsPoll);
    } else {
      return state;
    }
  case constants.polling.GET_DEVICE_COMMAND_POLL_HISTORY_FAILURE:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_REQUEST:
    return state
      .set(`notificationsPoll`, List([]))
      .set(`from`, ``)
      .set(`to`, ``);
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_SUCCESS:
    if (action.actionParams.id === state.get(`device`)){
      const newNotificationsPoll = state
        .get(`notificationsPoll`)
        .concat(List(action.payload));
      return state
        .set(`notificationsPoll`, newNotificationsPoll);
    } else {
      return state;
    }
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_HISTORY_FAILURE:
    return state;
  case constants.polling.SET_DEVICE:
    return state
      .set(`device`, action.payload);
  case constants.polling.SET_TIME_PERIOD:
    return state
      .set(`from`, action.payload.from)
      .set(`to`, action.payload.to);
  case constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_REQUEST:
    return state
      .set(`commandsPoll`, List([]));
  case constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_SUCCESS:
    return state
      .set(`commandsPoll`, List(action.payload));
  case constants.polling.GET_DEVICE_COMMAND_POLL_PERIOD_FAILURE:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_REQUEST:
    return state
      .set(`notificationsPoll`, List([]));
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_SUCCESS:
    return state
      .set(`notificationsPoll`, List(action.payload));
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_PERIOD_FAILURE:
    return state;
  case constants.devices.REFRESH_DEVICE_COMMAND_SUCCESS:
    const commandsPollCopy = state.get(`commandsPoll`);
    return state
      .set(`commandsPoll`,
      commandsPollCopy
        .set(
          commandsPollCopy.findIndex(function(item) {
            console.log(item);
            return item.id === action.payload.id;
          }),
          action.payload
        ));
  case constants.auth.LOGOUT:
    return state
      .set(`tab`, `command`)
      .set(`device`, ``)
      .set(`from`, ``)
      .set(`to`, ``)
      .set(`commandsPoll`, List([]))
      .set(`notificationsPoll`, List([]));
  case constants.polling.CLEAR_POLLING_INFO:
    return state
      .set(`tab`, `command`)
      .set(`device`, ``)
      .set(`from`, ``)
      .set(`to`, ``)
      .set(`commandsPoll`, List([]))
      .set(`notificationsPoll`, List([]));
  default:
    return state;
  }
}