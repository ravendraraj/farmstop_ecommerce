import React, { Component } from 'react'
import { View, Image,Text, ToastAndroid,FlatList,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../customElement/Loader'
import {CouponTextInput} from '../customElement/Input'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {getWishListItem} from  '../lib/api'
//navigation function
import { navigate } from '../appnavigation/RootNavigation'
import {Picker} from '@react-native-community/picker';

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
        }
    }

    async componentDidMount(){
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

    _addInCart(prodCatId_id,variationId,Itemid,navigateToCart){
        if(variationId !=''){
            this.props.addToCart(Itemid);
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
        let ItemList = this.props.my_wish_list;
        if(ItemList.length >0){
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
                                {/* <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty > 0 ?item.selectedQty:'Select'}</Text> */}
                                <TouchableOpacity style={{marginLeft:8}} onPress={()=>this._manageCartProdQty(item, "add")}>
                                    <Material 
                                        name="plus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                            {this.selectQtyDetail(item)}
                            {/**Price section */}
                            {/**Price section */}
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:10}}>
                                <Text style={{fontSize:20,fontFamily:bold}}>Rs. {item.selectedVariationID ==''?item.price:item.selectedQtyPrice}</Text>
                                <TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_heading,width:85,alignSelf:'flex-end',justifyContent:'center',borderRadius:4}}
                                    onPress={()=>this._addInCart(item.product_id,item.selectedVariationID,item.product_variation_id,true)}>
                                    <Material name="cart" size={15} color={constants.Colors.color_BLACK}/>
                                    <Text style={{fontSize:12,fontFamily:regular}}>Add to Cart</Text>
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
            ItemSeparatorComponent={()=>(
                <View style={{alignSelf:'center',height: 2,width: "90%",backgroundColor: "#000",marginBottom:10,
                backgroundColor:constants.Colors.color_grey}}>
                </View>
            )}
            
            
            keyExtractor={(item) => item.id}
            />
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
                                    Wish List
                                </Text>
                            </View>
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
    my_wish_list :state.data.my_wish_list,
    animate : state.indicator,
});

const mapDispatchToProps = dispatch => ({
    getWishListItem: ()=>dispatch(getWishListItem()),
    addToCart :(prodId)=> dispatch({type:'ADD_WISH_ITEM_TO_CART',id:prodId}),
    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
    manageCartQty:(data) =>dispatch({type:'MANAGE-WISHPROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
    selectProdVariationInWish :(data)=>dispatch({type:"SET_PRODUCT_VARIATION_IN_WISH",prod_id:data.prod_id, variation:data.value})
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
