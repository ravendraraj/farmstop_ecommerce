import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'

const width = Dimensions.get('window').width;
export default function NotLoginScreen(props){
        return(
            <View style={styles.container}>
                <Text style={styles.infoText}>
                    {constants.constStrings.not_login}
                </Text>
                <TouchableOpacity style={{alignSelf:"center",marginTop:10,borderColor:constants.Colors.color_heading,borderWidth:1,borderRadius:10,padding:10}} onPress={()=>{props.navigation.navigate("SocialLogin")}}>
                    <Text style={{fontFamily: constants.fonts.Cardo_Bold, textAlignVertical: "top", fontSize: 14,color:constants.Colors.color_heading}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor:constants.Colors.color_WHITE,
        alignItems:'center',
        justifyContent:'center'
    },
    inputBox:{
        marginTop:20
    },
    text:{
        alignSelf:'center',
        fontSize:constants.vw(40),
        fontFamily:constants.fonts.Cardo_Bold
    },
    infoText:{
        textAlign:'center',
        fontSize:constants.vh(18),
        fontFamily:constants.fonts.Cardo_Regular,
    }

})