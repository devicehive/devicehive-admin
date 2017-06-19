import constants from '../constants';
import { List, Map } from 'immutable';

const initialState = Map({
  networksList : List([]),
  network : Map({})
});

export default function networks(state = initialState, action){
  switch(action.type){
  case constants.networks.GET_NETWORKS_REQUEST:
    return state
      .set(`networksList`, List([]));
  case constants.networks.GET_NETWORKS_SUCCESS:
    return state
      .set(`networksList`, List(action.payload));
  case constants.networks.GET_NETWORKS_FAILURE:
    return state;
  default:
    return state;
  }
}