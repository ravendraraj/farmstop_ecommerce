import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import DrawerScreen from './DrawerScreen';
import AppIntroScreen from './AppIntroScreen';
import {ToastAndroid} from 'react-native';
// import HomeStack from './HomeStack'

import AsyncStorage from '@react-native-community/async-storage';
//var appIntro = "done";

const Navigation = ({navigation}) => {
  const [appIntro, setIntro] = useState("null1");
  useEffect(() => {
    // Create an scoped async function in the hoo
    async function getIntroToken() {
        try {
            
            let res = await AsyncStorage.getItem('introHadDone');
            setIntro(res)
            ToastAndroid.showWithGravity(
                "All Your Base Are Belong To Us-"+res,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
        } catch(e) {
          console.log(e);
        }
    }
    // Execute the created function directly
    getIntroToken();
  }, []);

  const RootAppStack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <RootAppStack.Navigator initialRouteName="AppInroduction">
        {/* { appIntro === 'introHadDone' ? (<RootAppStack.Screen  options={{headerShown: false}} name="DrawerScreen" component={DrawerScreen}/>):<RootAppStack.Screen  options={{headerShown: false}} name="AppInroduction" component={AppIntroScreen}/>} */}
          <RootAppStack.Screen  options={{headerShown: false}} name="DrawerScreen" component={DrawerScreen}/>
          <RootAppStack.Screen  options={{headerShown: false}} name="AppInroduction" component={AppIntroScreen}/>
      </RootAppStack.Navigator>
    </NavigationContainer>
  )
  };

export default Navigation