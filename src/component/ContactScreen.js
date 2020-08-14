import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import {TextHeading} from '../customElement/Input'

const width = Dimensions.get('window').width;
export default function ContactScreen(){
        return(
            <View style={styles.container}>
                {/* <ScrollView> */}
                    <View style={{flex:1,flexDirection:'column',width:'90%',alignSelf:"center"}}>
                        <TextHeading title="Contact Us"/>
                        <View style={{marginTop:constants.vw(25)}}>
                            <Image source={constants.image.contactus} style={{width:"88%",height:'39%',alignSelf:'center'}}/>
                            <View style={{marginTop:constants.vw(10)}}>
                                <Text style={styles.text}>
                                    Write to us at
                                </Text>
                                <Text style={styles.text}>
                                    info@farmstop.in
                                </Text>
                                <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(28),marginTop:constants.vw(10),marginBottom:constants.vw(10)}}>
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
                {/* </ScrollView> */}
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
        fontSize:constants.vw(28),
        fontFamily:constants.fonts.Cardo_Bold
    }

})


