import React, { Component } from 'react'
import { View, Image,Text, Alert,ToastAndroid,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import SocialLink from './SocialLinks'
import HTML from 'react-native-render-html'
//helper function
import {fristLetterCapital,removeTags,replaceAllSpace} from '../lib/helper'
import { ScrollView } from 'react-native-gesture-handler';
import {navigate} from '../appnavigation/RootNavigation'
import {Picker} from '@react-native-community/picker';
import Swiper from 'react-native-swiper'
import {setWishListItemOnServer ,addItemToCart,setCartItemLocal} from '../lib/api'
import {Loader} from '../customElement/Loader'
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class KnowMore extends Component {
    constructor(props){
        super(props)
        // this.props.getItem();
        this.state={
            my_wish:'heart-outline',
            wishProdId:null,
            wishProdType:null,
        }
    }

    componentDidMount(){
        //console.log("I am Call")
        //this.props.getItemVariation({start:0,end:((totalprod-1)*2)});
    }

    _manageProdQty = (prod ,typeaction ,variationId)=>{
        if(variationId !=""){
            this.props.manageQty({prodId:prod,typeOfAct:typeaction ,screen:this.props.screen});
        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    _onShare = async(content,imageUrl)=>{
        this.props.startLoader();
        let appUrl = "https://play.google.com/store/apps/details?id=com.farmstop&hl=it";
        let webUrl = "https://www.farmstop.in/";
            
        RNFetchBlob.fetch('GET',replaceAllSpace(imageUrl)).then(resp => {
            this.props.disableLoader();
            let base64image = resp.data;
            shareProduct('data:image/png;base64,' + base64image);
        }).catch(err =>{
            errorHandler(err);
            this.props.disableLoader();
        });

        const shareProduct=(base64image)=>{
            let shareOptions = {
                title: 'Farmstop',
                url: base64image,
                message: "Buy fresh organic vegetables ,fruits, veggies and etc. "+appUrl,
                subject: 'https://www.farmstop.in/',
                showAppsToView:true
              };

            Share.open(shareOptions).then(res => {
                console.log(res);
            }).catch(err => {
                err && console.log(err);
            });
        };
    }
    
    async _addInCart(prodTypeId,variationId ,selectedQty,selectedVariationPrice){
        let existProd = false;
        this.props.cart.map( cartItems=>{
            if(prodTypeId == cartItems.prod_id && variationId == cartItems.selectedVariationID)
            {
                existProd = true;
            }
        })
        // console.log(existProd,prodTypeId,variationId ,selectedQty)
        if(variationId !=""){
            // this.props.addToCart({prodId:prodTypeId ,screen:this.props.screen});
            if(!existProd)
            {
                var data = [];
                data["id"] = prodTypeId;
                data["variationId"] = variationId;
                data["screen"] = this.props.screen;
                data["qty"] = selectedQty;
                data["selectedVariationPrice"]= selectedVariationPrice;
                await this.props.addItemToCart(data);
                this.props.setCartItemLocal();
            }else{
                ToastAndroid.showWithGravity("This Product is already in your cart", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
        // navigate("MyCart");
    }

    _addProd(prodId){
        //Alert.alert("addProd"+prodId)
        this.props.addToCart(prodId);
    }

    _addinWishList = prod => {
        // data.isMyWish =! "heart" ? "heart-outline": "heart";
        if(this.props.authEmail != "" || this.props.authMobile != ''){
            var data = [];
                data["id"] = prod.id;
                data["screen"] = this.props.screen;
            this.props.setWishListItemOnServer(data); //save in server
            // this.props.addInWish(prod.id);
            
            // if(this.props.screen == "Search"){
            //     this.props.addSearchItemInWish(prod.id);
            // }

        }else{
            ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    _removeProd(prodId){
        //Alert.alert("removeProd"+prodId)
        this.props.removeFromCart(prodId);
    }

    setVariationType(variationValue, prod_id){
        //ToastAndroid.showWithGravity(variationValue+" - "+prod_id, ToastAndroid.SHORT, ToastAndroid.TOP);
        //this.props.selectProdVariation({prod_id:prod_id ,value:variationValue});
        this.props.selectProdVariation({ prod_id: prod_id, value: variationValue ,screen: this.props.screen});
    }
    
    variationOpt = (variation) =>{
        
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.varition} key={index} value={item.varition}  />)
        }));
    }

    _swiper(){
        var i=0;
        return(
            this.props.itemtypeData.map((item,id)=>{
                if(this.props.prodId != item.id && i++ < 6){
                    return (
                        <View style={styles.prodBlock} key={id}>
                            <View style={{width:constants.width*0.4,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>{this._knowMore(item.id)}}>
                                    <Image style={styles.imageThumbnail} source={{ uri:replaceAllSpace(prod_variation_url+(item.fimage)) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{width:constants.width*0.4,justifyContent:'center',alignItems:'center'}}>
                                <View>
                                <Text style={styles.sliderTextComp}>Farm Fresh</Text>
                                <Text style={styles.sliderTextProd}>{fristLetterCapital(item.attribute_name)}</Text>
                                <Text style={styles.sliderTextPrice}>Rs.{item.price}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            })
        )
    }

    renederItemType () {
        let ItemList = null;
        
        if(this.props.screen == "Search"){
            ItemList = this.props.searchProductList
        }else{
            ItemList = this.props.itemtypeData
        }

        let prodId = this.props.prodId;
     
        if(ItemList != "undefined" && ItemList !=null && prodId != null){
            // let producName = ItemList[0].pname;
            let prodDetails = ItemList.find((item) => item.id === prodId);
            // let prodDesc = prodDetails.long_description != '' ? prodDetails.long_description : 'Not Available.';

            if((this.props.authUserId !="" || this.props.authUserId !=null) && prodDetails.isMyWish == ''){
                prodDetails.isMyWish = 'heart-outline';
            }

            let description = "<p> "+prodDetails.long_description+" </p>";

            let imageUrl = prod_variation_url+prodDetails.fimage;

            return(
                <View style={{width:'95%',alignSelf:'center',marginTop:constants.vh(30)}}>
                    <Text style={{fontSize:constants.vw(20),textAlign:'center',fontFamily:bold,}}>{fristLetterCapital(prodDetails.attribute_name)}</Text>
                    <View style={{alignSelf:'center'}}>
                        {(this.props.authUserId !="")?(<TouchableOpacity style={styles.wishIconBox}
                            onPress={()=>this._addinWishList(prodDetails)}>
                                <Material name={prodDetails.isMyWish} color={constants.Colors.color_grey} size={22}/>
                            </TouchableOpacity>):(<View/>)}
                        <Image source={{uri:replaceAllSpace(prod_variation_url+(prodDetails.fimage))}} style={styles.singleImg}/>
                    </View>
                    
                        <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                            <TouchableOpacity
                                onPress={()=>{this._onShare(prodDetails.long_description,imageUrl)}}
                                style={{flexDirection:'row'}}
                            >
                                <Material style={{ marginRight: 2 }} name={"share-variant"} size={constants.vw(16)} color={constants.Colors.color_heading} />
                                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(16),color:constants.Colors.color_heading}}>Share</Text>
            
                            </TouchableOpacity>
                        </View>

                        <View style={{width:'85%',alignSelf:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>

                            <View style={{borderWidth:1,borderColor:constants.Colors.color_lineGrey,marginLeft:5,marginBottom:5,marginRight:15}}>
                                <Picker
                                    selectedValue = {prodDetails.selectedVariationID == ""? "": prodDetails.selectedQtyVariation}
                                    // mode="dropdown"
                                    style={{height: 50, width: 110,marginTop:0,fontFamily:constants.fonts.Cardo_Bold,marginTop:-10,marginBottom:-10}}
                                    onValueChange={ (value) => ( this.setVariationType(value,prodDetails.id))}
                                >
                                    { this.variationOpt(prodDetails.variation_details) }
                                </Picker>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginRight:5}} 
                                onPress={()=>this._manageProdQty(prodId,'remove',prodDetails.selectedVariationID)}>
                                    <Material 
                                        name="minus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <Text style={{fontSize:20,fontFamily:regular}}>{prodDetails.selectedQty > 0 ?prodDetails.selectedQty:"Select"}</Text>
                                <TouchableOpacity style={{marginLeft:5}} 
                                onPress={()=>this._manageProdQty(prodId,'add',prodDetails.selectedVariationID)}>
                                    <Material 
                                        name="plus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                            <Text style={{fontFamily:bold,fontSize:18,paddingLeft:3}}>Rs. {prodDetails.selectedQtyPrice}</Text>
                            <View>
                            {prodDetails.inventory_status == 0?(<TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_btn,justifyContent:'center',borderRadius:4,height:30,paddingTop:5,paddingLeft:15,paddingRight:15}}
                                onPress={()=>this._addInCart(prodId,prodDetails.selectedVariationID,prodDetails.selectedQty,prodDetails.selectedVariationPrice)}>
                                <Material name="cart" size={18} color={constants.Colors.color_WHITE}/>
                                <Text style={{fontSize:15,fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_WHITE}}>Add to Cart</Text>
                            </TouchableOpacity>) :(<Text style={{...styles.prodLabel,fontSize:16}}>Out Of Stock</Text>)}
                            </View>
                        </View>
                        </View>

                    {prodDetails.long_description != '' ?(<View style={{alignSelf:'center',justifyContent:'flex-start',marginTop:30,marginBottom:-30,width:'100%'}}>
                        {/*<Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16}}>Description :</Text>*/}
                        {/*<Text style={{fontFamily:constants.fonts.Cardo_Italic,fontSize:16}}>{removeTags(prodDetails.long_description)}</Text>*/}
                    <Text style={{fontSize:18,marginBottom:-10,fontFamily:constants.fonts.Cardo_Bold}}>Description</Text>
                        <HTML html={description}
                                tagsStyles={{p:styles.tagLayout}}
                        />
                    </View>):<View/>}
                    {(this.props.itemtypeData).length>1?(
                    <View>
                        <Text style={{fontSize:18,fontFamily:bold,marginTop:constants.vh(60),marginBottom:constants.vh(20)}}>Recommended Products</Text>
                        <View style={styles.wrapper}>
                            <Swiper  loop={true} autoplay={true} autoplayDirection={true} autoplayTimeout={6} scrollEnabled={true}>
                                {this._swiper()}
                            </Swiper>
                        </View>
                    </View>
                    ):(<View/>)}

                    <View style={{alignSelf:'center',justifyContent:'flex-start',marginTop:30}}>
                        <Text style={{fontSize:constants.vw(25),fontFamily:bold}}>Know your source</Text>
                        <Text style={{fontSize:20,fontFamily:regular}}>check out our farms and follow us on</Text>
                        <SocialLink size='25'/>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>Not found</Text>
                </View>
            )
        }
    }
    
    _knowMore(prod_id){
        this.props.knowMore({prodId:prod_id, screen:"ProductType"});
        navigate("knowMoreProd");
    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView>
                    {this.renederItemType()}
                </ScrollView>
                {this._loadLoader()}
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
      justifyContent: 'center',
      flex: 1,
      padding: 10,
    },
    singleImg: {
      alignItems: 'center',
      // width:constants.vw(130),
      // height:constants.vw(130),
      // resizeMode:'contain',

      width:constants.width*0.9,
      height:constants.width*0.9,
      resizeMode:'contain',
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        margin:1
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constants.Colors.color_WHITE,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width:constants.vw(120),
      height:constants.vw(110),
      resizeMode:'contain',
    },
    sliderTextComp:{
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_grey
    },
    sliderTextProd:{
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Bold,
        color:"#357c2a"
    },
    sliderTextPrice:{
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Bold,
        color:"#357c2a"
    },

    prodBlock:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    wrapper:{
        width:"100%",
        height:constants.vw(200),
        borderRadius:4,
        elevation:10,
        backgroundColor:"white",
    },
    tagLayout:{
        fontSize:constants.vw(18),
        fontFamily:constants.fonts.Cardo_Regular,
    },
    prodLabel:{
        fontSize:constants.vw(14),
        fontFamily:constants.fonts.Cardo_Bold,
        marginLeft:5,
        marginBottom:4
    },
    wishIconBox:
    {
        position:'absolute',
        top:10,
        right:10,
        zIndex:4,
        padding:2,
        backgroundColor:constants.Colors.color_WHITE,
        width:28,
        height:28,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:14,borderWidth:1,borderColor:constants.Colors.color_WHITE,elevation:6
    },
  });

const mapStateToProps = state => ({
    animate : state.indicator,
    itemtypeData :state.data.productVatiation,
    prodId:state.data.knowMoreProdId,
    screen:state.data.screen,
    authEmail :state.data.authEmail,
    authMobile :state.data.authMobile,
    searchProductList: state.data.searchProductList,
    cart: state.data.addedItems,
    authUserId:state.data.authUserID,

});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
    disableLoader:()=>dispatch({type:'ERROR_SUBMIT'}),
    startLoader:()=>dispatch({type:'LOADING'}),
    addItemToCart :(data)=> dispatch(addItemToCart(data)),
    setCartItemLocal:()=>dispatch(setCartItemLocal()),

    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    manageQty:(data) =>dispatch({type:'ADD-PROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct ,screen:data.screen}),
    addInWish:(data) => dispatch({type:'ADD-WISH', activeProdId:data}),
    selectProdVariation: (data) => dispatch({ type: "SET_PRODUCT_VARIATION", prod_id: data.prod_id, variation: data.value, screen: data.screen }),
    addSearchItemInWish :(data)=>dispatch({type:'SEARCH-PROD-ADD-WISH',activeProdId:data}),
    setWishListItemOnServer : (data)=>dispatch(setWishListItemOnServer(data)),
    knowMore:(data)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:data.prodId,screen:data.screen}),
});

export default connect(mapStateToProps, mapDispatchToProps)(KnowMore);
