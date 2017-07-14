import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import createAPI from '../middleware/api';
import jwt from '../middleware/jwt';
import reducers from '../reducers';

/**
 * Redux store creator
 * 
 * @export
 * @param {Object} initialState 
 * @returns 
 */
export default function configureStore(initialState){
  return createStore(
    reducers,
    initialState,
    applyMiddleware(ReduxThunk, jwt, createAPI)
  );
}