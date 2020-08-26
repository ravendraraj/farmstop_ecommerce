import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyOrderList from '../component/MyOrderList'
import MyCart from '../component/MyCart'
import SearchWishItem from '../component/SearchWishItem'
import constants from '../constants'
import MyProfile from '../component/MyProfile'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/AntDesign'
import MyWish from '../component/WishList' 

const Tab = createBottomTabNavigator();
const MyOrderTab = ({navigation}) => (
    <Tab.Navigator initialRouteName="MyOrderList"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            // iconName = focused ? <Image source={constants.image.homeIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.homeIcon} style={{width:35,height:35}}/>;
             iconName = focused ? <Icons name="home" color={constants.Colors.color_btn} size={25}/> :<Icons name="home" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.homeIcon;
          } else if (route.name === 'Search') {
            // iconName = focused ? <Image source={constants.image.searchIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.searchIcon} style={{width:35,height:35}}/>;
            iconName = focused ? <Material name="search1" color={constants.Colors.color_btn} size={25}/> :<Material name="search1" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.searchIcon;
          }else if (route.name === 'My Profile') {
            // iconName = focused ? <Image source={constants.image.userIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.profile} style={{width:35,height:35}}/>;
            iconName = focused ? <Icons name="user-alt" color={constants.Colors.color_btn} size={25}/> :<Icons name="user-alt" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.profile;
          }else if (route.name === 'Wish List') {
            // iconName = focused ? <Image source={constants.image.heartIcon} style={{width:25,height:25,opacity:0.5}}/> : <Image source={constants.image.heartIcon} style={{width:25,height:25}}/>;
            iconName = focused ? <Material name="heart" color={constants.Colors.color_btn} size={25}/> :<Material name="heart" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.profile;
          }

          return iconName;
          // You can return any component that you like here!
          // return <Image source={iconName} style={{width:35,height:35}}/>;
        //   return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: constants.Colors.color_btn,
        inactiveTintColor: 'gray',
        showLabel:true
      }}

      
    >
        <Tab.Screen name="Home" component={MyOrderList} />
        <Tab.Screen name="Search" component={SearchWishItem} />
        <Tab.Screen name="Wish List" component={MyWish} />
        <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
)

export default MyOrderTab;