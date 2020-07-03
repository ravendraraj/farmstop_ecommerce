import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import Header from '../headerComponent/header';
import NavigationDrawerStructure from '../headerComponent/NavigationDrawerStructure'
import DrawerScreen from './DrawerScreen'

const AppIntroStack = createStackNavigator();
const AppIntroScreen = ({navigation}) => (
    <AppIntroStack.Navigator>
        <AppIntroStack.Screen  options={{headerShown: false}} name="AppInroduction" component={WelcomeScreen}/>
        <AppIntroStack.Screen  options={{headerShown: false}} name="Drawer" component={DrawerScreen}/>
    </AppIntroStack.Navigator>
);

export default AppIntroScreen;