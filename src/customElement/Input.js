import React from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
import constants from "../constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
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
                    style={[{ fontFamily: constants.fonts.Cardo_Regular, }, styles.text]}
                />
            </View>
        </View>
    );
}

export const CouponTextInput = (props) => {
    return (
        <View>
            {/* <Text style={styles.textInputTitle}>{props.title}</Text> */}
            <View style={styles.noBorderBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Futura_Std_Book, }, styles.text]}
                />
            </View>
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
        <View>
            <Text style={styles.textInputTitle,{color:constants.Colors.color_heading,fontFamily:italic,fontSize:props.fontsize}}>{props.title}</Text>
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

export const PasscodeTextInput = (props) => {
    return (
        <View>
            <TextInput
                ref={(r) => { props.inputRef && props.inputRef(r) }} />
        </View>
    );
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
        marginTop: 10,
        height: 60,
        borderColor: constants.Colors.color_e6e5e5
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
});