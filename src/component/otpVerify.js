import React,{Component} from 'react'
import {View ,Text,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'

class otpVerify extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    verifyOtp(){
            return(
                <View style={{width:'80%',alignSelf:"center"}}>
                            <TextHeading title="Verify your mobile" fontsize={25}/>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Your OTP"/>
                            </View>
                            <TouchableOpacity style={{alignSelf:'center',marginTop:40}}>
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
    otp :state.data.otpVerification,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(otpVerify);

