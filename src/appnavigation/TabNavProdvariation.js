import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import productVariation from '../component/PorductVariation'
import MyCart from '../component/MyCart'
import SearchProductVariation from '../component/SearchProductVariation'
import constants from '../constants'
import MyProfile from '../component/MyProfile'
import MyWish from '../component/WishList' 
import NotLoginScreen from '../component/NotLoginScreen'
import HomeScreen from '../component/HomeScreen'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'

const Tab = createBottomTabNavigator();
function TabNavProdvariation(props,navigation){
//const TabNavProdvariation = ({navigation},props) =>{
    return(
    <Tab.Navigator initialRouteName="Home"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? <Icons name="home" color={constants.Colors.color_btn} size={25}/> :<Icons name="home" color={constants.Colors.color_BLACK} size={25}/>
          } else if (route.name === 'Search') {
            iconName = focused ? <Material name="search1" color={constants.Colors.color_btn} size={25}/> :<Material name="search1" color={constants.Colors.color_BLACK} size={25}/>
          }else if (route.name === 'My Profile') {
            iconName = focused ? <Icons name="user-alt" color={constants.Colors.color_btn} size={25}/> :<Icons name="user-alt" color={constants.Colors.color_BLACK} size={25}/>
          }else if (route.name === 'Wish List') {
            iconName = focused ? <Material name="heart" color={constants.Colors.color_btn} size={25}/> :<Material name="heart" color={constants.Colors.color_BLACK} size={25}/>
          }if (route.name === 'Product') {
            iconName = focused ? <Material name="appstore1" color={constants.Colors.color_btn} size={25}/> :<Material name="appstore1" color={constants.Colors.color_BLACK} size={25}/>
          }

          return iconName;
        },
      })}
      tabBarOptions={{
        activeTintColor: constants.Colors.color_btn,
        inactiveTintColor: 'gray',
        showLabel:true,
        keyboardHidesTabBar:true,
      }}  
    >
        <Tab.Screen options={{tabBarVisible:false}} name="Home" component={HomeScreen} />
        <Tab.Screen name="Product" component={productVariation} />
        <Tab.Screen name="Search" component={SearchProductVariation} />
        <Tab.Screen name="Wish List" component={(props.data.authUserID !="" && props.data.authUserID != null)? MyWish :NotLoginScreen} />
        <Tab.Screen name="My Profile" component={(props.data.authUserID !="" && props.data.authUserID != null)? MyProfile :NotLoginScreen} />
    </Tab.Navigator>
)
}

//export default TabNavProdvariation;
    function mapDispatchToProps(dispatch) {
        return({
            dispatch
        })
    }

    function mapStateToProps(state) {
        let auth = state.auth;
        let indicator = state.indicator;
        let data = state.data;
        let error = state.error;
        return {
            auth,indicator,data,error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabNavProdvariation);