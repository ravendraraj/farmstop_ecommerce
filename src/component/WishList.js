import React, { Component } from 'react'
import { View, Image,Text, ToastAndroid,FlatList,StyleSheet,TouchableOpacity,Dimensions,Alert,StatusBar } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,TextHeading,EmptyComp} from '../customElement/Input'
//helper function
import {fristLetterCapital,replaceAllSpace} from '../lib/helper'
import {getWishListItem ,addItemToCart,setCartItemLocal,deleteWishItem} from  '../lib/api'
//navigation function
import { navigate } from '../appnavigation/RootNavigation'
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import FastImage from 'react-native-fast-image'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/100);
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class WishList extends Component {
    constructor(props){
        super(props);
        this.state={
            subtotal:0,
            deliveryCharges:0,
            discount:0,
            tax:0,
            total:0,
            productList: [],
        }
    }

    async componentDidMount(){
        console.log(this.props.route.name,"check");
        if(this.props.route.name != "SearchWishItem")
            await this.props.getWishListItem();
    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }
    
    setVariationType(variationValue, prod_id){
        console.log(variationValue);
        //ToastAndroid.showWithGravity(variationValue+" - "+prod_id, ToastAndroid.SHORT, ToastAndroid.TOP);
        this.props.selectProdVariationInWish({prod_id:prod_id ,value:variationValue});
    }

    variationOpt = (variation) =>{
        
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.varition} key={index} value={item.varition}  />)
        }));
    }
    
        //Remove from cart 
    _removeFromCart(prodCatId,itemId){
            this.props.removeFromCart(itemId);
    }

    _manageCartProdQty = (prod ,typeaction)=>{
        console.log(prod.selectedQty);
        if(prod.selectedVariationID !=''){
            if(typeaction =="add"){
                this.props.manageCartQty({prodId:prod.id,typeOfAct:typeaction});
            }else{
                if(prod.selectedQty >1)
                    this.props.manageCartQty({prodId:prod.id,typeOfAct:typeaction});
            }
        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    async _addInCart(prodCatId_id,variationId,Itemid,selectedQty,selectedVariationPrice){
        let existProd = false;
        this.props.cart.map( cartItems=>{
            if(Itemid == cartItems.prod_id && variationId == cartItems.selectedVariationID)
            {
                existProd = true;
            }
        })

        if(variationId !=''){
            // this.props.addToCart(Itemid);
            if(!existProd)
            {
                var data = [];
                data["id"] = Itemid;
                data["variationId"] = variationId;
                data["screen"] = this.props.route.name;
                data["qty"] = selectedQty
                data["selectedVariationPrice"]= selectedVariationPrice;
                // var data={"id":Itemid ,"variationId":ProdVariationID ,"screen":this.props.route.name};
                await this.props.addItemToCart(data);
                this.props.setCartItemLocal();
            }else{
                ToastAndroid.showWithGravity("This Product is already in your cart", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    selectQtyDetail(item){
        if(item.selectedVariationID != ''){
            return(
                <Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>{(item.selectedQtyVariation +" | QTY:"+item.selectedQty)} </Text>
            )
        }
    }

    _removeWishList (id,action) {
        // data.isMyWish =! "heart" ? "heart-outline": "heart";
        if(this.props.authUserId !=''){
            //this.props.setWishInLocal(data);//save in local
            this.props.removeWishListItemOnServer({id,action}); //save in server
            // this.props.addInWish(data.id);
        }else{
            ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    renederItemType () {
        // let ItemList = this.props.my_wish_list;
        // if(this.props.route.name == "SearchWishItem" ){
            
            // if(this.state.searchedKey != ''){
           let ItemList = this.props.my_wish_list;//.filter(item=> item.attributename == key);
            // }else{
               // ItemList =[];
            // }
        // }

        if(ItemList.length >0){
        return(
            <View style={{marginBottom:60}}>
            <FlatList
            data={ItemList}
            renderItem={({ item }) => (
                <View style={styles.prodBlock}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                        <View style={{marginTop:constants.vw(20)}}>
                            {/*<Image style={styles.imageThumbnail} source={{ uri: replaceAllSpace(prod_variation_url+(item.fimage)) }} />*/}
                            <FastImage
                                style={styles.imageThumbnail}
                                source={{
                                    uri:replaceAllSpace(prod_variation_url+(item.fimage)),
                                    priority: FastImage.priority.normal,
                                    cache: FastImage.cacheControl.immutable,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <View style={{width:'50%'}}>
                            <View style={{flexDirection:'row',marginBottom:10}}>
                                <Text style={{fontSize:constants.vw(14),width:'80%',fontFamily:constants.fonts.Cardo_Bold,marginLeft:5,marginBottom:4}}>
                                    {item.attribute_name}
                                </Text>
                                <View style={{flex:1,width:'20%',}}>
                                        <TouchableOpacity style={{position:'absolute',right:0,top:0,zIndex:1}} onPress={()=>this._removeWishList(item.id,"remove")}>
                                            <Icon 
                                                name="trash-o"
                                                color={constants.Colors.color_BLACK}
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{borderWidth:1,borderColor:constants.Colors.color_lineGrey,marginLeft:5,marginBottom:5}}>
                                <Picker
                                    selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                    // mode="dropdown"
                                    style={{height: 50,marginTop:-10,marginBottom:-10,fontFamily:constants.fonts.Cardo_Bold}}
                                    onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                                    >
                                    {/* <Picker.Item label="Select" value="Select"  /> */}
                                    { this.variationOpt(item.variation_details) }
                                </Picker>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:10}}>
                            <Text style={{flex: 1, flexWrap: 'wrap',fontSize:constants.vw(16),fontWeight:'bold'}}>Rs. {item.selectedVariationID ==''?item.price:item.selectedQtyPrice}</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginRight:8,marginLeft:5,marginTop:-4}}
                                onPress={()=>this._manageCartProdQty(item,'remove')}>
                                    <Material 
                                        name="minus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                                    <Text style={{fontSize:constants.vw(16),fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:'Select'}</Text>
                                <TouchableOpacity style={{marginLeft:8,marginTop:-4}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                    <Material 
                                        name="plus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                            </View>
                            {/*this.selectQtyDetail(item)*/}
                            {/**Price section */}
                            {/**Price section */}
                            <View>
                                {item.inventory_status == 0?(<TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_btn,justifyContent:'center',borderRadius:4,height: 30,paddingTop:5}}
                                    onPress={()=>this._addInCart(item.product_id,item.selectedVariationID,item.id,item.selectedQty,item.selectedVariationPrice)}>
                                    <Material name="cart" size={19} color={constants.Colors.color_WHITE}/>
                                    <Text style={{fontSize:constants.vw(15),fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_WHITE}}>Add to Cart</Text>
                                </TouchableOpacity>) :(<Text style={{...styles.prodLabel,fontSize:16,marginTop:10}}>Out Of Stock</Text>)}

                            </View>

            
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
            
            keyExtractor={(item) => item.id}
            />
            </View>
        )
        }else{
            if(this.props.animate == false && this.props.route.name != "SearchWishItem" ){
                return(
                    <View style={{width:constants.width*0.9,alignSelf:'center'}}>
                        <EmptyComp imageName={constants.image.emptyCart} 
                            welcomText={"Looks like you haven’t added anything to your WishList yet!"}
                            redirectText={"SHOP NOW"}
                            onPress={()=>this._shopNow()}
                        />
                    </View>
                )
            }
        }
    }

    async _shopNow(){
        let prodCat = this.props.itemData;
        if(prodCat.length >0){
            //console.log("prod  id",prodCat, prodCat[0].id);
            await this.props.setProdId(prodCat[0].id);
            this.props.navigation.navigate("Product");
        }else{
            ToastAndroid.showWithGravity("Please try again after some time", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                    
                <TextHeading title="My Wish List"/>
                    
                <View style={styles.MainContainer}>
                    {this.renederItemType()}
                </View>
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
     // justifyContent: 'center',
      //flex: 1,
      //padding: 10,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width:constants.vw(120),
      height:constants.vh(120),
      resizeMode:'contain',
      //backgroundColor:constants.Colors.color_imgbg,
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        margin:1
    },
    fonts:{
        fontSize:constants.vw(20),
        fontFamily:regular
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
    prodLabel:{
        fontSize:constants.vw(14),
        fontFamily:constants.fonts.Cardo_Bold,
        marginLeft:5,
        marginBottom:4
    },
  });

const mapStateToProps = state => ({
    my_wish_list :state.data.my_wish_list,
    animate : state.indicator,
    cart: state.data.addedItems,
    authUserId:state.data.authUserID,
    itemData: state.data.productData,
});

const mapDispatchToProps = dispatch => ({
    getWishListItem: ()=>dispatch(getWishListItem()),
    addToCart :(prodId)=> dispatch({type:'ADD_WISH_ITEM_TO_CART',id:prodId}),
    removeWishListItemOnServer :(data)=> dispatch(deleteWishItem(data)),
    removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
    manageCartQty:(data) =>dispatch({type:'MANAGE-WISHPROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
    selectProdVariationInWish :(data)=>dispatch({type:"SET_PRODUCT_VARIATION_IN_WISH",prod_id:data.prod_id, variation:data.value}),
    addItemToCart :(data)=> dispatch(addItemToCart(data)),
    setCartItemLocal:()=>dispatch(setCartItemLocal()),
    setProdId: (data) => dispatch({ type: 'ACTIVE-PROD', id: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
