import React, { Component } from 'react'
import { View, Image,Text, ToastAndroid,FlatList,StyleSheet,TouchableOpacity,Dimensions,Alert } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,TextHeading,EmptyComp} from '../customElement/Input'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {getWishListItem ,addItemToCart,setCartItemLocal} from  '../lib/api'
//navigation function
import { navigate } from '../appnavigation/RootNavigation'
import {Picker} from '@react-native-community/picker';
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';

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
        if(prod.selectedVariationID !=''){
            this.props.manageCartQty({prodId:prod.id,typeOfAct:typeaction});
        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    async _addInCart(prodCatId_id,variationId,Itemid,selectedQty){
        if(variationId !=''){
            // this.props.addToCart(Itemid);
            var data = [];
            data["id"] = Itemid;
            data["variationId"] = variationId;
            data["screen"] = this.props.route.name;
            data["qty"] = selectedQty
            // var data={"id":Itemid ,"variationId":ProdVariationID ,"screen":this.props.route.name};
            await this.props.addItemToCart(data);
            this.props.setCartItemLocal();

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
                            <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                        </View>
                        <View style={{width:'50%'}}>
                            <Text style={{fontSize:constants.vw(14),fontFamily:constants.fonts.Cardo_Bold,marginLeft:5,marginBottom:4}}>
                                {item.attribute_name}
                            </Text>
                            <View style={{borderWidth:1,borderColor:constants.Colors.color_lineGrey,marginLeft:5,marginBottom:5}}>
                                <Picker
                                    selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                                    // mode="dropdown"
                                    style={{height: 50,marginTop:-10,marginBottom:-10,fontFamily:constants.fonts.Cardo_Bold}}
                                    onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                                    >
                                    <Picker.Item label="Select" value="Select"  />
                                    { this.variationOpt(item.variation_details) }
                                </Picker>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:10}}>
                            <Text style={{fontSize:18,fontFamily:bold}}>Rs. {item.selectedVariationID ==''?item.price:item.selectedQtyPrice}</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginRight:8,marginLeft:5}}
                                onPress={()=>this._manageCartProdQty(item,'remove')}>
                                    <Material 
                                        name="minus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                                    <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:'Select'}</Text>
                                <TouchableOpacity style={{marginLeft:8}} onPress={()=>this._manageCartProdQty(item, "add")}>
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
                                <TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_heading,justifyContent:'center',borderRadius:4,height: 30}}
                                    onPress={()=>this._addInCart(item.product_id,item.selectedVariationID,item.id,item.selectedQty)}>
                                    <Material name="cart" size={19} color={constants.Colors.color_BLACK}/>
                                    <Text style={{fontSize:constants.vw(15),fontFamily:constants.fonts.Cardo_Bold}}>Add to Cart</Text>
                                </TouchableOpacity>
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
                    <EmptyComp imageName={constants.image.emptyCart} 
                        welcomText={"Looks like you haven’t added anything to your Wish List yet!"}
                        redirectText={"Add Now"}
                        onPress={()=>this.props.navigation.navigate("MainHome")}
                    />
                )
            }
        }
    }

    render() {
        return (

                <View style={styles.container}>
                    <TextHeading title="My Wish List"/>
                        <View style={styles.MainContainer}>
                            {/* {this.searchComonent()} */}
                            {this._loadLoader()}
                            {this.renederItemType()}
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
      descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
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
    ImageStyle: {
        // padding: 10,
        marginTop: 13,
        marginLeft: 10,
        // resizeMode: 'stretch',
        //alignItems: 'center',
      },
      itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
      },
      prodBlock:{
        alignSelf:'center',
        width:'95%',
        backgroundColor:"white",
        borderRadius:2,
        elevation:4,
        padding:10,
        marginBottom:10,
    }
  });

const mapStateToProps = state => ({
    my_wish_list :state.data.my_wish_list,
    animate : state.indicator,
});

const mapDispatchToProps = dispatch => ({
    getWishListItem: ()=>dispatch(getWishListItem()),
    addToCart :(prodId)=> dispatch({type:'ADD_WISH_ITEM_TO_CART',id:prodId}),
    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
    manageCartQty:(data) =>dispatch({type:'MANAGE-WISHPROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
    selectProdVariationInWish :(data)=>dispatch({type:"SET_PRODUCT_VARIATION_IN_WISH",prod_id:data.prod_id, variation:data.value}),
    addItemToCart :(data)=> dispatch(addItemToCart(data)),
    setCartItemLocal:()=>dispatch(setCartItemLocal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
