import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions,ToastAndroid } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import {checkCouponCode ,getCartItem} from '../lib/api'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,PrimaryTextInput} from '../customElement/Input'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {Picker} from '@react-native-community/picker';

//navigation function
import { navigate } from '../appnavigation/RootNavigation'

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
        this.props.removeloader();
        
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
        if(this.state.couponCode != ''){
            this.props.checkCouponCode({code:this.state.couponCode});
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
                            <CouponTextInput placeholder="Enter coupon code" value={this.state.couponCode} onChangeText={(text)=>this.setState({couponCode:text})} onSubmitEditing={()=>this.getCouponCodeDetails()}/>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
                            <TouchableOpacity>
                                <Text style={styles.checkout}>Checkout </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.checkout}>Rs. {total} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
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
    _manageCartProdQty = (prod ,typeaction)=>{
        this.props.manageCartQty({prodId:prod,typeOfAct:typeaction});
    }

    setVariationType(variationValue, prod_id){
        console.log(variationValue);
        //ToastAndroid.showWithGravity(variationValue+" - "+prod_id, ToastAndroid.SHORT, ToastAndroid.TOP);
        this.props.selectProdVariation({prod_id:prod_id ,value:variationValue});
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
                renderItem={({ item }) => (
                    <View style={{marginBottom:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                            <View>
                                <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                            </View>
                            <View style={{width:'50%'}}>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{marginRight:8,marginLeft:5}}
                                    onPress={()=>this._manageCartProdQty(item,'remove')}>
                                        <Material 
                                            name="minus-circle-outline"
                                            color={constants.Colors.color_grey}
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                    <Picker
                                        selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                        // mode="dropdown"
                                        style={{height: 50, width: 110,marginTop:-12,fontFamily:constants.fonts.Cardo_Bold}}
                                        onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                                        >
                                        <Picker.Item label="Select" value="Select"  />
                                        { this.variationOpt(item.variation_details) }
                                    </Picker>
                                    {/* <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:1}</Text> */}
                                    <TouchableOpacity style={{marginLeft:8}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                        <Material 
                                            name="plus-circle-outline"
                                            color={constants.Colors.color_grey}
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>{item.selectedQtyVariation} | QTY:{item.selectedQty} </Text>
                                {/**Price section */}
                                {/* <View style={{alignSelf:'center',marginBottom:10,marginTop:10,backgroundColor:'red',width:'100%'}}> */}
                                    <Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>Total- Rs. {item.selectedQtyPrice}</Text>
                                {/* </View> */}

                
                            </View>
                        </View>
                    </View>
                )}

                //Setting the number of column
                numColumns={1}
                ListHeaderComponent={()=>(
                    <View style={{width:'100%',height:20,marginBottom:10}}>
                    </View>
                )}
                ItemSeparatorComponent={()=>(
                    <View style={{alignSelf:'center',height: 2,width: "90%",backgroundColor: "#000",marginBottom:10,
                    backgroundColor:constants.Colors.color_grey}}>
                    </View>
                )}
                ListFooterComponent={()=>(
                    this.renederCartDetails()
                )}
                
                keyExtractor={(item) => item.id}
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
                            <View>
                                <Text style={{fontSize:18,color:constants.Colors.color_heading,fontFamily:italic,paddingLeft:15}}>
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
        color: constants.Colors.color_intro,
		fontSize: 30,
		padding: 20,
		fontFamily:bold
    }
  });

const mapStateToProps = state => ({
    cartData :state.data.addedItems,
    subtotal:state.data.total,
    animate : state.indicator,
    shippingCost :state.data.shippingCharges,
    coupon_msg : state.data.coupon_msg,
    coupon_value : state.data.coupon_value,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId}),
    addToCart :(prodId)=> dispatch({type:'ADD_TO_CART',id:prodId}),
    manageCartQty:(data) =>dispatch({type:'MANAGE-CART-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
    selectProdVariation :(data)=>dispatch({type:"SET_PRODUCT_VARIATION",prod_id:data.prod_id, variation:data.value}),
    checkCouponCode :(data)=>dispatch(checkCouponCode(data)),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
