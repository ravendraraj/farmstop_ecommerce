import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'

const width = Dimensions.get('window').width;
export default function ContactScreen(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width:'90%',alignSelf:"center",marginTop:40}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Italic,color:constants.Colors.color_heading ,fontSize:25}}>
                            Contact Us
                        </Text>
                        <View style={{marginTop:10}}>
                            <Image source={constants.image.contactus} style={{width:width-20,height:width-140,alignSelf:'center'}}/>
                            <View style={{marginTop:40}}>
                                <Text style={styles.text}>
                                    Write to us at
                                </Text>
                                <Text style={styles.text}>
                                    info@farmstop.in
                                </Text>
                                <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:25,marginTop:20,marginBottom:25}}>
                                    Or
                                </Text>
                                <Text style={styles.text}>
                                    Call us on 
                                </Text>
                                <Text style={styles.text}>
                                    +91 8123018988
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        fontSize:25,
        fontFamily:constants.fonts.Cardo_Bold
    }

})


