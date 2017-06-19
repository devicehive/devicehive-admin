import auth from './auth';
import devices from './devices';
import networks from './networks';
import polling from './polling';

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  devices,
  networks,
  polling
});