import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
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
                <View style={{width:'80%',alignSelf:"center"}}>
                        <TextHeading title="Forgot Password?"/>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Email Id" onChangeText={(text) => this.setState({emailId:text})}/>
                        </View>
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this._sendOtpForForgetPass()}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
            )
        }else if(this.props.otp !='' && this.state.otpVerified == false){
            return(
                <View style={{width:'80%',alignSelf:"center"}}>
                        <TextHeading title="OTP Verify" fontsize={25}/>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput secureTextEntry={true} placeholder="Enter OTP" onChangeText={(text) => this.setState({enterOtp:text})}/>
                        </View>
                        
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this._verifyOtp()}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
            )
        }else if(this.props.otp !='undefined' && this.state.otpVerified == true){
            return(
                <View style={{width:'80%',alignSelf:"center"}}>
                        <TextHeading title="Reset Password" fontsize={25}/>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput secureTextEntry={true} placeholder="New Password" onChangeText={(text) => this.setState({newPassword:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput secureTextEntry={true} placeholder="Retype Password" onChangeText={(text) => this.setState({retypePassword:text})}/>
                        </View>
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.changePassword()}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
            )
        }
    }

    showMsg(){
        if(this.props.err){
            ToastAndroid.showWithGravity(this.props.err, ToastAndroid.SHORT, ToastAndroid.TOP);
            this.props.removeError();
        }else if(this.props.success){
            ToastAndroid.showWithGravity(this.props.success, ToastAndroid.SHORT, ToastAndroid.TOP);
            setTimeout(() => {
                this.props.navigation.navigate("SocialLogin");
              }, 2000);
              this.props.removeError();
        }
        
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                {this._loadLoader()}
                    {this.renderView()}
                    {this.showMsg()}          
                    </ScrollView></View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    inputBox:{
        marginTop:20
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