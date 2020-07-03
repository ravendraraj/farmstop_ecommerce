/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './src/appnavigation/Navigation'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './src/reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

let store = createStore(AppReducer, compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
));

const App = () => (
    <Provider store={store}>
        <Navigation/>
    </Provider>
);

//console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('farmstop', () => App);
export default App;
