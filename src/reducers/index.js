import auth from './auth';
import { combineReducers } from 'redux';
import devices from './devices';
import jwt from './jwt';
import networks from './networks';
import polling from './polling';
import profile from './profile';
import users from './users';

export default combineReducers({
  auth,
  devices,
  networks,
  polling,
  jwt,
  users,
  profile
});