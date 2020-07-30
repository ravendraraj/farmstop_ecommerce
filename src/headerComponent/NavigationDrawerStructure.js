import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native';
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
          <Image source={constants.image.openMenuIcon} style={{marginLeft:10,width:constants.vw(32),height:constants.vw(32)}}/>
        </TouchableOpacity>
      </View>
    );
  }

  export default NavigationDrawerStructure;