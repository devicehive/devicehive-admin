import * as auth from './auth';
import * as devices from './devices';
import * as networks from './networks';
import * as polling from './polling';
import * as jwt from './jwt';

const actions = {
  auth,
  devices,
  networks,
  polling,
  jwt
};

export default actions;