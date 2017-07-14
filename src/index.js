import './index.css';
import { HashRouter, Route } from 'react-router-dom';
import Device from './components/pages/Device';
import Devices from './components/pages/Devices';
import JWT from './components/pages/JWT';
import Login from './components/pages/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Network from './components/pages/Network';
import Networks from './components/pages/Networks';
import Profile from './components/pages/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Provider } from 'react-redux';
import React from 'react';
import User from './components/pages/User';
import Users from './components/pages/Users';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';

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
        <Route path="/user/:id" render={
            props =>
            <ProtectedRoute {...props}>
              <User/>
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
        <Route path="/profile" render={
          props => 
          <ProtectedRoute {...props}>
            <Profile/>
          </ProtectedRoute>
        }
        />
      </div>
    </MuiThemeProvider>
  </HashRouter>
</Provider>, 
document.getElementById(`root`));
registerServiceWorker();
