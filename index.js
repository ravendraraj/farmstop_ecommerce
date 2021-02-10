import React from 'react';
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux';
import store from './src/store'

//import { createStore, applyMiddleware, compose} from 'redux';
//import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
//import AppReducer from './src/reducers';

import {name as appName} from './app.json';
import MainApp from './App'

// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

// let store = createStore(AppReducer, compose(
//     applyMiddleware(
//       thunkMiddleware, // lets us dispatch() functions
//       loggerMiddleware,
//     ),
// ));

const App = () =>(
    <Provider store={store}>
        <MainApp/>
    </Provider>
);

//console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent(appName, () => App);
export default App;
