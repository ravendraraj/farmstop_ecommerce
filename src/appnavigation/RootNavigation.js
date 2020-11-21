// RootNavigation.js
import * as React from 'react';
import {getUserDataFromStorage} from '../services/async-storage'

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
