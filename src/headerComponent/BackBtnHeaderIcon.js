import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native'
import {connect} from 'react-redux'
import constants from '../constants'
import {showErrorMsg} from '../lib/helper'
import Icon from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'

function BackBtnHeaderIcon(props){
    
    const nav = (route)=>{
        props.navigation.navigate(route);
    }

    const toggleDrawer = () => {
      props.navigation.goBack();
    };

    let totalProd = props.data.addedItems.length > 0 ? props.data.addedItems.length:0;
    
    return(
            <View style={props.visibilty == true?styles.linearHead:styles.noShadow}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=> toggleDrawer()}>
                        <Material name="arrow-left" color={props.visibilty == true?constants.Colors.color_backBtn:constants.Colors.color_heading} size={constants.vw(24)} style={{marginLeft:10}}/>
                    </TouchableOpacity>
                    <View style={{marginLeft:15,marginTop:5,}}>
                        <Text>{props.screenTitle}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginRight:constants.vw(10)}}>
                    <TouchableOpacity style={{marginRight:20}} onPress={()=>{props.navigation.navigate("MyCart")}}>
                        <View style={styles.cartTextContainer}>
                            <Text style={styles.cartText}>{totalProd}</Text>
                        </View>
                        <Image source={constants.image.cartIcon} style={{width:30,height:30}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{(props.data.token !="" && props.data.token !=null )?props.navigation.navigate("MyProfile"):showErrorMsg(constants.constStrings.not_login,"SocialLogin")}}>
                        <Image source={constants.image.userIcon} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
    )
}


const styles = StyleSheet.create({
    linearHead:{
        flexDirection :'row',
        justifyContent:'space-between',
        paddingTop:constants.vw(10),
        paddingBottom:constants.vw(10),
        //borderBottomWidth:0.5,//updated
        //borderColor:constants.Colors.color_grey,//updated,
        //elevation:10
    },
    noShadow:{
        position: 'absolute', left: 0, right: 0,top:0,zIndex:10,
        flexDirection :'row',
        paddingTop:constants.vw(10),
        paddingBottom:constants.vw(15),
        backgroundColor:'rgba(255, 255, 255,0.8)',
        justifyContent:'space-between',
        //backgroundColor:constants.Colors.color_heading
        elevation:2
    },
    cartTextContainer:{
        position:'absolute',
        left:25,
        top:-5,
        zIndex:2,
    },cartText:{
        paddingLeft:5,
        paddingRight:5,
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:10,
        color:constants.Colors.color_WHITE,
        backgroundColor:constants.Colors.color_cartText,
        borderWidth:1,
        borderColor:constants.Colors.color_cartText,
        borderRadius:8,
    }
});


function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state){
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        indicator,data,error
};
}

export default connect(mapStateToProps, mapDispatchToProps)(BackBtnHeaderIcon);