import { CALL_API } from '../middleware/api';
import constants from '../constants';

export function getUsers(filter){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.users.GET_USERS_REQUEST, constants.users.GET_USERS_SUCCESS, constants.users.GET_USERS_FAILURE],
        endpoint : `/user`,
        query : filter
      }
    })
}

export function createUser(body){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.CREATE_USER_REQUEST, constants.users.CREATE_USER_SUCCESS, constants.users.CREATE_USER_FAILURE],
        endpoint : `/user`,
        method : `POST`,
        body
      }
    })
}

export function removeUser(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.REMOVE_USER_REQUEST, constants.users.REMOVE_USER_SUCCESS, constants.users.REMOVE_USER_FAILURE],
        endpoint : `/user/${id}`,
        method : `DELETE`
      }
    })
    .then(dispatch(getUsers()))
}

export function getUser(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.GET_USER_REQUEST, constants.users.GET_USER_SUCCESS, constants.users.GET_USER_FAILURE],
        endpoint : `/user/${id}`
      }
    })
}

export function saveUser(body){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.SAVE_USER_REQUEST, constants.users.SAVE_USER_SUCCESS, constants.users.SAVE_USER_FAILURE],
        endpoint : `/user/${body.id}`,
        method : `PUT`,
        body
      }
    })
}

export function assignNetwork(userId, networkId){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.ASSIGN_NETWORK_REQUEST, constants.users.ASSIGN_NETWORK_SUCCESS, constants.users.ASSIGN_NETWORK_FAILURE],
        endpoint : `/user/${userId}/network/${networkId}`,
        method : `PUT`
      }
    })
    .then(() => dispatch(getUser(userId)));
}

export function unassignNetwork(userId, networkId){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.users.UNASSIGN_NETWORK_REQUEST, constants.users.UNASSIGN_NETWORK_SUCCESS, constants.users.UNASSIGN_NETWORK_FAILURE],
        endpoint : `/user/${userId}/network/${networkId}`,
        method : `DELETE`
      }
    })
    .then(() => dispatch(getUser(userId)));
}