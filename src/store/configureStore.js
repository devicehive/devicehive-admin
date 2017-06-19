import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';
import createAPI from '../middleware/api';
import jwt from '../middleware/jwt';

export default function configureStore(initialState){
  return createStore(
    reducers,
    initialState,
    applyMiddleware(ReduxThunk, jwt, createAPI)
  );
}