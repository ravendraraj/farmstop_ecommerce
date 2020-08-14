import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import productVariation from '../component/PorductVariation'
import MyCart from '../component/MyCart'
import SearchProductVariation from '../component/SearchProductVariation'
import constants from '../constants'
import MyProfile from '../component/MyProfile'

const Tab = createBottomTabNavigator();
const TabNavProdvariation = ({navigation}) => (
    <Tab.Navigator initialRouteName="productVariation"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'productVariation') {
            iconName = focused ? <Image source={constants.image.homeIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.homeIcon} style={{width:35,height:35}}/>;
            // iconName = constants.image.homeIcon;
          } else if (route.name === 'Search') {
            iconName = focused ? <Image source={constants.image.searchIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.searchIcon} style={{width:35,height:35}}/>;
            // iconName = constants.image.searchIcon;
          }else if (route.name === 'MyProfile') {
            iconName = focused ? <Image source={constants.image.profile} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.profile} style={{width:35,height:35}}/>;
            // iconName = constants.image.profile;
          }

          return iconName;
          // You can return any component that you like here!
          // return <Image source={iconName} style={{width:35,height:35}}/>;
        //   return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel:false
      }}

      
    >
        <Tab.Screen name="productVariation" component={productVariation} />
        <Tab.Screen name="Search" component={SearchProductVariation} />
        <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
)

export default TabNavProdvariation;