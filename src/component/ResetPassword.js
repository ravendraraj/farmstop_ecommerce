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
import {Username,Password,EmailTextInput}  from '../customElement/TextInputFields'

class ResetPassword extends Component{
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
            reSecureTextEntry:true,
            secureTextEntry:true
        }
    }


    _loadLoader() {
        if (this.props.animate) {
          return (
            <Loader />
          )
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

    changePasswordSecurety(){
        if(this.state.secureTextEntry == false){
            this.setState({secureTextEntry:true});
        }else{
            this.setState({secureTextEntry:false});
        }
    }

    changeRePasswordSecurety(){
        if(this.state.reSecureTextEntry == false){
            this.setState({reSecureTextEntry:true});
        }else{
            this.setState({reSecureTextEntry:false});
        }
    }
    

    renderView(){        
        return(
            <View style={styles.form}>
                <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(22),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>Reset Password</Text>
                <Password
                    placeholder="New Password"
                    secureTextEntry={this.state.secureTextEntry}
                    onPress={()=>{this.changePasswordSecurety()}}
                    onChangeText={(text) => this.setState({newPassword:text})}
                    iconColor={this.state.newPassword !=''?constants.Colors.color_statusbar:constants.Colors.color_grey}
                />
                    
                <Password 
                    placeholder="Retype Password"
                    secureTextEntry={this.state.reSecureTextEntry}
                    onPress={()=>{this.changeRePasswordSecurety()}}
                    onChangeText={(text) => this.setState({retypePassword:text})}
                    iconColor={this.state.retypePassword !=''?constants.Colors.color_statusbar:constants.Colors.color_grey}
                />
        
                <View style={{width:'100%',alignSelf:'center',marginTop:constants.vh(40)}}>
                    <ButtonWithOutIcon 
                        buttonName={"Reset"}
                        onPress={()=>this.changePassword()}
                    />
                </View>
            </View>
        )
    }

    showMsg(){
        if(this.props.err){
            //ToastAndroid.showWithGravity(this.props.err, ToastAndroid.SHORT, ToastAndroid.TOP);
            this.props.removeError();
        }else if(this.props.success){
            //ToastAndroid.showWithGravity(this.props.success, ToastAndroid.SHORT, ToastAndroid.TOP);
            setTimeout(() => {
                this.props.navigation.navigate("SocialLoginScreen");
              }, 2000);
              this.props.removeError();
        }
        
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                    <ScrollView>
                        {this.renderView()}
                        {this.showMsg()}
                    </ScrollView>
                    {this._loadLoader()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.screen_color
    },
    inputBox:{
        marginTop:20,
        alignSelf:'center',
        width:constants.width*0.7,
    },
    form:{
        marginBottom:constants.vh(10),
        justifyContent:'center',
        width:constants.width*0.8,
        alignSelf:"center",
        marginTop:constants.vh(150),
        backgroundColor:constants.Colors.color_WHITE,
        //backgroundColor:'rgba(255,255,255,0.9)',
        //borderRadius:constants.vw(10),
        paddingBottom:20,
        //elevation:5,
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
    clearOTP:()=>dispatch({type:'CLEAR_OTP'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);