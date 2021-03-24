import React from 'react';
import {
  NavigationContainer, 
} from '@react-navigation/native';

import {connect} from "react-redux";


import { navigationRef } from './src/appnavigation/RootNavigation'
// import MainTabScreen from './src/navigations/MainTabScreen';
//import {setDeviceTokenToStorage} from './src/services/async-storage'

import AuthScreenStack from './src/appnavigation/AuthScreenStack';
import SplashScreenStack from './src/appnavigation/SplashScreenStack';
import IntroStackScreen from './src/appnavigation/IntroStackScreen';
import DrawerScreen from './src/appnavigation/DrawerScreen';
import { navigate,check_notification,loadNewNotification,setNewNotification} from './src/appnavigation/RootNavigation';
import {switchRootScreen} from './src/lib/api';
import PushNotificationIOS from "@react-native-community/push-notification-ios"
var PushNotification = require("react-native-push-notification");
import AsyncStorage from '@react-native-community/async-storage'

interface Props {
  navigation: any;
}

var deviceData = "";
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (deviceTokenData) {
    //console.log("TOKEN:", deviceTokenData);
    AsyncStorage.setItem('DEVICE_TOKEN', JSON.stringify(deviceTokenData));
    deviceData=deviceTokenData;
    loadNewNotification();
  },
 
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
      setNewNotification();
      PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "ic_launcher",
        largeIconUrl:notification.data.largeIcon,
        smallIcon: "ic_notification",
        bigText:notification.data.message,
        title: notification.data.title,
        message: notification.data.message,
        bigPictureUrl: notification.data.image, // (optional) default: undefined
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        priority: "high",
      })

    // (required) Called when a remote is received or opened, or local notification is opened
    if(notification.userInteraction === true)
    {
       console.log("open screen on touch notification");
       check_notification();
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
 
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function(notification){
    console.log("notifcation action ",notification.action);
    // if(notification.action === 'Yes'){
    //   console.log("i am pressed");
    //   check_notification();
    // }
    // process the action
  },
 
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
 
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
 
  // Should the initial notification be popped automatically
  // default: true
  //popInitialNotification: true,

  senderID: '321830598673',
  popInitialNotification: true,
 
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

class App extends React.Component<Props>{
  static navigationOptions = {
      header: null
  }

  constructor(props){
      super(props);
  }

  componentDidMount(){
    this.props.dispatch(switchRootScreen());
  }

  // Render any loading content that you like here
  render() {
    // console.log("switch props Loading",this.props.data.isLoading);
    // console.log("switch props AppIntro",this.props.data.isAppIntro);
    // console.log("switch props token",this.props.data.token);

    return (
      <NavigationContainer ref={navigationRef}>
          { this.props.data.isLoading ?<SplashScreenStack /> : this.props.data.isAppIntro?<IntroStackScreen/>:
            ((this.props.data.token !== null || this.props.data.isLoignSkip != true )?
              ((this.props.data.token !== null || this.props.data.isLoignSkip != true ) ? <DrawerScreen /> : <AuthScreenStack/>)
            :
            <AuthScreenStack/>)
          }
      </NavigationContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    dispatch
  })
}

function mapStateToProps(state) {
  let data = state.data;
  return {
    data
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App);