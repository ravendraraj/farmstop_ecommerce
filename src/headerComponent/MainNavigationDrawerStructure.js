import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native';
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/Entypo';
import {navigateWithParams} from '../appnavigation/RootNavigation';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const MainNavigationDrawerStructure = (props)=> {
    const toggleDrawer = () => {
      props.navigationProps.toggleDrawer();
    };

    const redirectOnPage=()=>{
      if(props.data.token !='' && props.data.token !=null){
          navigateWithParams("ShippingAddress","HomeScreen");
      }else{
          navigateWithParams("GoogleLocation","HomeScreen");
      }
    }

    const renderSelctedAddress=()=>{
      if(props.data.token !='' && props.data.token !=null){
          return(
              <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(12)}}>
                  {(props.data.defaultFullAddress != "" && props.data.defaultFullAddress != null)?(props.data.defaultFullAddress).substr(0,42):'Select Address'}
                  <Material name="lead-pencil" size={10} />
              </Text>              
            )
      }else{
        return(
          <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(12)}}>
            {(props.data.selectAddress != "" && props.data.selectAddress != null)?(props.data.selectAddress).substr(0,42):'Select Address'}
            <Material name="lead-pencil" size={10} />
          </Text>
        )
      }
    }
  
    return (
      <View style={{ flexDirection: 'row' }}>
        
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          <Image source={constants.image.openMenuIcon} style={{marginLeft:10,width:constants.vw(30),height:constants.vw(30)}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{redirectOnPage()}}
            style={{width:constants.width*0.7,marginLeft:constants.vw(10)}}
        >   
            <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(12)}}>Delivery Location</Text>
            {/*<Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(12)}}>
                {props.data.defaultFullAddress == ""?'Select Address':(props.data.defaultFullAddress).substr(0,42)}
                <Material name="lead-pencil" size={10} />
            </Text>*/}
            {renderSelctedAddress()}
        </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigationDrawerStructure);
