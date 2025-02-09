import React, { Component } from 'react'
import { View, Image,Text, Alert,ToastAndroid,StyleSheet,TouchableOpacity,Dimensions,StatusBar } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import SocialLink from './SocialLinks'
import HTML from 'react-native-render-html'
//helper function
import {fristLetterCapital,removeTags} from '../lib/helper'
import { ScrollView } from 'react-native-gesture-handler';
import {navigate} from '../appnavigation/RootNavigation'
import {Picker} from '@react-native-community/picker';
import Swiper from 'react-native-swiper'
import {setWishListItemOnServer ,addItemToCart,setCartItemLocal} from '../lib/api'
import {Loader} from '../customElement/Loader'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class BasketScreen extends Component {
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
                data["screen"] = "basketScreen";
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
                                    <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
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
        let ItemList = this.props.baskets
        let prodId = this.props.route.params.basketId;
     
        if(ItemList != "undefined" && ItemList.length>0){
            let prodDetails = ItemList.find((item) => item.id === prodId);
            let shortDesc = " <p> "+prodDetails.short_description+" </p>";
            return(
                <View style={{width:'95%',alignSelf:'center',marginTop:constants.vh(30)}}>
        
                    <View style={{alignSelf:'center'}}>
                        <Image source={{uri:(prod_variation_url+(prodDetails.fimage).replace(/ /gi, "_"))}} style={styles.singleImg}/>
                    </View>
                    
                        <View style={{width:'85%',alignSelf:'center'}}>

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                            <Text style={{fontFamily:bold,fontSize:18,paddingLeft:3}}>Rs. {prodDetails.price}</Text>
                            <View>
                            {prodDetails.inventory_status == 0?(<TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_btn,justifyContent:'center',borderRadius:4,height:30,paddingTop:5,paddingLeft:15,paddingRight:15}}
                                onPress={()=>this._addInCart(prodId,prodDetails.selectedVariationID,prodDetails.selectedQty,prodDetails.selectedVariationPrice)}>
                                <Material name="cart" size={18} color={constants.Colors.color_WHITE}/>
                                <Text style={{fontSize:15,fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_WHITE}}>Order Now</Text>
                            </TouchableOpacity>) :(<Text style={{...styles.prodLabel,fontSize:16}}>Out Of Stock</Text>)}
                            </View>
                        </View>
                        </View>

                    <View style={{marginTop:20}}>
                    <Text style={{fontSize:constants.vw(20),fontFamily:bold,}}>{fristLetterCapital(prodDetails.attribute_name)}</Text>
                    <Text style={{...styles.prodLabel,fontSize:18}}>Description</Text>
                    {prodDetails.short_description != '' ?(<View style={{alignSelf:'center',justifyContent:'flex-start',paddingLeft:20,marginTop:10,width:'100%'}}>
                        <HTML html={shortDesc}
                                tagsStyles={{p:styles.tagLayout}}
                        />
                    </View>):<View/>}
                    {prodDetails.long_description != '' ?(<View style={{alignSelf:'center',justifyContent:'flex-start',marginTop:10,marginBottom:-30,width:'100%'}}>
                        {/*<Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16}}>Description :</Text>*/}
                        {/*<Text style={{fontFamily:constants.fonts.Cardo_Italic,fontSize:16}}>{removeTags(prodDetails.long_description)}</Text>*/}
                        <HTML html={prodDetails.long_description}
                                tagsStyles={{p:styles.tagLayout,li:styles.tagLayout}}
                        />
                    </View>):<View/>}
                    </View>

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
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
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
        fontSize:constants.vw(16),
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
    baskets:state.data.baskets

});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
    
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

export default connect(mapStateToProps, mapDispatchToProps)(BasketScreen);
