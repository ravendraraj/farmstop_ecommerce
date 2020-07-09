import { combineReducers } from 'redux';
import data from './data';
import indicator from './indicator';
import error from './error';

const AppReducer = combineReducers({
  data,
  indicator,
  error,
});

export default AppReducer;