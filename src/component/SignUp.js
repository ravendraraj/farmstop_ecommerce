import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert,StatusBar, ImageBackground,SafeAreaView} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput} from '../customElement/Input'
import {ButtonWithOutIcon} from '../customElement/button'
import {TouchableOpacity,ScrollView} from 'react-native-gesture-handler';
import constants from '../constants'
import {generateOtp,mobileNoValidations,emailValidations,showErrorMsg,fullNameValidations,passwordValidations} from '../lib/helper'
import {sendSignUpOtp} from '../lib/api'
import {Loader} from '../customElement/Loader'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            username:'',
            password:'',
        }
    }

    sendOtpForSignUp(){
        let email =this.state.email;
        let username =this.state.username;
        let password =this.state.password;
        
        let name = false;
        let isCorrectEmail = false;
        let isCorrectPass = false;

        if(passwordValidations(password)){
            isCorrectPass = true;
        }

        if(fullNameValidations(username)){
            name = true;
        }else{
            console.log("username",false);
        }

        if(emailValidations(email)){
            isCorrectEmail = true;
        }else if(mobileNoValidations(email)){
            isCorrectEmail = true;
        }else{
            console.log("email",false);
        }

        if(isCorrectEmail && name && password !=''){
            let otp = generateOtp();
            this.props.otpForsignup({username:username, email:email ,password:password,otp:otp});
        }else{
            console.log("is correct email"+isCorrectEmail);
            var msg = "Please fill ";
                msg = (name == false) ?((isCorrectEmail == false || isCorrectPass == false)?(msg+"Username,"):(msg+"Username")):(msg+"");
                msg = (isCorrectEmail == false) ?((isCorrectPass == false)?(msg+"Email/Mobile Number"):(msg+"Email/Mobile Number ")):(msg+"");
                msg = (isCorrectPass == false) ?((name == false || isCorrectEmail == false)?(msg+" and Password [Should be contain alphanumeric and special character, minmum length is 6 ]"):(msg+" Password")):(msg+"");
                msg = msg+' correctly.';

            showErrorMsg(msg,'');
        }

    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        } 
    }
    
    render(){
        return(
            // <ImageBackground
            //     style={{flex: 1}}
            //     source={constants.image.commonBg}
            //     resizeMode={'repeat'}
            // >
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                    {/*<StatusBar translucent backgroundColor="transparent" />*/}
                    <ScrollView>
                        <View style={styles.form}>
                            <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(25),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>Welcome To Farmstop</Text>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Username" onChangeText={(text)=>this.setState({username:text})}/>
                            </View>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Email/Mobile Number"  onChangeText={(text)=>this.setState({email:text})}/>
                            </View>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})} onSubmitEditing={()=>this.sendOtpForSignUp()}/>
                            </View>

                            {/*<TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.sendOtpForSignUp()}>
                                                        <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Sign Up</Text>
                                                    </TouchableOpacity>*/}
                            <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(40)}}>
                                <ButtonWithOutIcon 
                                    buttonName={"Sign Up"}
                                    onPress={()=>this.sendOtpForSignUp()}
                                />
                            </View>
                            <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(20)}}>
                                <Text 
                                    onPress={()=>{this.props.navigation.navigate("SocialLoginScreen")}}
                                    style={{
                                        fontSize:constants.vw(16),
                                        fontFamily:constants.fonts.Cardo_Bold,
                                    }}
                                >   
                                    Are you already register?
                                    <Text
                                        onPress={()=>{this.props.navigation.navigate("SocialLoginScreen")}}
                                        style={{
                                            fontFamily:constants.fonts.Cardo_Bold,
                                            color:constants.Colors.color_heading
                                        }}
                                    >
                                        Login Here
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    {this._loadLoader()}
                </SafeAreaView>
            // </ImageBackground>
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
    animate : state.indicator,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    otpForsignup: data =>dispatch(sendSignUpOtp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

