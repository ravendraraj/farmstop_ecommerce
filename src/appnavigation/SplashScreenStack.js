import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../component/SplashScreen';
import constants from '../constants';

const SplashStack = createStackNavigator();
const SplashScreenStack = ({navigation}) => (
    <SplashStack.Navigator headerMode='none'>
        <SplashStack.Screen name={"SplashScreen"} component={SplashScreen}/>
    </SplashStack.Navigator>
);

export default SplashScreenStack;