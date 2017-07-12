import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Login from './components/pages/Login';
import Users from './components/pages/Users';
import Networks from './components/pages/Networks';
import Network from './components/pages/Network';
import Devices from './components/pages/Devices';
import Device from './components/pages/Device';
import JWT from './components/pages/JWT';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

render(
<Provider store={store}>
  <HashRouter>
    <MuiThemeProvider>
      <div>
        <Route exact path="/" component={Login}/>
        <Route path="/users" render={
          props => 
          <ProtectedRoute {...props}>
            <Users/>
          </ProtectedRoute>
        }/>
        <Route path="/networks" render={
          props => 
          <ProtectedRoute {...props}>
            <Networks/>
          </ProtectedRoute>
        }/>
        <Route path="/network/:id" render={
          props =>
            <ProtectedRoute {...props}>
              <Network/>
            </ProtectedRoute>
        }/>
        <Route path="/devices" render={
          props => 
          <ProtectedRoute {...props}>
            <Devices/>
          </ProtectedRoute>
        }/>
        <Route path="/device/:id" render={
          props => 
          <ProtectedRoute {...props}>
            <Device/>
          </ProtectedRoute>
        }
        />
        <Route path="/jwt" render={
          props => 
          <ProtectedRoute {...props}>
            <JWT/>
          </ProtectedRoute>
        }/>
      </div>
    </MuiThemeProvider>
  </HashRouter>
</Provider>, 
document.getElementById(`root`));
registerServiceWorker();
