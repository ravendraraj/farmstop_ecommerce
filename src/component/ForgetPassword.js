import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert,ToastAndroid,SafeAreaView,ImageBackground,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import {ButtonWithOutIcon} from '../customElement/button'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
//import { navigate } from '../appnavigation/RootNavigation';
import {generateOtp} from '../lib/helper'
import {sendSignUpOtp ,resetPassword} from '../lib/api'
import { Loader } from '../customElement/Loader'

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            forget : false,
            emailId :'',
            newpassScreen:false,
            newPassword:'',
            retypePassword:"",
            otpVerified: false,
            enterOtp :'',
        }
    }


    _loadLoader() {
        if (this.props.animate) {
          return (
            <Loader />
          )
        }
      }


    _sendOtpForForgetPass(){
        let email =this.state.emailId;

        if(email !=''){
            let otp = generateOtp();
            this.props.otpForsignup({username:'forget', email:email ,password:'',otp:otp});
        }else{
            Alert.alert(
                "Error Message",
                "Please Fill All Details",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }

    }

    changePassword(){
        if(this.state.newPassword !='' && this.state.retypePassword !=''){
            if(this.state.newPassword == this.state.retypePassword ){
                this.props.changePassword({email:this.props.email , password:this.state.newPassword});
            }else{
                ToastAndroid.showWithGravity("Password Dismatch ", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

        }else{
            ToastAndroid.showWithGravity("Please fill all filed ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    _verifyOtp(){
        if(this.state.enterOtp !=''){
            if(this.state.enterOtp == this.props.otp){
                ToastAndroid.showWithGravity("OTP Verified ", ToastAndroid.SHORT, ToastAndroid.TOP);
                this.setState({otpVerified:true});
            }else{
                ToastAndroid.showWithGravity("Enter Correct OTP ", ToastAndroid.SHORT, ToastAndroid.TOP);
            }
        }else{
            ToastAndroid.showWithGravity("Please fill all field ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }
    

    renderView(){
        
        if(this.props.otp === ""){
            return(
                <View style={styles.form}>
                <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(22),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>Forgot Password?</Text>
                <View style={{width:'80%',alignSelf:"center",marginTop:constants.vh(10)}}>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Email Id Or Register Mobile" onChangeText={(text) => this.setState({emailId:text})}/>
                        </View>
                        {/*<TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this._sendOtpForForgetPass()}>
                                                    <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Proceed</Text>
                                                </TouchableOpacity>*/}
                        <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(40)}}>
                            <ButtonWithOutIcon 
                                buttonName={"Reset"}
                                onPress={()=>this._sendOtpForForgetPass()}
                            />
                        </View>
                    </View>
                </View>    
            )
        }else if(this.props.otp !='' && this.state.otpVerified == false){
            return(
                <View style={styles.form}>
                    <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(22),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>OTP Verification</Text>

                    <View style={styles.inputBox}>
                        <PrimaryTextInput secureTextEntry={true} placeholder="Enter OTP" onChangeText={(text) => this.setState({enterOtp:text})}/>
                    </View>
                        
                    {/*<TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this._verifyOtp()}>
                                                <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Reset</Text>
                                        </TouchableOpacity>*/}
                    <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(40)}}>
                        <ButtonWithOutIcon 
                            buttonName={"Reset"}
                            onPress={()=>this._verifyOtp()} 
                        />
                    </View>
                </View>
            )
        }else if(this.props.otp !='undefined' && this.state.otpVerified == true){
            return(
                <View style={styles.form}>
                        <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(22),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>Reset Password</Text>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput secureTextEntry={true} placeholder="New Password" onChangeText={(text) => this.setState({newPassword:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput secureTextEntry={true} placeholder="Retype Password" onChangeText={(text) => this.setState({retypePassword:text})}/>
                        </View>
                        
                        {/*<TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.changePassword()}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Reset</Text>
                        </TouchableOpacity>*/}

                        <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(40)}}>
                            <ButtonWithOutIcon 
                                buttonName={"Reset"}
                                onPress={()=>this.changePassword()}
                            />
                        </View>
                    </View>
            )
        }
    }

    showMsg(){
        if(this.props.err){
            //ToastAndroid.showWithGravity(this.props.err, ToastAndroid.SHORT, ToastAndroid.TOP);
            this.props.removeError();
        }else if(this.props.success){
            //ToastAndroid.showWithGravity(this.props.success, ToastAndroid.SHORT, ToastAndroid.TOP);
            setTimeout(() => {
                this.props.navigation.navigate("SocialLogin");
              }, 2000);
              this.props.removeError();
        }
        
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={{flex: 1}}
                    source={constants.image.commonBg}
                    resizeMode={'cover'}
                >
                <StatusBar backgroundColor={constants.Colors.color_heading} barStyle="dark-content"/>
                    <ScrollView>
                        {this.renderView()}
                        {this.showMsg()}
                    </ScrollView>
                    {this._loadLoader()}
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    inputBox:{
        marginTop:20,
        alignSelf:'center',
        width:constants.width*0.7,
    },
    form:{
        marginBottom:constants.vh(10),
        justifyContent:'center',
        width:constants.width*0.9,
        alignSelf:"center",
        marginTop:constants.vh(150),
        backgroundColor:constants.Colors.color_WHITE,
        //backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:constants.vw(10),
        paddingBottom:20,
        elevation:5,
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
    err: state.error.err,
    success: state.error.success,
    animate: state.indicator,
    otp: state.data.Otp,
    email: state.data.email,
});

const mapDispatchToProps = dispatch => ({
    removeError: () => dispatch({type:'REMOVE_ERROR'}),
    otpForsignup: data =>dispatch(sendSignUpOtp(data)),
    changePassword: data => dispatch(resetPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);