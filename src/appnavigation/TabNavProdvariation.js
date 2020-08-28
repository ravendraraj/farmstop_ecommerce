import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import productVariation from '../component/PorductVariation'
import MyCart from '../component/MyCart'
import SearchProductVariation from '../component/SearchProductVariation'
import constants from '../constants'
import MyProfile from '../component/MyProfile'
import MyWish from '../component/WishList' 
import HomeScreen from '../component/HomeScreen'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/AntDesign'


const Tab = createBottomTabNavigator();
const TabNavProdvariation = ({navigation}) => (
    <Tab.Navigator initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            // iconName = focused ? <Image source={constants.image.homeIcon} style={{width:35,height:35,opacity:0.5}}/> : <Image source={constants.image.homeIcon} style={{width:35,height:35}}/>;
            iconName = focused ? <Icons name="home" color={constants.Colors.color_btn} size={25}/> :<Icons name="home" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.homeIcon;
          } else if (route.name === 'Search') {
            // iconName = focused ? <Image source={constants.image.searchIcon} style={{width:25,height:25,opacity:0.5}}/> : <Image source={constants.image.searchIcon} style={{width:25,height:25}}/>;
            iconName = focused ? <Material name="search1" color={constants.Colors.color_btn} size={25}/> :<Material name="search1" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.searchIcon;
          }else if (route.name === 'My Profile') {
            // iconName = focused ? <Image source={constants.image.profile} style={{width:25,height:25,opacity:0.5}}/> : <Image source={constants.image.profile} style={{width:25,height:25}}/>;
            iconName = focused ? <Icons name="user-alt" color={constants.Colors.color_btn} size={25}/> :<Icons name="user-alt" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.profile;
          }else if (route.name === 'Wish List') {
            // iconName = focused ? <Image source={constants.image.heartIcon} style={{width:25,height:25,opacity:0.5}}/> : <Image source={constants.image.heartIcon} style={{width:25,height:25}}/>;
            iconName = focused ? <Material name="heart" color={constants.Colors.color_btn} size={25}/> :<Material name="heart" color={constants.Colors.color_BLACK} size={25}/>
            // iconName = constants.image.profile;
          }if (route.name === 'Product') {
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
        <Tab.Screen options={{tabBarVisible:false}} name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchProductVariation} />
        <Tab.Screen name="Wish List" component={MyWish} />
        <Tab.Screen name="My Profile" component={MyProfile} />
        <Tab.Screen name="Product" component={productVariation} />
    </Tab.Navigator>
)

export default TabNavProdvariation;