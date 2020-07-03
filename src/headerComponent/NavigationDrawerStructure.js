import React from 'react'
import {View,StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/Entypo';
const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
  
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          {/*Donute Button Image */}
          {/* <Image
            source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          /> */}
          <Icon name="menu" style={{paddingLeft:10}} size={30}  color={constants.Colors.color_BLACK}/>
        </TouchableOpacity>
      </View>
    );
  }

  export default NavigationDrawerStructure;