import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native';
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/Entypo';
import {navigateWithParams} from '../appnavigation/RootNavigation';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScreenTitleComp} from '../customElement/Input'

const NavigationDrawerStructure = (props)=> {
    const toggleDrawer = () => {
      props.navigationProps.toggleDrawer();
    };
  
    return (
      <View style={{ flexDirection: 'row' }}>
        
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          <Image source={constants.image.openMenuIcon} style={{marginLeft:10,width:constants.vw(30),height:constants.vw(30)}}/>
        </TouchableOpacity>

        <ScreenTitleComp title={props.ScreenTitle}/>
      </View>
    );
}

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state) {
      let data = state.data;
      let indicator = state.indicator;
      return {
          data,indicator
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerStructure);
