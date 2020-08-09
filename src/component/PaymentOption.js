import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert,SafeAreaView,Image} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'
import image from "../constants/Image"
import RadioButton from '../customElement/RadioButton'
import RazorpayCheckout from 'react-native-razorpay'
import {razor_api_key} from '../constants/key'
import {checkOut} from '../lib/api'

class PaymentOption extends Component{
    constructor(props){
        super(props);
        this.state={
            forget : false,
            emailId :'',
            option1:'select',
            option2:'notselect'
        }
    }

_radioHandler(){
    if(this.state.option1 == "select")
    {
        this.setState({option1:"notselect"})
        this.setState({option2:"select"})
    }else{
        this.setState({option1:"select"})
        this.setState({option2:"notselect"})
    }
}

    _renderView(){
        
            return(
                    <View style={{flex:1,alignSelf:'center',width:"90%",marginTop:constants.vw(10)}}>
                        <TextHeading title="Payment" fontsize={constants.vw(25)}/>
                        
                        <View style={{marginTop:constants.vw(50)}}>
                            <View style={styles.prodBlock}>
                                <View style={{flexDirection: 'row', justifyContent:'space-evenly',paddingTop:10}}>
                                    <RadioButton  checked={this.state.option1} onPress={()=>this._radioHandler()}/>
                                    <Image source={constants.image.razorpay} style={{width:constants.vw(200),height:constants.vw(50),marginTop:-10}}/>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:6}}>
                                    <Image source={constants.image.masterIcon} style={styles.icons}/>
                                    <Image source={constants.image.visaIcon} style={styles.icons}/>
                                </View>
                            </View>

                            <View style={styles.prodBlock}>
                                <View style={{flexDirection: 'row', justifyContent:'space-evenly',marginTop:15,marginBottom:15}}>
                                    <RadioButton  checked={this.state.option2} onPress={()=>this._radioHandler()}/>
                                    <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Bold,marginTop:-8}}> Cash on Delivery</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{flexDirection: 'row', justifyContent:'space-between',marginTop:30}}>
                            <TouchableOpacity style={styles.returnButton} onPress={()=>this._cancelEvent()}>
                                <Text style={styles.buttonText}>Retrun on Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.placeButton} onPress={()=>this.redirectOnPaymentPage()}>
                                <Text style={styles.buttonText}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            )
    }

    _cancelEvent(){
        Alert.alert(
          'Farmstop',
          'Do you want go back',
          [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.navigate("MyCart")
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
          ],
          { cancelable: false }
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        {this._renderView()}
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }


    redirectOnPaymentPage(){

        if(this.props.authUserID != null && this.props.authUserID != "" && this.props.shippingAddress != null){
                let subtotal = this.props.subtotal;
                let tax = 0;
                let deliveryCharges = this.props.shippingCost;
                let discount = 0;
                let total = subtotal+parseFloat(deliveryCharges)+tax;
                let userType = "";
                
                if(this.props.login_type == "MANUAL"){
                    userType = 1;
                }else if(this.props.login_type == "FACEBOOK"){
                    userType = 2;
                }else{
                    userType = 3;
                }

                var orderDetails = [];
                    orderDetails['user_id'] = this.props.authUserID;
                    orderDetails['user_type'] = userType;
                    orderDetails['address_id'] = this.props.shippingAddress;
                    orderDetails['usr_mob'] = this.props.authMobile;

                    orderDetails['subtotal'] = subtotal;
                    orderDetails['shhipingCost'] = deliveryCharges;
                    
                    if(this.props.coupon_id != null){
                        orderDetails['coupon_id'] = this.props.coupon_id;
                    }else{
                        orderDetails['coupon_id'] = "";
                    }

                    orderDetails['total_cost'] = total;
                    orderDetails['paymentOption'] = "";
                    orderDetails['status'] = 0;

                    orderDetails['email'] = this.props.authEmail;
                    orderDetails['contact'] = this.props.authMobile;
                    orderDetails['username'] = this.props.authName;

                    this.props.checkOut(orderDetails);
                
      }else{
            if(this.props.authUserID == null && this.props.authUserID == "" ){
                this.props.navigation.navigate("NotLogin");
            }else if(this.props.shippingAddress == null){
                this.props.navigation.navigate("ShippingAddress");
            }
      }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    icons:{
        width:constants.vw(50),
        height:constants.vw(30),
        marginLeft:6
    },
    prodBlock:{
        alignSelf:'center',
        width:'100%',
        backgroundColor:"white",
        borderRadius:3,
        elevation:10,
        padding:10,
        marginBottom:10,
    },
    returnButton:{
        borderWidth:2,
        borderRadius:10,
        borderColor:"#E42217",
        backgroundColor:"#E42217",
        padding:5
    },
    placeButton:{
        borderWidth:2,
        borderRadius:10,
        borderColor:constants.Colors.color_cartText,
        backgroundColor:"#41A317",
        padding:5,
    },
    buttonText:{
        color:constants.Colors.color_WHITE,
        fontSize:16,
        fontFamily:constants.fonts.Cardo_Bold
    },
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
    cartData :state.data.addedItems,
    subtotal:state.data.total,
    animate : state.indicator,
    shippingCost :state.data.shippingCharges,
    coupon_msg : state.data.coupon_msg,
    coupon_value : state.data.coupon_value,
    authEmail : state.data.authEmail,
    authUserID :state.data.authUserID,
    authMobile :state.data.authMobile,
    authName :state.data.authName,
    shippingAddress : state.data.defaultShipingAddress,
    login_type : state.data.login_type,
    coupon_id: state.data.coupon_id
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
    checkOut:(data)=>dispatch(checkOut(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);

