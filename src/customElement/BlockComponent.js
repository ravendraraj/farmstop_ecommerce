import React, { Component } from 'react';
import {connect} from 'react-redux'
import{
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Image,
    Pressable
} from 'react-native';

import constants from "../constants";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {fristLetterCapital,replaceAllSpace} from '../lib/helper'
import FastImageComponent from './FastImageComponent'
import SubProductComp from '../screens/Product/SubProductComp'
import {SubHeading,OutOfStockTitle,ShortProductTitle} from './Input'
import {CartBtn,VariationSelector} from './button'
import { getProductType,setWishListItemOnServer,addItemToCart,setCartItemLocal } from '../lib/api'

function ProdBoxWithMargin(props){
    const setVariationType=(variationValue, prod_id)=>{
        props.dispatch({ type: "SET_PRODUCT_VARIATION", prod_id:prod_id, variation:variationValue, screen:props.screenName });
    }

    const checkProductDetails=(product_var_id)=>{
        props.dispatch({type:'SORT_SINGLE_PROD_DETAIL',product_var_id:product_var_id,screen:'ProductVariation'});
        props.navigation.navigate("SingleProductDesc");
    }

    const _manageProdQty = async(prod ,typeaction ,variationId)=>{
        if(variationId !=""){
            props.dispatch({type:'ADD-PROD-QTY' ,activeProdId:prod,actionType:typeaction ,screen:props.screenName})
        }else{
            //ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    const addInCart=async(prodTypeId,variationId ,selectedQty,selectedVariationPrice)=>{
        let existProd = false;
        // this.props.cart.map( cartItems=>{
        //     if(prodTypeId == cartItems.prod_id && variationId == cartItems.selectedVariationID)
        //     {
        //         existProd = true;
        //     }
        // })
        // console.log(existProd,prodTypeId,variationId ,selectedQty)
        if(variationId !=""){
            if(!existProd)
            {
                var data = [];
                data["id"] = prodTypeId;
                data["variationId"] = variationId;
                data["screen"] = props.screenName;
                data["qty"] = selectedQty;
                data["selectedVariationPrice"]= selectedVariationPrice;
                await props.dispatch(addItemToCart(data));
                props.dispatch(setCartItemLocal());
            }else{
                //ToastAndroid.showWithGravity("This Product is already in your cart", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

        }else{
            //ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    let product_item_id = props.prodData.id;

    return(
        <View style={{...styles.itemBlockWithMargin}}>
            <TouchableOpacity onPress={()=>{checkProductDetails(product_item_id)}}>
                <FastImageComponent
                    layout={styles.image_layout}
                    image_url={replaceAllSpace(props.prodImage)}
                    resizeImage={"contain"}
                />
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{width:"80%"}}>
                    <ShortProductTitle title={props.prodData.attribute_name}/>
                </View>
                {
                    ("isMyWish" in props.prodData) == true?
                    (
                        <SubProductComp 
                            liked={props.prodData.isMyWish == ''?false:true}
                            item={props.prodData}
                            screen_name={props.screenName}
                        />
                    ):(<></>)
                }
                
            </View>
            <View style={{marginTop:constants.vh(10),marginBottom:constants.vh(10)}}>
                <VariationSelector
                    selectedValue = {props.prodData.selectedVariationID == ""? "": props.prodData.selectedQtyVariation}
                    onValueChange={ (value) => (setVariationType(value,props.prodData.id))}
                    options={props.prodData}
                    compWidth={'100%'}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:constants.vh(10)}}>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18}}>{'\u20B9'+" "+props.prodData.selectedQtyPrice}</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{marginRight:5}} 
                        onPress={()=>_manageProdQty(product_item_id,'remove',props.prodData.selectedVariationID)}>
                            <Material 
                                name="minus-circle-outline"
                                color={constants.Colors.color_grey}
                                size={25}
                            />
                    </TouchableOpacity>
                        <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Regular}}>{props.prodData.selectedQty > 0 ?props.prodData.selectedQty:"Select"}</Text>
                        <TouchableOpacity style={{marginLeft:5}} 
                            onPress={()=>_manageProdQty(product_item_id,'add',props.prodData.selectedVariationID)}>
                                <Material 
                                    name="plus-circle-outline"
                                    color={constants.Colors.color_grey}
                                    size={25}
                                />
                        </TouchableOpacity>
                </View>
            </View>
                <View>
                    {
                    props.prodData.inventory_status == 0?(
                        <CartBtn 
                            onPress={()=>addInCart(
                                props.prodData.id,
                                props.prodData.selectedVariationID,
                                props.prodData.selectedQty,
                                props.prodData.selectedVariationPrice
                                )
                            }
                        />):(null)
                    }
                    </View>
            {props.prodData.inventory_status >0?(<View style={{height:30}}><OutOfStockTitle title={"Out Of Stock"}/></View>):(<></>)}
        </View>
    )
}

const styles = StyleSheet.create({
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

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state){
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        indicator,data,error
};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdBoxWithMargin);