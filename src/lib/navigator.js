
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import SellerInfoScreen from '../component/SellerInfoScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Welcome" component={WelcomeScreen}/>
        <RootStack.Screen name="Home" component={HomeScreen}/>
        <RootStack.Screen name="SellerInfo" component={SellerInfoScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;

// const mapStateToProps = (state) => ({
//   // state: state.nav,
// });

// export default connect(mapStateToProps)(RootStackScreen);
