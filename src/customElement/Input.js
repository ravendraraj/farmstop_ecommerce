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

const width = Dimensions.get('window').width;

const bold = constants.fonts.Cardo_Bold;
const italic = constants.fonts.Cardo_Italic;
const regular = constants.fonts.Cardo_Regular;

export const PrimaryTextInput = (props) => {
    return (
        <View>
            {/* <Text style={styles.textInputTitle}>{props.title}</Text> */}
            <View style={styles.inputTextBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Cardo_Regular,color:'black' }, styles.text]}
                />
            </View>
        </View>
    );
}

export const PrimaryInputWithLabel = (props) => {
    return (
        <View>
            <Text style={{color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(20)}}>{props.title}</Text>
            
            <TextInput
                {...props}
                selectionColor={constants.Colors.screen_title}
                style={{ height: 40, borderColor: 'gray', borderBottomWidth:2,fontFamily: constants.fonts.Cardo_Regular }}    
            />
        </View>
    );
}

export const CouponTextInput = (props) => {
    return (
            <View style={styles.noBorderBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Cardo_Regular, }, styles.text]}
                />
            </View>
    );
}

export const SearchBox1 = (props) => {
    return (
            <View style={styles.inputSearchBox}>
                <AntDesign name="search1" size={25} color={constants.Colors.color_BLACK} style={{paddingTop:20,paddingLeft:20}}/>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Futura_Std_Book,width:width-60 }, styles.text]}
                />
            </View>
    );
}

export const SearchBox =(props)=>{
    return(
    <View style={styles.SectionStyle}>
          <AntDesign name="search1" size={25} color={constants.Colors.color_BLACK} 
          style={styles.ImageStyle}/>

          <TextInput
            {...props}
            style={{ flex: 1 }}
          />
        </View>
        )
}

export const TextHeading = (props) => {
    return (
        <View style={{backgroundColor:constants.Colors.color_heading,padding:constants.vw(10)}}>
            <Text style={{color:constants.Colors.color_WHITE,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(20)}}>{props.title}</Text>
        </View>
    );
}

export const MainHeading = (props) => {
    return (
        <View style={{paddingLeft:constants.vw(10),paddingRight:constants.vw(10)}}>
            <Text style={{color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(22),textAlign:'center'}}>{props.title}</Text>
            <Text style={{color:constants.Colors.color_water,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(22),marginTop:constants.vh(20),textAlign:'center'}}>{props.subTitle}</Text>
        </View>
    );
}

export const FormLabel = (props) => {
    return (
        <View style={{paddingLeft:constants.vw(10),paddingRight:constants.vw(10)}}>
            <Text style={{color:props.color,fontFamily:constants.fonts.Cardo_Bold,fontSize:props.fontsize,textAlign:'center'}}>{props.title}</Text>
        </View>
    );
}

export const ScreenTitleComp = (props) => {
    return (
        <View>
            <Text style={{color:constants.Colors.color_heading,fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vh(22),paddingLeft:constants.vw(10),paddingTop:constants.vw(2)}}>{props.title}</Text>
        </View>
    );
}

export const TextView = (props) => {
    return (
        <View style={[styles.inputTextBox, { width: '85%', height: 127 }]}>
            <TextInput
                {...props}
                selectionColor={constants.Colors.color_BLACK}
                style={[styles.text, { fontFamily: constants.fonts.Futura_Std_Book, textAlignVertical: "top", fontSize: 14 }]}
            />
        </View>
    );
}

