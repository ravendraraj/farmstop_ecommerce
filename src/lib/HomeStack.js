
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { connect } from 'react-redux';

//screens
import WelcomeScreen from '../component/WelcomeScreen';
import HomeScreen from '../component/HomeScreen';
import SellerInfoScreen from '../component/SellerInfoScreen';
import Header from '../headerComponent/header';
import NavigationDrawerStructure from '../headerComponent/NavigationDrawerStructure'
// import DrawerScreen from './DrawerScreen';

const RootStack = createStackNavigator();


// onPress={() => {navigation.openDrawer()}}

const HomeStack = ({navigation}) => (
    <RootStack.Navigator initialRouteName="MainHome">
        {/* <RootStack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/> */}
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerTransparent:true,
            })}
            
            name="MainHome" component={HomeScreen}/>
        
        <RootStack.Screen 
            options={({ navigation }) => ({
                headerTitle: props => <Header navigation={navigation} />,
                headerTransparent:true,
            })}

            name="SellerInfo" component={SellerInfoScreen}/>
    </RootStack.Navigator>
);

export default HomeStack;

// const mapStateToProps = (state) => ({
//   // state: state.nav,
// });

// export default connect(mapStateToProps)(RootStackScreen);
