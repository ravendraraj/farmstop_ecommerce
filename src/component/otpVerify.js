import React,{Component} from 'react'
import {View ,Text,StyleSheet,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {navigate} from '../appnavigation/RootNavigation'
import {signUpManual} from '../lib/api'

class otpVerify extends Component{
    constructor(props){
        super(props);
        this.state={
            otp :''
        }
    }

    verifyRegOtp(){
        if(this.props.otp != 'Undefined')
        {
            console.log(this.state.otp+" "+this.props.otp)
            if(this.state.otp !=''){
            if(this.state.otp == this.props.otp)
            {
                ToastAndroid.showWithGravity("OTP Verified", ToastAndroid.SHORT, ToastAndroid.CENTER);
                this.props.signUpManual();
            }
        }else{
            ToastAndroid.showWithGravity("Please Enter Vaild OTP", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        }
    }

    verifyOtp(){
            return(
                <View style={{width:'80%',alignSelf:"center"}}>
                            <TextHeading title="Verify your mobile" fontsize={25}/>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Your OTP" onChangeText={(text)=>this.setState({otp:text})}/>
                            </View>
                            <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.verifyRegOtp()}>
                                <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
            )
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.verifyOtp()}  
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
    otp :state.data.Otp,
});

const mapDispatchToProps = dispatch => ({
    signUpManual: () => dispatch(signUpManual()),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(otpVerify);

