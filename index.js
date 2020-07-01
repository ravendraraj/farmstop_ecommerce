/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './src/lib/navigator';
import DrawerScreen from './src/lib/navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './src/reducers';
import { navigationRef } from './src/lib/RootNavigation';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

let store = createStore(AppReducer, compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
));

const App = () => (
    <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
            <StackScreen/>
            {/* <DrawerScreen/> */} {/** Not implemen*/}
        </NavigationContainer>
    </Provider>
);

//console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('farmstop', () => App);
export default App;
