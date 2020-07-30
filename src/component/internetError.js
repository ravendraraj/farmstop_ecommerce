import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'

const width = Dimensions.get('window').width;
export default function internetError(){
        return(
            <View style={styles.container}>
                    
                <Image source={constants.image.noInternet} style={{width:"70%",height:"50%",alignSelf:'center',marginTop:constants.vw(30)}}/>
                <View style={{marginTop:constants.vw(30)}}>
                    <Text style={styles.text}>No Internet!</Text>
                    <Text style={styles.infoText}>Please check your internet connection</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
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
        fontSize:constants.vw(25),
        fontFamily:constants.fonts.Cardo_Regular,
    }

})


