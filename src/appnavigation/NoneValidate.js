import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './DrawerContent'
//stack
import WithoutSignInStack from './WithoutSignInStack';

//Screens
import HomeScreen from '../component/HomeScreen';

const Drawer = createDrawerNavigator();
const NoneValidate = ({navigation}) => (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="MainHome" component={WithoutSignInStack} />
    </Drawer.Navigator>
);
export default NoneValidate