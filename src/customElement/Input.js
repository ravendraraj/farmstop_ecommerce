import React from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import constants from "../constants";

export const PrimaryTextInput = (props) => {
    return (
        <View>
            {/* <Text style={styles.textInputTitle}>{props.title}</Text> */}
            <View style={styles.inputTextBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Futura_Std_Book, }, styles.text]}
                />
            </View>
        </View>
    );
}

export const TextHeading = (props) => {
    return (
        <View>
            <Text style={styles.textInputTitle,{color:constants.Colors.color_heading,fontFamily:'italic',fontSize:20}}>{props.title}</Text>
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
    },
    text: {
        paddingHorizontal: constants.vh(15),
        paddingTop: constants.vh(28),
        fontSize: 14
    }
});