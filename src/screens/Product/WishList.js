import React, { Component } from 'react'
import { View, Image,Text, ToastAndroid,FlatList,StyleSheet,TouchableOpacity,Dimensions,Alert,StatusBar } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../../constants/url'
import constants from '../../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../../customElement/Loader'
import {TextHeading,EmptyComp,ShortProductTitle} from '../../customElement/Input'
//helper function
import {fristLetterCapital,replaceAllSpace} from '../../lib/helper'
import {getWishListItem ,addItemToCart,setCartItemLocal,deleteWishItem} from  '../../lib/api'
//navigation function
import { navigate } from '../../appnavigation/RootNavigation'
import FastImageComponent from '../../customElement/FastImageComponent'
import {CartBtn,VariationSelector} from '../../customElement/button'
import {MainContentHeading,ProductTitle,OutOfStockTitle} from '../../customElement/Input'

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
            visible:true
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
        // this.props.cart.map( cartItems=>{
        //     if(Itemid == cartItems.prod_id && variationId == cartItems.selectedVariationID)
        //     {
        //         existProd = true;
        //     }
        // })

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
                //ToastAndroid.showWithGravity("This Product is already in your cart", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

        }else{
            //ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
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
        if(this.props.authUserId !=''){
            //this.props.setWishInLocal(data);//save in local
            this.props.removeWishListItemOnServer({id,action}); //save in server
            // this.props.addInWish(data.id);
        }else{
            //ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };

    renederItemType () {    
        let ItemList = this.props.my_wish_list;//.filter(item=> item.attributename == key);
        if(ItemList.length >0){
        return(
            <View style={{flex:1,backgroundColor:constants.Colors.color_light_grey}}>
                <FlatList
                    ListEmptyComponent={()=>(
                        <View style={{width:'100%',height:20,marginBottom:10}}>
                        </View>
                    )}
                    data={ItemList}
                    renderItem={({ item }) => (
                        <View style={styles.itemBlockWithMargin}>
                            <TouchableOpacity onPress={()=>{}}>
                                <FastImageComponent
                                    layout={styles.image_layout}
                                    image_url={replaceAllSpace(prod_variation_url+(item.fimage))}
                                    resizeImage={"contain"}
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={{position:'absolute',top:constants.vh(10),right:constants.vw(10),padding:constants.vw(5),zIndex:10,justifyContent:'center',alignItems:'center',
                                    backgroundColor:'rgba(65, 163, 23,0.5 )',
                                    borderRadius:10,
                                    borderColor:constants.Colors.color_WHITE,
                                    borderWidth:0.5
                                }} 
                                onPress={()=>this._removeWishList(item.id,"remove")}
                            >
                                <Material 
                                    name="close"
                                    color={constants.Colors.color_WHITE}
                                    size={constants.vw(20)}
                                />
                            </TouchableOpacity>
                            
                            <View style={{marginTop:constants.vh(10)}}>
                                <ShortProductTitle title={item.attribute_name}/>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <VariationSelector
                                    selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                    onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                                    options={item}
                                    compWidth={constants.width*0.4}
                                />
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(18)}}>{'\u20B9'+" "+item.selectedQtyPrice}</Text>
                                <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={{marginRight:8,marginLeft:5,marginTop:-4}}
                                        onPress={()=>this._manageCartProdQty(item,'remove')}>
                                            <Material 
                                                name="minus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={constants.vh(25)}
                                            />
                                        </TouchableOpacity>
                                            <Text style={{fontSize:constants.vh(18),fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:'Select'}</Text>
                                        <TouchableOpacity style={{marginLeft:8,marginTop:-4}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                            <Material 
                                                name="plus-circle-outline"
                                                color={constants.Colors.color_grey}
                                                size={constants.vh(25)}
                                            />
                                        </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                                {
                                    item.inventory_status == 0?(
                                    <CartBtn 
                                        onPress={()=>this._addInCart(
                                            item.id,
                                            item.selectedVariationID,
                                            item.selectedQty,
                                            item.selectedVariationPrice
                                        )
                                    }
                                    />):(<View style={{height:30}}><OutOfStockTitle title={"Out Of Stock"}/></View>)
                                }
                            </View>
                        </View>
                    )}

                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    ref={(ref) => { this.scrollview = ref; }}
                    onScroll= {(event) =>{
                        if (event.nativeEvent.contentOffset.y >=173) {
                            this.setState({
                                visible:false
                            })
                        }else{
                            this.setState({
                                visible:true
                            })
                        }
                    }}

                    onScrollEndDrag={(event) => {
                        if (event.nativeEvent.contentOffset.y >=173) {
                            this.setState({
                                visible:false
                            })
                        }else{
                            this.setState({
                                visible:true
                            })
                        }
                    }}
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
                {this.state.visible==true?<TextHeading title="My Wish List"/>:null}
                {this.renederItemType()}
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
    image_layout:{
        width:constants.width*0.46,
        height:constants.width*0.46,
        alignSelf:'center'
    },
    itemBlockWithMargin:{
        width:constants.width*0.5,
        //height:constants.vw(330),
        alignSelf:'center',
        borderRadius:0,
        borderWidth:0.2,
        borderColor:constants.Colors.color_platnium,
        backgroundColor:constants.Colors.color_WHITE,
        borderWidth:constants.vw(0.3),
        margin:1,
        padding:constants.vw(10)
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
