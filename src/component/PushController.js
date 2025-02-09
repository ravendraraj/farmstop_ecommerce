import React, {Component} from "react";
import { connect } from 'react-redux';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { navigate,check_notification } from '../appnavigation/RootNavigation'

var PushNotification = require("react-native-push-notification")

var deviceData = "";
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (deviceTokenData) {
    console.log("TOKEN:", deviceTokenData);
    AsyncStorage.setItem('DEVICE_TOKEN', JSON.stringify(deviceTokenData));
    deviceData=deviceTokenData
  },
 
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
 
      PushNotification.localNotification({
        //showWhen:true,
        autoCancel: true,
        bigText:notification.data.message,
        title: notification.data.title,
        message: notification.data.message,
        bigPictureUrl: notification.data.image, // (optional) default: undefined
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
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
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
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



class PushController extends Component{
    constructor(props) {
    super(props)
        this.state = {
          showFooter:"",
        };
    };
    componentDidMount(){
      console.log("ravendra", deviceData);
      //this.props.setDeviceData(deviceData);
    }

    render(){
        return null;
    }
}

const mapStateToProps = state => ({
  animate: state.indicator,
});

const mapDispatchToProps = dispatch => ({
  setDeviceData: (data) => dispatch({ type: 'SET_DIVECE_DATA',token:data.token, os:data.os}),
});

export default connect(mapStateToProps, mapDispatchToProps)(PushController);