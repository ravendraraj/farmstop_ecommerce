import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyWish from '../component/WishList'
import MyCart from '../component/MyCart'
import SearchWishItem from '../component/SearchWishItem'
import constants from '../constants'

const Tab = createBottomTabNavigator();
const WishTabNav = ({navigation}) => (
    <Tab.Navigator initialRouteName="MyWish"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MyWish') {
            iconName = focused ? <Image source={constants.image.homeIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.homeIcon} style={{width:35,height:35}}/>;
            // iconName = constants.image.homeIcon;
          } else if (route.name === 'SearchWishItem') {
            iconName = focused ? <Image source={constants.image.searchIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.searchIcon} style={{width:35,height:35}}/>;
            // iconName = constants.image.searchIcon;
          }else if (route.name === 'MyAccount') {
            iconName = focused ? <Image source={constants.image.userIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.profile} style={{width:35,height:35}}/>;
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
        <Tab.Screen name="MyWish" component={MyWish} />
        <Tab.Screen name="SearchWishItem" component={SearchWishItem} />
        <Tab.Screen name="MyAccount" component={MyCart} />
    </Tab.Navigator>
)

export default WishTabNav;