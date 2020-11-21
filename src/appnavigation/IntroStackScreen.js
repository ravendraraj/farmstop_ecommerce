import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppIntroScreen from '../component/AppIntroScreen';
import constants from '../constants';

const IntroStack = createStackNavigator();
const IntroStackScreen = ({navigation}) => (
    <IntroStack.Navigator headerMode='none' initialRouteName={"AppIntroScreen"}>
        <IntroStack.Screen name={"AppIntroScreen"} component={AppIntroScreen}/>
    </IntroStack.Navigator>
);

export default IntroStackScreen;