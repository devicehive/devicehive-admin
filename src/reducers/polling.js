import constants from '../constants';
import { List, Map } from 'immutable';

const initialState = Map({
  tab : `command`,
  commandsPoll : List([]),
  notificationsPoll : List([])
});

export default function polling(state = initialState, action){
  switch(action.type){
  case constants.polling.UPDATE_TAB:
    return state
      .set(`tab`, action.payload);
  case constants.polling.GET_DEVICE_COMMAND_POLL_REQUEST:
    return state;
  case constants.polling.GET_DEVICE_COMMAND_POLL_SUCCESS:
    return state
      .set(`commandsPoll`, List(action.payload));
  case constants.polling.GET_DEVICE_COMMAND_POLL_FAILURE:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_REQUEST:
    return state;
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_SUCCESS:
    return state
      .set(`notificationsPoll`, List(action.payload));
  case constants.polling.GET_DEVICE_NOTIFICATION_POLL_FAILURE:
    return state;
  default:
    return state;
  }
}