import React from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import constants from "../constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

export const Username=(props)=>{
    return(
        <View style={styles.action}>
            <FontAwesome 
                name="user-o"
                color={props.iconColor}
                size={constants.vh(20)}
                style={{marginTop:constants.vh(12),paddingLeft:constants.vh(10)}}
            />
            <TextInput
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color:constants.Colors.color_grey
                }]}
                autoCapitalize="none"
                {...props}
            />
        </View>
    )
}

export const EmailTextInput=(props)=>{
    return(
        <View style={styles.action}>
            <Material 
                name="email-outline"
                color={props.iconColor}
                size={constants.vh(22)}
                style={{marginTop:constants.vh(12),paddingLeft:constants.vh(10)}}
            />
            <TextInput
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color:constants.Colors.color_grey
                }]}
                autoCapitalize="none"
                {...props}
            />
        </View>
    )
}

export const Password=(props)=>{
	return(
		<View style={{...styles.action}}>
            <Feather 
                name="lock"
                color={props.iconColor}
                size={constants.vh(20)}
                style={{marginTop:constants.vh(12),paddingLeft:constants.vh(10)}}
            />
            
            <TextInput 
                placeholder="Enter Password"
                placeholderTextColor="#666666"
                secureTextEntry={props.secureTextEntry ? true : false}
                style={[styles.textInput, {
                    color: constants.Colors.color_grey
                }]}
                {...props}
                autoCapitalize="none"
            />

            <TouchableOpacity {...props}>
                {
                    props.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={constants.vh(20)}
                        style={{marginTop:constants.vh(12),paddingRight:constants.vh(10)}}
                    />
                    :
                    <Feather
                        name="eye"
                        color={constants.Colors.color_statusbar}
                        size={constants.vh(20)}
                        style={{marginTop:constants.vh(12),paddingRight:constants.vh(10)}}
                    />
                }
            </TouchableOpacity>
        </View>
	)
}

const styles = StyleSheet.create({
	text_footer:{
        color: '#05375a',
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Regular
    },
    action:{
        flexDirection: 'row',
        marginTop:constants.vh(20),
        borderRadius:constants.vw(10),
        borderWidth:constants.vh(0.5),
        borderColor:constants.Colors.color_statusbar ,//'#f2f2f2',
        //padding:constants.vh(5)
    },textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 :constants.vw(-6),
        paddingLeft:constants.vw(10),
        color: '#05375a',
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize: constants.vw(16),
    },
    errorMsg: {
        color: '#FF0000',
        fontSize:constants.vw(14),
    },
});