// RootNavigation.js
import * as React from 'react';
import {getUserDataFromStorage,getNewNotifiCounterToStorage,setNewNotifiCounterToStorage} from '../services/async-storage'
import constants from "../constants"
import store from '../store'
import {getNotification} from '../lib/notification'

export const navigationRef = React.createRef();

export function navigateWithParams(name, params){
    navigationRef.current && navigationRef.current.navigate(name, params);
}

export function navigate(name){
	// console.log(navigate,name);
    navigationRef.current && navigationRef.current.navigate(name);
}

// export const check_notification =()=>(dispatch,getState) =>{
// 	console.log("check notification   =>>>>>>> I am call only");
// }

export function check_notification(){
	getUserDataFromStorage().then(value=>{
        if(value != null){
			let routeName =  navigationRef.current.getCurrentRoute().name;
            //console.log(value.token +"!='' &&"+ value.userId +"!=''",navigationRef.current);
            if(value.token !='' && value.userId !=''){
                if(routeName != "SplashScreen" && routeName !="AppIntroScreen" && routeName !="SocialLoginScreen"){
                	//navigate on notification screen
                	navigationRef.current && navigationRef.current.navigate("Notification");
                }
            }

        }else{
            //nothing happen here
        }
    });
}

export const loadNewNotification=()=>{
    getNewNotifiCounterToStorage().then(value=>{
        if(value != null){
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:value});
        }else{
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:0});
        }
    });
}

export const setNewNotification=()=>{
    getNewNotifiCounterToStorage().then(value=>{ 
        if(value != null){
            let totalNewNotification = parseInt(value)+1;
            setNewNotifiCounterToStorage(totalNewNotification);
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:totalNewNotification});
        }else{
            setNewNotifiCounterToStorage(1);
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:1});
        }
    });
}

export const resetNewNotification=()=>{
    getNewNotifiCounterToStorage().then(value=>{ 
        if(value != null){
            let totalNewNotification = parseInt(value);
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:totalNewNotification});
        }else{
            store.dispatch({type:'SET_NEW_NOTIFICATION_COUNTER',totalNotification:0});
        }
    });
}
