import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

//import rootReducer from '../reducers';
import AppReducer from '../reducers'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
const initialState = {};
const middlewareData = [thunk, loggerMiddleware];

const store = createStore(
  AppReducer,
  initialState,
  compose(
    applyMiddleware(...middlewareData)
  )
);

export default store;   