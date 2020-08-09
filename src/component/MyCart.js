import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions,ToastAndroid ,TextInput} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import {checkCouponCode ,getCartItem ,setVariationInCart,setQtyInCart,setCartItemLocal,checkOut} from '../lib/api'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,PrimaryTextInput} from '../customElement/Input'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {Picker} from '@react-native-community/picker';

//navigation function
import { navigate } from '../appnavigation/RootNavigation'
import RazorpayCheckout from 'react-native-razorpay';
import {razor_api_key} from '../constants/key';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/100);
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class MyCart extends Component {
    constructor(props){
        super(props);
        this.state={
            subtotal:0,
            deliveryCharges:0,
            discount:0,
            tax:0,
            total:0,
            couponCode:''
        }
    }

    componentDidMount(){
        //console.log("I am Call")
        //this.props.getItemVariation({start:0,end:((totalprod-1)*2)});
        // this.props.removeloader();
        
        if(this.props.shippingCost != null){
            // console.log("dfsfdfdsfsdfdsfdsfsdf");
            this.setState({deliveryCharges:this.props.shippingCost});
        }

        if(this.props.coupon_value != "")
        {
            console.log(this.props.coupon_value + " - coupon code")
            //coupon value reduction
            this.setState({discount: -parseFloat(this.props.coupon_value)});
        }
        
    }


    _getItemType(prod_id){
        Alert.alert("Selected Prod"+prod_id);    
    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }
    
        //add product in cart
    _addInCart(prodCatId_id,Itemid,navigateToCart){
        this.props.addToCart(Itemid);
    
        //When click on add to cart then navigate on cart screen
        if(navigateToCart){
            navigate("MyCart");
        }
    }
    
        //Remove from cart 
    _removeFromCart(prodCatId,itemId){
            this.props.removeFromCart(itemId);
    }

    getCouponCodeDetails(){
        
        let coupon_Code =this.state.couponCode;
        
        if(coupon_Code != ''){
            this.props.checkCouponCode({code:coupon_Code});
            // this.couponCodeText.clear();
        }else{
            ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    renederCartDetails(){
        if(this.props.cartData.length >0){
            let subtotal = this.props.subtotal;
            let tax = 0;
            let deliveryCharges = this.state.deliveryCharges;
            let discount = this.state.discount;
            let total = subtotal+parseFloat(deliveryCharges)+tax;
            // if(subtotal >0){
                return(
                    <View style={{width:'90%',alignSelf:'center',marginTop:30,marginBottom:80}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.fonts}>Sub Total</Text>
                            <Text style={styles.fonts}>{subtotal}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.fonts}>Taxes</Text>
                            <Text style={styles.fonts}>{tax}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.fonts}>Delivery charges</Text>
                            <Text style={styles.fonts}>{deliveryCharges}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.fonts}>Discount</Text>
                            <Text style={styles.fonts}>{discount}</Text>
                        </View>
                        {this.renderCouponMsg()}
                        <Text style={{fontFamily:bold,fontSize:20}}>You have a coupon</Text>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.couponImg} style={{width:60,height:40,marginTop:15}}/>
                            <CouponTextInput placeholder="Enter coupon code" 
                                value={this.state.couponCode}
                                onChangeText={(text)=>this.setState({couponCode:text})}
                                onSubmitEditing={()=>this.getCouponCodeDetails()}/>
                        </View>
                        <View style={{flex:1,alignSelf:'center',width:'90%'}}>
                            {/*<TouchableOpacity onPress={()=>this.redirectOnPaymentPage()}>*/}
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("PaymentOption")}>
                                <Text style={styles.checkout}>Checkout  Rs. {total} </Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
                )
        }
    }
    
    redirectOnPaymentPage(){

        if(this.props.authUserID != null && this.props.authUserID != "" && this.props.shippingAddress != null){
                let subtotal = this.props.subtotal;
                let tax = 0;
                let deliveryCharges = this.state.deliveryCharges;
                let discount = this.state.discount;
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

    renderCouponMsg(){
        if(this.props.coupon_msg !=''){
            let msg = this.props.coupon_msg;
            setTimeout(()=>{this.props.removeCouponMsg()},2000);
            return(
                <View style={{backgroundColor:constants.Colors.color_grey,borderRadius:4}}>
                    <Text style={{color:constants.Colors.color_WHITE, fontSize:12,padding:5}}>{ msg }</Text>
                </View>
            )
        }
    }

    _manageCartProdQty = async (prod ,typeaction)=>{
        
        console.log(prod);
        console.log(prod.selectedQty);
        if(parseInt(prod.selectedQty) >= 1){
            var data = [];
            data["prod_id"] = prod.prod_id;
            data["selectedVariationID"] = prod.selectedVariationID;
            data["qty"] = prod.selectedQty;
            data["typeOfAction"] = typeaction;

            await this.props.setQtyInCart(data);
            await this.props.setCartItemLocal();
        }else{
            ToastAndroid.showWithGravity("Quantity of product not become 0", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    async setVariationType(variationValue, prod_id ,selectedVariationID){
        
        
        let find = false;
        this.props.cartData.map(item=>{
                if(item.prod_id == prod_id && item.selectedQtyVariation == variationValue)
                {
                    find = true;
                }
        });

        if(!find){
            var data = [];
            data["prod_id"] = prod_id;
            data["variationValue"] = variationValue;
            data["selectedVariationID"] =selectedVariationID;

            await this.props.setVariationInCart(data);
            await this.props.setCartItemLocal();
        }else{
            ToastAndroid.showWithGravity("Duplicate item in cart", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    variationOpt = (variation) =>{
        
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.varition} key={index} value={item.varition}  />)
        }));
    }

    renederItemType () {
        let ItemList = this.props.cartData;
        if(ItemList.length > 0){
            return(
                <View>
                <FlatList
                data={ItemList}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <View style={styles.prodBlock}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                            <View style={{alignSelf:'center',marginTop:10}}>
                                <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                            </View>
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize:constants.vw(14),fontFamily:constants.fonts.Cardo_Bold,marginLeft:5,marginBottom:4}}>
                                    {fristLetterCapital(item.attribute_name)}
                                </Text>
                                <View style={{borderWidth:1,borderColor:constants.Colors.color_lineGrey,marginLeft:5,marginBottom:5}}>
                                    <Picker
                                        selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                        // mode="dropdown"
                                        style={{height: 50,marginTop:-10,marginBottom:-10,fontFamily:constants.fonts.Cardo_Bold}}
                                        onValueChange={ (value) => ( this.setVariationType(value,item.prod_id ,item.selectedVariationID))}
                                        >
                                        {/**<Picker.Item label="Select" value="Select"  />*/}
                                        { this.variationOpt(item.variation_details) }
                                    </Picker>
                                </View>

                                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:10}}>
                                    <Text style={{fontSize:constants.vw(18),fontFamily:bold,paddingLeft:10}}>Rs. {item.selectedQtyPrice}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={{marginRight:8,marginLeft:5}}
                                        onPress={()=>this._manageCartProdQty(item,'remove')}>
                                            <Material 
                                                name="minus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={25}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:1}</Text>
                                        <TouchableOpacity style={{marginLeft:8}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                            <Material 
                                                name="plus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={25}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/** new commited<Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>{item.selectedQtyVariation} | QTY:{item.selectedQty} </Text>*/}
                                {/**Price section */}
                                {/* <View style={{alignSelf:'center',marginBottom:10,marginTop:10,backgroundColor:'red',width:'100%'}}> */}
                                {/** new commited<Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>Total- Rs. {item.selectedQtyPrice}</Text>*/}
                                {/* </View> */}

                
                            </View>
                        </View>
                    </View>
                )}

                //Setting the number of column
                numColumns={1}
                ListHeaderComponent={()=>(
                    <View style={{width:'100%',height:1,marginBottom:10}}>
                    </View>
                )}
                
                keyExtractor={(item) => (item.id).toString()}

                ListFooterComponent={
                    this.renederCartDetails()
                }
                
                />
                </View>
            )
        }else{
            return(
                <View style={{alignSelf:'center'}}>
                    <Text style={styles.welcomText}>
                        Not found any product
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (

                <View style={styles.container}>
                        <View style={styles.MainContainer}>
                            <View style={styles.headContainer}>
                                <Text style={styles.mainHeading}>
                                    My Cart
                                </Text>
                            </View>
                            {this._loadLoader()}
                            {this.renederItemType()}
                            {/* {this.renederCartDetails()} */}
                            {/* {this.renederCartDetails()} */}
                        </View>
                </View>
            )
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:constants.Colors.color_WHITE
      },
    MainContainer: {
     // justifyContent: 'center',
      //flex: 1,
      //padding: 10,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width:width/3.5,
      height:width/4,
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        margin:1
    },
    fonts:{
        fontSize:20,
        fontFamily:regular
    },
    welcomText: {
		color: constants.Colors.color_intro,
		textAlign: 'center',
		fontSize: 18,
		padding: 20,
		fontFamily:regular
    },

    checkout:{
        fontFamily:constants.fonts.Cardo_Bold, 
        textAlign:'center',
        color: constants.Colors.color_intro,
		fontSize:constants.vw(20),
		padding: 20,
    },
    
    couponText:{
        fontFamily:constants.fonts.Cardo_Regular,
        paddingTop: constants.vh(25),
        fontSize: constants.vw(18)
    },
    prodBlock:{
        alignSelf:'center',
        width:'95%',
        backgroundColor:"white",
        borderRadius:10,
        elevation:10,
        padding:10,
        marginBottom:10,
    },
    mainHeading:{
        fontSize:20,
        color:constants.Colors.color_heading,
        fontFamily:italic,
        paddingLeft:15,
    },
    headContainer:{
        // backgroundColor:constants.Colors.color_lineGrey,
    }
  });

const mapStateToProps = state => ({
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
    knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId}),
    setQtyInCart:(data)=>dispatch(setQtyInCart(data)),
    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
    setVariationInCart: (data)=>dispatch(setVariationInCart(data)),
    checkCouponCode :(data)=>dispatch(checkCouponCode(data)),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
    setCartItemLocal:()=>dispatch(setCartItemLocal()),
    checkOut:(data)=>dispatch(checkOut(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
