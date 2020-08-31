import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {generateOtp} from '../lib/helper'
import {sendSignUpOtp} from '../lib/api'

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

        if(email !='' && username !='' && password !=''){
            let otp = generateOtp();
            this.props.otpForsignup({username:username, email:email ,password:password,otp:otp});
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

    render(){
        return(
            <View style={styles.container}>
                <TextHeading title="Welcome To Farmstop"/>
                <ScrollView>
                    <View style={{width:'80%',alignSelf:"center",marginTop:constants.vh(20)}}>
                        <View>
                            <PrimaryTextInput placeholder="Enter Username" onChangeText={(text)=>this.setState({username:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Email/Mobile Number"  onChangeText={(text)=>this.setState({email:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})} onSubmitEditing={()=>this.sendOtpForSignUp()}/>
                        </View>
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.sendOtpForSignUp()}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    otpForsignup: data =>dispatch(sendSignUpOtp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

