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