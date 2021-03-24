import React,{Component,useEffect,useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    BackHandler,
    Alert
} from 'react-native'

import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {NormalButton} from '../customElement/button'
import NetInfo from "@react-native-community/netinfo";
const width = Dimensions.get('window').width;

export default function internetError(props){
    useEffect(() =>{
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const backAction=()=>{
        Alert.alert("Farmstop","Do you want close the application.", [
        {
            text:"Cancel",
            onPress: () => null,
            style: "cancel"
        },
        {text:"Ok", onPress:()=>{BackHandler.exitApp()}}
        ]);
        return true;
    };

    const reteryOnNetConnect=async()=>{
        const state = await NetInfo.fetch();
        if(state.isConnected == true){
            //props.navigation.goBack();
            props.navigation.navigate("MainHome");
        }else{
            Alert.alert("Farmstop","Please check your internet connection"[
              {
                text:"Cancel",
                onPress: () => null,
                style: "cancel"
              },
                {text:"Ok", onPress:()=>{
                    //BackHandler.exitApp()
                }}
            ]); 
        }
    }
    
return(
        <View style={styles.container}>
            <Image source={constants.image.noInternet} style={{width:constants.width*0.8,height:constants.width*0.8,alignSelf:'center',resizeMode:'contain'}}/>
            <View style={{marginTop:constants.vw(10)}}>
                <Text style={styles.text}>No Internet!</Text>
                <Text style={styles.infoText}>Please check your internet connection</Text>
                <View style={{marginTop:10}}>
                <NormalButton buttonName={"Retry"} onPress={()=>{reteryOnNetConnect()}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE,
        justifyContent:'center',
        alignItems:'center',
    },
    inputBox:{
        marginTop:20
    },
    text:{
        alignSelf:'center',
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold
    },
    infoText:{
        textAlign:'center',
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Regular,
    }

})


