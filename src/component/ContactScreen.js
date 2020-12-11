import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,Linking, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import {TextHeading} from '../customElement/Input'

const width = Dimensions.get('window').width;
export default function ContactScreen(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                <ScrollView>
                    <View style={{width:'90%',alignSelf:"center"}}>
                        {/*<TextHeading title="Contact Us"/>*/}
                        <View style={{flex:1,marginTop:constants.vw(25)}}>
                            <Image source={constants.image.contactus} style={styles.contactImage}/>
                            <View style={{marginTop:constants.vw(40)}}>
                                <Text style={styles.text}>
                                    Write to us at
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL('mailto:info@farmstop.in?subject=&body=')}>
                                    <Text style={styles.text}>
                                        info@farmstop.in
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(20),marginTop:constants.vw(10),marginBottom:constants.vw(10)}}>
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
    text:{
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold
    },
    contactImage:{
        alignSelf:'center',
        width:constants.width*0.98,
        height:constants.width*0.70,
        resizeMode:'contain',
    }

})


