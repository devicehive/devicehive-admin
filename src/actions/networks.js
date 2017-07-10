import { CALL_API } from '../middleware/api';
import constants from '../constants';

export function getNetworks(filter){
  return dispatch => {
    dispatch({
      [CALL_API] : {
        types : [constants.networks.GET_NETWORKS_REQUEST, constants.networks.GET_NETWORKS_SUCCESS, constants.networks.GET_NETWORKS_FAILURE],
        endpoint : `/network`,
        query : filter
      }
    })
  }
}

export function createNetwork(body){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.networks.CREATE_NETWORK_REQUEST, constants.networks.CREATE_NETWORK_SUCCESS, constants.networks.CREATE_NETWORK_FAILURE],
        endpoint : `/network`,
        method : `POST`,
        body
      }
    })
    .then(() => dispatch(getNetworks()));
}

export function updateNetwork(body){
  return dispatch => 
    dispatch({
      [CALL_API] : {
        types : [constants.networks.UPDATE_NETWORK_REQUEST, constants.networks.UPDATE_NETWORK_SUCCESS, constants.networks.UPDATE_NETWORK_FAILURE],
        endpoint : `/network/${body.id}`,
        method : `PUT`,
        body
      }
    })
    .then(() => dispatch(getNetworks()));
}

export function removeNetwork(id){
  return dispatch =>
    dispatch({
      [CALL_API] : {
        types : [constants.networks.REMOVE_NETWORK_REQUEST, constants.networks.REMOVE_NETWORK_SUCCESS, constants.networks.REMOVE_NETWORK_FAILURE],
        endpoint : `/network/${id}`,
        method : `DELETE`
      }
    })
    .then(() => dispatch(getNetworks()));
}