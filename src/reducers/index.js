import { combineReducers } from 'redux';
import data from './data';
import indicator from './indicator';
import error from './error';
import notification from './notificationReducer';

const AppReducer = combineReducers({
	data,
	indicator,
	error,
	notification
});

export default AppReducer;