import * as auth from './auth';
import * as devices from './devices';
import * as networks from './networks';
import * as polling from './polling';
import * as jwt from './jwt';
import * as users from './users';
import * as profile from './profile';

const actions = {
  auth,
  devices,
  networks,
  polling,
  jwt,
  users,
  profile
};

export default actions;