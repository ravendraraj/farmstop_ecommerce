import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert} from 'react-native'
import {connect} from 'react-redux'
import {ButtonWithIcon} from '../customElement/button'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'

class shippingAddress extends Component{
    openForm(){
        if(this.props.userId !=""){
            this.props.navigation.navigate("AddNewAddress");
        }else{
            this.props.navigation.navigate("SocialLogin");
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <ButtonWithIcon onPress={()=>this.openForm()} buttonName={"Add New Address"}/>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE,
        padding:10
    },
    inputBox:{
        marginTop:20
    }
})

const mapStateToProps = state => ({
    userId : state.data.authUserID,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    otpForsignup: data =>dispatch(sendSignUpOtp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(shippingAddress);