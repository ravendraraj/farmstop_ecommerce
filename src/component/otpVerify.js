import React,{Component} from 'react'
import {View ,Text,StyleSheet,ToastAndroid,SafeAreaView, ImageBackground,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import {ButtonWithOutIcon} from '../customElement/button'
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
                <View style={styles.form}>
                    <Text style={{color:constants.Colors.color_heading,fontSize:constants.vw(25),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',marginTop:constants.vh(30),marginBottom:constants.vh(10)}}>Welcome To Farmstop</Text>                    
                    <View style={styles.inputBox}>
                        <PrimaryTextInput placeholder="Enter Your OTP" onChangeText={(text)=>this.setState({otp:text})}/>
                    </View>

                    {/*<TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this.verifyRegOtp()}>
                        <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Proceed</Text>
                    </TouchableOpacity>*/}
                    
                    <View style={{width:'90%',alignSelf:'center',marginTop:constants.vh(40)}}>
                        <ButtonWithOutIcon
                            buttonName={"Proceed"}
                            onPress={()=>this.verifyRegOtp()}
                        />
                    </View>

                </View>
            )
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
                        {this.verifyOtp()}  
                    </ScrollView>
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
    otp :state.data.Otp,
});

const mapDispatchToProps = dispatch => ({
    signUpManual: () => dispatch(signUpManual()),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(otpVerify);

