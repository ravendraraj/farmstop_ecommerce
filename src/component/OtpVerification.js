import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
    Keyboard,
    TextInput,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import constants from "../constants";
import { vh, vw } from "../constants/Dimension";
import {ProgressView} from '../customElement/Loader';
import {ButtonWithOutIcon} from '../customElement/button'
import { resetPassword,signUpManual } from "../lib/api";

const OtpVerification = (props) => {

    const box1Ref = React.createRef();
    const box2Ref = React.createRef();
    const box3Ref = React.createRef();
    const box4Ref = React.createRef();

    const [state, setState] = React.useState({
        box1: '',
        box2: '',
        box3: '',
        box4: '',
    });

    const [error, setError] = React.useState("");

    //const [otp, setOTP] = React.useState("");
    const otpHandle = async () => {
        //props.dispatch(byPassLogOut("auth"))
        Keyboard.dismiss()
        const otp = `${state.box1}${state.box2}${state.box3}${state.box4}`;
        
        if(otp == props.data.Otp){
                //setOTP("")
                setState({
                    box1: '',
                    box2: '',
                    box3: '',
                    box4: '',
                });

                setError("");
                //console.log(props.route.params.screen_name);
                props.dispatch({type:"SIGNUP_SUCCESS"});
                if(props.route.params.screen_name == "sign_up_screen"){
                    props.dispatch(signUpManual());
                }else if(props.route.params.screen_name == "forget_screen"){
                    props.navigation.navigate("ResetPassword");
                }
        }else{
            setError("error");
            //showAlertDialog(constants.AppConstant.WrongOtp)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
             <KeyboardAwareScrollView 
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={constants.vh(140)}
                enableOnAndroid={true}>

            <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content" />
            <View style={{alignSelf:'center',marginTop:constants.vh(100)}}/>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{backgroundColor:constants.Colors.auth_box,padding:20,marginTop:constants.vw(20),width:constants.width*0.85,alignSelf:'center',borderRadius:constants.vw(20)}}>
                <View style={[styles.text_beginContainer,{width:constants.DesignWidth-constants.vw(40), height:constants.vh(20)}]}>
                    <Text style={styles.formatted_text}>Enter Verification Code</Text>
                </View>
                <View style={styles.header}>
                        <View style={[{width:constants.DesignWidth-constants.vw(40), height:constants.vh(50)}]}>
                            <Text style={styles.text_begin}>{'We have sent a verification code to '+props.data.email+', Please enter the same.'}</Text>
                            {error !=""?<Text style={{fontSize:constants.vw(18),color:constants.Colors.color_youtube,fontFamily:constants.fonts.Cardo_Bold,textAlign:'center'}}>Please enter correct OTP</Text>:(<></>)}
                        </View>
                        <View style={{backgroundColor:constants.Colors.color_WHITE,padding:10,borderRadius:20,marginTop:constants.vh(20)}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box1Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box2Ref.current.focus():null}
                                    value={state.box1}
                                    onChangeText={(text) => {
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box1: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>

                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box2Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    secureTextEntry={true}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box3Ref.current.focus():null}
                                    value={state.box2}
                                    onChangeText={(text) => {
                                        if(text === ""){
                                            box1Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box2: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>
                                
                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box3Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():null}
                                    value={state.box3}
                                    onChangeText={(text) => {
                                        if(text === ""){
                                            box2Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box3: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>

                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box4Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    onSubmitEditing={() => box4Ref.current.focus()}
                                    secureTextEntry={true}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    //onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():null}
                                    value={state.box4}
                                    onChangeText={(text) => {
                                        console.log("text", text)
                                        if(text === ""){
                                            box3Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box4: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop:constants.vh(40)}}>
                                <ButtonWithOutIcon onPress={()=> otpHandle()} buttonName={"Proceed"}/>
                            </View>
                        </View>
                </View>
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};


function mapDispatchToProps(dispatch) {
    return ({
        dispatch
    })
}

function mapStateToProps(state) {
    let data = state.data;
    let indicator = state.indicator;
    return {
        data,indicator
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.screen_color,
    },
    crossContainer: {
        alignSelf: 'flex-end',
        right: vw(10),
        padding: vw(10)
    },
    crossImg: {
        height: (Platform.OS === 'android' ? vw(35) : vw(35)),
        width: vw(35),
        borderRadius:vw(17)
    },

    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_beginContainer: {
        width: (Platform.OS === 'ios' ? vw(200) : vw(215)),
        height: vh(60),
        alignSelf: 'center',
        marginTop: constants.vh(10),
        marginBottom: constants.vh(20),
    },
    text_begin: {
        color: constants.Colors.color_grey,
        fontSize: constants.vh(22),
        fontFamily: constants.fonts.Cardo_Regular,
        textAlign: 'center',
        lineHeight:25,
        alignSelf:'center'
    },
    formatted_text: {
        color: constants.Colors.color_heading,
        fontSize:constants.vh(25),
        fontFamily: constants.fonts.Cardo_Bold,
        textAlign: 'center',
        lineHeight:20,
        padding:10
    },
    OPTcontainer: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textInputContainer: {
        alignSelf: 'center',
        paddingTop: vh(29),
    },
    textinput: { 
        borderRadius: 0,
        borderWidth:constants.vw(0.7),
        height: vh(50),
        width: vw(50),
        fontSize: vh(28), 
        textAlign: 'center',
        borderColor: constants.Colors.color_heading
    },
    OTPBoxes: {padding:5}
});
