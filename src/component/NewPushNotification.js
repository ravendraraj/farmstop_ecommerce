import React, { useEffect, useState } from 'react';
import { 
    View, 
    Dimensions,
    StyleSheet,
    StatusBar,
    FlatList,
    SafeAreaView,
    Alert,
    Text
} from 'react-native'; 
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import {getNotification} from '../lib/api'
import { navigate,check_notification } from '../appnavigation/RootNavigation'
import PushNotificationIOS from "@react-native-community/push-notification-ios"
var PushNotification = require("react-native-push-notification")



const NewPushNotification = (props) => {
  
  useEffect(() => {
    console.log("Calll new");
    openUpcomingNotifications();
},[]);


const openUpcomingNotifications=async()=>{
  console.log("Calll new1");
    if(props.data.token =="" || props.data.token ==null){
      try {
      
          let authData = await AsyncStorage.getItem(params);
          if(authData != null){
            let objAuthData = JSON.parse(authData);
            // props.loginedIn({email:objAuthData.email, mobile:objAuthData.mobile ,userId:objAuthData.userId ,profile:objAuthData.profile,login_type:objAuthData.Login_Type,authName:objAuthData.name,token:objAuthData.token})
            props.dispatch({type:'AUTHORIZED-USER', email:objAuthData.email ,mobile:objAuthData.mobile ,userID:objAuthData.userId,profile:objAuthData.profile,login_type:objAuthData.Login_Type,authName:objAuthData.name,token:objAuthData.token});
            props.dispatch(getNotification());
            check_notification();
          }else{
            console.log("not login");
            navigate('NotLogin');
          }
      
      }catch(e) {
              console.log(e);
      }
    }else{
      props.dispatch(getNotification());
      check_notification();
    }
}
console.log("Calll new2");
        return null;
}


function mapDispatchToProps(dispatch) {
  return({
      dispatch
  })
}

function mapStateToProps(state) {
  let {data} = state;
    return {
      data
  };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(NewPushNotification);