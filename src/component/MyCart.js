import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions,ToastAndroid ,TextInput,StatusBar} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import {checkCouponCode ,getDeliveryDate,getCartItem,deleteItem ,setVariationInCart,setQtyInCart,setCartItemLocal,checkOut} from '../lib/api'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,PrimaryTextInput,EmptyComp} from '../customElement/Input'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {Picker} from '@react-native-community/picker';
//navigation function
import { navigate } from '../appnavigation/RootNavigation'
import RazorpayCheckout from 'react-native-razorpay';
import {razor_api_key} from '../constants/key';
import {TextHeading} from '../customElement/Input'

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
            let deliveryCharges = ( this.props.shippingCost== null ? 0 :this.props.shippingCost);
            deliveryCharges = (subtotal >= this.props.freeDeliveryAt) ? 0 :deliveryCharges; 
            let discount = this.state.discount;
            let total = subtotal+tax;
            // if(subtotal >0){
                return(
                    <View style={styles.checkoutBtn}>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly'}}onPress={()=>this.checkProceed()}>
                            <Text style={[styles.checkout]}>CHECKOUT </Text>
                            <Text style={styles.checkout}> Rs. {total} </Text> 

                        </TouchableOpacity>
                    </View>
                    
                )
        }
    }

    checkProceed(){
        let subtotal = this.props.subtotal;
        if(subtotal >= this.props.minPurchase){ 
                this.props.getDeliveryDate();
                if(this.props.authUserID != null && this.props.authUserID != "" && this.props.shippingAddress != ""){
                    let tax = 0;
                    let deliveryCharges = this.state.deliveryCharges;
                    let discount = this.state.discount;
                    let total = subtotal+parseFloat(deliveryCharges)+tax;
                    let userType = "";
                    this.props.navigation.navigate("PaymentOption");
                }else{
                    if(this.props.authUserID == null || this.props.authUserID == "" ){
                        
                        this.props.navigation.navigate('SocialLogin', {
                            screen_name: "MyCart",
                        });

                    }else if(this.props.shippingAddress == ""){
                        this.props.navigation.navigate('ShippingAddress', {
                            screen_name: "cart",
                        });
                    }
                }
            }else{
              Alert.alert(
              'Farmstop',
              'Please order more or equal to '+this.props.minPurchase,
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('OkPressed'),
                },
              ],
              { cancelable: false }
            );
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
        
        if(parseInt(prod.selectedQty) >= 1){
            var data = [];
            data["prod_id"] = prod.prod_id;
            data["selectedVariationID"] = prod.selectedVariationID;
            data["qty"] = prod.selectedQty;
            data["typeOfAction"] = typeaction;

            await this.props.setQtyInCart(data);
            await this.props.setCartItemLocal();
            
            //refresh coupon on updated cart
            if(this.props.coupon_value !=""){
                this.props.refreshCouponCode();
            }

        }else{
            ToastAndroid.showWithGravity("Quantity of product not become 0", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    async setVariationType(variationValue, prod_id ,selectedVariationID,oldSelectedPrice){
        
        
        let find = false;
        let descOfDuplicateItem = ''
        this.props.cartData.map(item=>{
                if(item.prod_id == prod_id && item.selectedQtyVariation == variationValue)
                {
                    find = true;
                    descOfDuplicateItem =fristLetterCapital(item.attribute_name)+"-"+item.selectedQtyVariation;
                }
        });

        if(!find){
            var data = [];
            data["prod_id"] = prod_id;
            data["variationValue"] = variationValue;
            data["selectedVariationID"] =selectedVariationID;
            data["oldSelectedPrice"] = oldSelectedPrice;

            await this.props.setVariationInCart(data);
            await this.props.setCartItemLocal();
                    //refresh coupon on updated cart
            if(this.props.coupon_value !=""){
                this.props.refreshCouponCode();
            }

        }else{
            ToastAndroid.showWithGravity(descOfDuplicateItem+" is already in your cart.", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    variationOpt = (variation) =>{
        
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.varition} key={index} value={item.varition}  />)
        }));
    }   

    async deleteItem(prod_id , selectedVariationID, cart_item_id,cart_id){
        
        var data = [];
        data["id"] = prod_id;
        data["variationId"] = selectedVariationID;
        data["cart_item_id"] =cart_item_id;
        data["cart_id"] = cart_id;

        await this.props.deleteItem(data); 
        this.props.setCartItemLocal();

        //refresh coupon on updated cart
        if(this.props.coupon_value !=""){
            this.props.refreshCouponCode();
        }

    } 

    renederItemType () {
        let ItemList = this.props.cartData;
        
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 8
        };

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
                                <View style={{flexDirection:'row'}}>
                                <Text style={{width:'80%',fontSize:constants.vw(14),fontFamily:constants.fonts.Cardo_Bold,marginLeft:5,marginBottom:4}}>
                                    {fristLetterCapital(item.attribute_name)}
                                </Text>
                                <View style={{flex:1,width:'20%'}}>
                                    <TouchableOpacity style={{position:'absolute',top:0,right:0,zIndex:1}} onPress={()=>this.deleteItem(item.prod_id ,item.selectedVariationID,item.cart_item_id,item.id)}>
                                        <Icon 
                                            name="trash-o"
                                            color={constants.Colors.color_BLACK}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                                </View>
                                <View style={{borderWidth:1,borderColor:constants.Colors.color_lineGrey,marginLeft:5,marginBottom:5,marginTop:15}}>
                                    <Picker
                                        selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                        // mode="dropdown"
                                        style={{height: 50,marginTop:-10,marginBottom:-10,fontFamily:constants.fonts.Cardo_Bold}}
                                        onValueChange={ (value) => ( this.setVariationType(value,item.prod_id ,item.selectedVariationID,item.selectedQtyPrice))}
                                        >
                                        {/**<Picker.Item label="Select" value="Select"  />*/}
                                        { this.variationOpt(item.variation_details) }
                                    </Picker>
                                </View>

                                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:20}}>
                                    <Text style={{flex: 1, flexWrap: 'wrap',fontSize:constants.vw(16),fontFamily:bold,paddingLeft:10}}>
                                        Rs. {item.selectedVariationPrice}
                                    </Text>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={{marginRight:8,marginLeft:5,marginTop:-4}}
                                        onPress={()=>this._manageCartProdQty(item,'remove')}>
                                            <Material 
                                                name="minus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={constants.vw(25)}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{fontSize:constants.vw(16),fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:1}</Text>
                                        <TouchableOpacity style={{marginLeft:8,marginTop:-4}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                            <Material 
                                                name="plus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={constants.vw(25)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
                    <View style={{height:100}}/>
                 }
                
                />
                </View>
            )
        }else{
            return(
                <View style={{width:'96%',alignSelf:'center'}}>
                <EmptyComp imageName={constants.image.emptyCart}
                    welcomText={"Oops! Your cart seems empty."}
                    redirectText={"Shop Now"}
                    onPress={()=>this.props.navigation.navigate("MainHome")}
                />
                </View>
            )
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                        <View style={styles.MainContainer}>
                            
                            {this._loadLoader()}
                            {this.renederItemType()}
                            {this.renederCartDetails()}
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
      flex: 1,
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
        paddingLeft:10,
        paddingRight:10,
		fontFamily:regular
    },

    checkout:{
        fontFamily:constants.fonts.Cardo_Bold, 
        textAlign:'center',
        color: constants.Colors.color_WHITE,
		fontSize:constants.vw(18),
        padding:5
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
        borderRadius:2,
        elevation:4,
        padding:10,
        marginBottom:10,
    },
    checkoutBtn:{
        width:'100%',
        backgroundColor:constants.Colors.color_btn,
        position:'absolute',
        bottom:0,
        zIndex:1,
        elevation:60,
        padding:7
    },
    mainHeading:{
        fontSize:20,
        color:constants.Colors.color_heading,
        fontFamily:italic,
        paddingLeft:15,
    },
    headContainer:{
        // backgroundColor:constants.Colors.color_lineGrey,
        paddingLeft:10
    },
    deleteIcon:{
        width:20,
        height:20
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
    coupon_id: state.data.coupon_id,
    freeDeliveryAt:state.data.freeDilveryAt,
    minPurchase:state.data.minPurchase,
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
    checkOut:(data)=>dispatch(checkOut(data)),
    deleteItem:(data)=>dispatch(deleteItem(data)),
    getDeliveryDate:()=>dispatch(getDeliveryDate()),
    refreshCouponCode:()=>dispatch({type:'COUPON_CODE_REFRESH'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