export const EmptyComp = (props) => {
    return (
        <View style={{alignSelf:'center',marginTop:constants.vw(60)}}>
            <Image 
                source={props.imageName}
                style={{width:constants.vw(220),height:constants.vw(220),alignSelf:"center"}}
            />
                  
            <View style={{flexDirection:'row'}}>
                <Text style={styles.welcomText}>
                    {props.welcomText}
                    <Entypo name="emoji-sad" size={18} color={constants.Colors.color_intro} style={{paddingTop:4,paddingLeft:4}}/>
                </Text>
            </View>

            {
                props.redirectText !=""?(<View style={{width:100,alignSelf:"center",justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{alignSelf:"center",marginTop:10,borderColor:constants.Colors.color_heading,borderWidth:1,borderRadius:10,padding:constants.vw(7)}} onPress={props.onPress}>
                    <Text style={{fontFamily: constants.fonts.Cardo_Bold,fontSize:constants.vw(14),color:constants.Colors.color_heading}}>
                        {props.redirectText}
                    </Text>
                </TouchableOpacity>
            </View>):(<View/>)
        }
        </View>
    );
}

export const PreLoadScreenMsg=(props)=>{
    return(
        <View style={{alignSelf:'center',marginTop:constants.vw(100),justifyContent:'center',alignItems:'center'}}>
            <Image 
                source={props.image_url}
                style={{width:constants.vw(150),height:constants.vw(150),alignSelf:"center"}}
            />
                  
            <View style={{flexDirection:'row'}}>
                <Text style={{...styles.welcomText,color:constants.Colors.color_grey}}>
                    {props.content}
                </Text>
            </View>
        </View>
    );
}


export const LoginErrorComp = (props) => {
    return (
        <View style={{alignSelf:'center',marginTop:constants.vw(60)}}>
            <Image 
                source={props.imageName}
                style={{width:constants.vw(220),height:constants.vw(220),alignSelf:"center"}}
            />
                  
            <View style={{flexDirection:'row',alignSelf:'center'}}>  
                <Text style={styles.welcomText}>
                    {props.welcomText}
                </Text>
                <Entypo name="emoji-sad" size={18} color={constants.Colors.color_intro} style={{paddingTop:4}}/>
            </View>

            {
                props.redirectText !=""?(<View style={{width:100,alignSelf:"center"}}>
                <TouchableOpacity style={{alignSelf:"center",marginTop:10,borderColor:constants.Colors.color_heading,borderWidth:1,borderRadius:10,padding:10}} onPress={props.onPress}>
                    <Text style={{fontFamily: constants.fonts.Cardo_Bold, textAlignVertical: "top", fontSize: 14,color:constants.Colors.color_heading}}>
                        {props.redirectText}
                    </Text>
                </TouchableOpacity>
            </View>):(<View/>)
        }
        </View>
    );
}

export const PasscodeTextInput = (props) => {
    return (
        <View>
            <TextInput
                 {...props}
                ref={(r) => { props.inputRef && props.inputRef(r) }} />
        </View>
    );
}

export const Username=()=>{
    return(
        <View>
        <Text 
            style={[styles.text_footer, {
                color:constants.Colors.color_grey
            }]}
        >
            Username
        </Text>

        <View style={styles.action}>
            <FontAwesome 
                name="user-o"
                color={constants.Colors.color_grey}
                size={20}
            />
            <TextInput 
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color:constants.Colors.color_grey
                }]}
                autoCapitalize="none"
            />

            <Animatable.View animation="bounceIn">
                <Feather 
                    name="check-circle"
                    color="green"
                    size={20}
                />
            </Animatable.View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputTitle: {
        color: constants.Colors.color_47474d,
        fontFamily: constants.fonts.Futura_Std_Book,
        fontSize: 14
    },
    inputTextBox: {
        borderBottomWidth: 3,
        marginTop: 10,
        height: 50,
        borderColor: constants.Colors.color_e6e5e5
    },
    noBorderBox: {
        width:'100%',
        marginTop: 4,
        height: 60,
        borderColor: constants.Colors.color_e6e5e5,
    },
    inputSearchBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
    },
    text: {
        // paddingHorizontal: constants.vh(25),
        paddingTop: constants.vh(15),
        fontSize: 18
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderWidth: 0.5,
        // borderColor: '#000',
        height: 40,
        // borderRadius: 5,
        // margin: 10,
      },
    
      ImageStyle: {
        padding: 10,
        margin: 5,
        resizeMode: 'stretch',
        alignItems: 'center',
      },
      welcomText:{
        color: constants.Colors.color_intro,
        textAlign: 'center',
        fontSize: 18,
        paddingLeft:10,
        paddingRight:10,
        fontFamily:regular
      }
});