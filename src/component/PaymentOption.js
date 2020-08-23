import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert,SafeAreaView,Image,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'
import image from "../constants/Image"
import RadioButton from '../customElement/RadioButton'
import RazorpayCheckout from 'react-native-razorpay'
import {razor_api_key} from '../constants/key'
import {checkOut,checkOutOnCOD} from '../lib/api'
import {Loader} from '../customElement/Loader'

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

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

    _showAddress(id){
        if(this.props.addressList.length >0){
            let address = this.props.addressList.find(item => item.id === id);
            return(
                <View style={{marginTop:constants.vh(10),marginBottom:constants.vh(10)}}>
                    <Text style={styles.text}>{address.address}{address.district},{address.zipcode},{address.country}</Text>
                </View>
            )
        }
    }

    _renderView(){
            let subtotal = this.props.subtotal;
            let tax = 0;
            let deliveryCharges = this.props.shippingCost;
            let discount = this.props.coupon_value !=""?parseFloat(this.props.coupon_value):0;
            let total = subtotal+parseFloat(deliveryCharges)+tax-discount;
            return(
                    <View style={{flex:1,alignSelf:'center',width:"90%"}}>
                        <ScrollView>
                        <View style={{}}>
                            <View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.heading}>Delivery Address</Text>
                                    <View>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ShippingAddress",{screen_name:'PaymentOption'})}}>
                                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16,color:constants.Colors.color_intro}}>Change</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                {this._showAddress(this.props.defaultShipingAddress)}
                            </View>
                            <View style={{marginTop:constants.vh(10)}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.heading}>Saved Email Address</Text>
                                    <View>
                                    { this.props.authEmail !="" ?(<View/>):(
                                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("EditProfile",{screen_name:'PaymentOption'})}}>
                                            <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16,color:constants.Colors.color_intro}}>+ Add</Text>
                                        </TouchableOpacity>
                                        )
                                    }
                                    </View>
                                </View>
                                <View style={{marginTop:10,marginBottom:10}}>
                                    <Text style={styles.text}>{this.props.authEmail !=""?this.props.authEmail:"Add Email Id"}</Text>
                                </View>
                            </View>
                            <Text style={[styles.heading,{marginBottom:constants.vh(10),marginTop:constants.vh(10)}]}>Payment Method</Text>
                            <View style={styles.prodBlock}>
                                <View style={{flexDirection: 'row', justifyContent:'space-evenly',paddingTop:10}}>
                                    <View style={{width:'20%'}}><RadioButton  checked={this.state.option1} onPress={()=>this._radioHandler()}/></View>
                                    <View style={{width:'60%'}}><Image source={constants.image.razorpay} style={{width:constants.vw(200),height:constants.vw(50),marginTop:-12}}/></View>
                                </View>
                                
                                <View style={{flexDirection: 'row', justifyContent:'space-evenly',marginTop:20,marginBottom:10}}>
                                    <View style={{width:'20%'}}><RadioButton  checked={this.state.option2} onPress={()=>this._radioHandler()}/></View>
                                    <View style={{width:'60%'}}><Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Bold,marginTop:-5}}> Cash on Delivery</Text></View>
                                </View>
                            </View>
                            <View style={{marginTop:constants.vh(10)}}>
                                <View style={styles.paymentValue}>
                                    <Text style={styles.text}>Subtotal</Text>
                                    <Text style={styles.textInt}>{this.props.subtotal}</Text>
                                </View>
                                <View style={styles.paymentValue}>
                                    <Text style={styles.text}>Delivery Charges</Text>
                                    <Text style={styles.textInt}>{deliveryCharges}</Text>
                                </View>
                                <View style={styles.paymentValue}>
                                    <Text style={styles.text}>Discount</Text>
                                    <Text style={styles.textInt}>{discount == 0?0:"-"+discount}</Text>
                                </View>
                                <View style={[styles.paymentValue,{marginTop:15}]}>
                                    <Text style={styles.textInt}>Total</Text>
                                    <Text style={styles.textInt}>{total}</Text>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                        <View style={{flex:1, justifyContent:'flex-end',marginTop:30}}>
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
                {this._loadLoader()}
                <View style={{flex:1,width:"98%",alignSelf:'center'}}>
                    {this._renderView()}
                </View>
            </View>
        )
    }


    redirectOnPaymentPage(){

        if(this.props.authUserID != null && this.props.authUserID != "" && this.props.shippingAddress != "" && this.props.authEmail !="" && this.props.authMobile !=""){
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
                    orderDetails['status'] = 0;

                    orderDetails['email'] = this.props.authEmail;
                    orderDetails['contact'] = this.props.authMobile;
                    orderDetails['username'] = this.props.authName;

                    if(this.state.option1 == "select"){

                        orderDetails['paymentOption'] = "4";
                        this.props.checkOut(orderDetails);
                    }else{
                        orderDetails['paymentOption'] = "2";
                        this.props.checkOutOnCOD(orderDetails);
                    }
                    
                    
      }else{
            if(this.props.authUserID == null && this.props.authUserID == "" ){
                this.props.navigation.navigate("NotLogin");
            }else if(this.props.shippingAddress == ""){
                this.props.navigation.navigate('ShippingAddress', {
                    screen_name: "PaymentOption",
                });
            }else if(this.props.authEmail =="" || this.props.authMobile ==""){
                ToastAndroid.showWithGravity("Please Fill email or mobile correctly", ToastAndroid.SHORT, ToastAndroid.TOP);
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
    heading:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:16
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
        width:'98%',
        alignSelf:'center',
        marginBottom:10
    },
    buttonText:{
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:18,
        padding:10,
        color:constants.Colors.color_WHITE
    },
    paymentValue:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16
    },
    textInt:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:16  
    }
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
    coupon_id: state.data.coupon_id,
    defaultShipingAddress:state.data.defaultShipingAddress,
    addressList:state.data.addressList,
    coupon_value:state.data.coupon_value
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
    checkOut:(data)=>dispatch(checkOut(data)),
    checkOutOnCOD:(data)=>dispatch(checkOutOnCOD(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOption);

