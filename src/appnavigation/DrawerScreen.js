import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './DrawerContent'
//stack
import StackScreen from './HomeStack';

//Screens
import HomeScreen from '../component/HomeScreen';

const Drawer = createDrawerNavigator();
const DrawerScreen = ({navigation}) => (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainHome" component={StackScreen} />
        <Drawer.Screen name="My Account" component={HomeScreen} />
    </Drawer.Navigator>
);

export default DrawerScreen