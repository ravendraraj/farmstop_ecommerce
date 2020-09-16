// RootNavigation.js
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigateWithParams(name, params){
    navigationRef.current && navigationRef.current.navigate(name, params);
}

export function navigate(name){
	// console.log(navigate,name);
    navigationRef.current && navigationRef.current.navigate(name);
}

export function check_notification(){
	 navigationRef.current && navigationRef.current.navigate('NotLogin', {
  		screen: 'MainHome',
  		params: {
    		screen: 'Notification',
  		},
	});
}
