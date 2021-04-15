import React, {useRef,useEffect,useState} from 'react'
import { SafeAreaView,View,ScrollView, Image,Text, Alert,FlatList,StyleSheet,Dimensions ,ToastAndroid, StatusBar,Animated} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../../constants/url'
import constants from '../../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../../customElement/Loader'
import {CartBtn,VariationSelector} from '../../customElement/button'
import { getProductType,setWishListItemOnServer,addItemToCart,setCartItemLocal } from '../../lib/api'
import FastImageComponent from '../../customElement/FastImageComponent'
import {fristLetterCapital,replaceAllSpace} from '../../lib/helper'
import {HtmlContainer} from '../../customElement/TextInputFields'
import {MainContentHeading,ProductTitle,OutOfStockTitle} from '../../customElement/Input'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity} from 'react-native-gesture-handler'
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import SocialLinks from '../../customElement/SocialLinks'
import BackBtnHeaderIcon from '../../headerComponent/BackBtnHeaderIcon'
import RelatedProduct from '../../customElement/RelatedProduct'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/(width/2));

const SingleProductDesc=(props)=>{
    const scrollview = useRef(null);
    const [isRefreshing, setRefresh] = useState(false);
    const [data,setData] = useState({
        page_no:1,
        total_prod:10,
        active_prod:'',
        single_product:[],
        visible: true
    });

    // useEffect(()=>{    
    //     handeleReq();
    // },[]);

    // const handeleReq=async()=>{
    //     let my_product_list = props.data.productVatiation;
    //     if(my_product_list.length>0){
    //         let single_data = my_product_list.find(item=>((item.id ==props.route.params.product_var_id) && (item.product_id == props.data.activeProduct)));
    //         setData({
    //             ...data,
    //             single_product:single_data
    //         })
    //     }
    // }

    const loader=()=>{
        if(props.data.product_vari_loading == true || props.indicator == true){
            return(
                <Loader/>
            )
        }
    }

    const setVariationType=(variationValue, prod_id)=>{
        props.dispatch({ type: "SET_PRODUCT_VARIATION", prod_id:prod_id, variation:variationValue, screen: "SingleProduct" });
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
                data["screen"] = "SingleProduct";
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

    const _manageProdQty = async(prod ,typeaction ,variationId)=>{
        if(variationId !=""){
            props.dispatch({type:'ADD-PROD-QTY' ,activeProdId:prod,actionType:typeaction ,screen:"SingleProduct"})
        }else{
            //ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    const _addinWishList = prodData =>{
        if(props.data.token !="" && props.data.authUserID !=""){
            var data = [];
                data["id"] = prodData.id;
                data["screen"] = "SingleProduct";
                props.dispatch(setWishListItemOnServer(data));

        }else{
            props.navigation.navigate("SocialLogin");
        }
    };

    const wishFooterBtn=()=>{
        let wish_btn = props.data.single_product_detail.isMyWish == ""?"WISHLIST":"WISHLISTED";
        let wish_btn_icon = props.data.single_product_detail.isMyWish == ""?"hearto":"heart";        
            return(
                <Animated.View style={{flexDirection:'row',
                    height:50, width:'100%', 
                    backgroundColor:constants.Colors.color_heading, 
                    position:'absolute', 
                    bottom:0,
                    borderTopWidth:0,
                    borderBottomWidth:0,
                    borderColor:constants.Colors.color_statusbar
                }}>
                    <View style={{
                        width:'50%',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <TouchableOpacity onPress={()=>_addinWishList(prodDetails)} style={{flexDirection:'row'}}>
                            <Icon
                                name={wish_btn_icon}
                                color={constants.Colors.color_WHITE}
                                size={constants.vw(18)}
                                style={{marginRight:10}}
                            />
                            
                            <Text style={styles.button_text}>
                                {wish_btn}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderLeftWidth:1,borderColor:constants.Colors.color_WHITE}}/>
                    <View style={{
                        width:'50%',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <TouchableOpacity onPress={()=>_onShare(prodDetails.long_description,replaceAllSpace(prod_variation_url+prodDetails.fimage))} style={{flexDirection:'row'}}>
                            <Material style={{ marginRight:10}} 
                                name={"share-variant"} 
                                size={constants.vw(18)} 
                                color={constants.Colors.color_WHITE}
                            />
                            <Text style={styles.button_text}>
                                SHARE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )
    }

    const checkProductDetails=(product_var_id)=>{
        
        props.dispatch({type:'LOADING'});
        props.dispatch({type:'SORT_SINGLE_PROD_DETAIL',product_var_id:product_var_id,screen:'ProductVariation'});
         
        scrollview.current.scrollTo({ x: 0, y: 0, animated: true })
        console.log("scrollview",scrollview);

        setTimeout(() => {
            props.dispatch({type:'CANCEL_LOADING'});
        },1000);
    }

    const _onShare = async(content,imageUrl)=>{
        props.dispatch({type:'LOADING'});
        let appUrl = "https://play.google.com/store/apps/details?id=com.farmstop&hl=it";
        let webUrl = "https://www.farmstop.in/";
            
        RNFetchBlob.fetch('GET',replaceAllSpace(imageUrl)).then(resp => {
            props.dispatch({type:'ERROR_SUBMIT'});
            let base64image = resp.data;
            shareProduct('data:image/png;base64,' + base64image);
        }).catch(err =>{
            //errorHandler(err);
            console.log(err);
            props.dispatch({type:'ERROR_SUBMIT'});
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
    
    let prodDetails = props.data.single_product_detail;

    return(
        <SafeAreaView style={styles.container}>
            <BackBtnHeaderIcon screenTitle={""} {...props} visibilty={data.visible}/>
            <Animated.ScrollView contentContainerStyle={{flexGrow:1}} 
                ref={scrollview}
                bounces={true}
                onScroll= {(event) =>{
                  // console.log(event.nativeEvent.contentOffset.y)

                      if (event.nativeEvent.contentOffset.y >=173) {
                        setData({
                        ...data,
                        visible:false
                      })
                      }else{
                        setData({
                            ...data,
                            visible:true
                        })
                      }
                  }}

                onScrollEndDrag={(event) => {
                    if (event.nativeEvent.contentOffset.y >=173) {
                      setData({
                        ...data,
                        visible:false
                      })
                      }else{
                        setData({
                            ...data,
                            visible:true
                          })
                      }
                }}
            >
            <FastImageComponent
                layout={styles.image_layout}
                image_url={replaceAllSpace(prod_variation_url+props.data.single_product_detail.fimage)}
                resizeImage={"contain"}
            />
            <View style={{alignItems:'center',width:'100%',marginBottom:10,marginTop:10}}><ProductTitle title={prodDetails.attribute_name}/></View>
            <View style={{alginSelf:'center',padding:10}}>
                
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    
                        <VariationSelector
                            selectedValue = {props.data.single_product_detail.selectedVariationID == ""? "": props.data.single_product_detail.selectedQtyVariation}
                            onValueChange={ (value) => (setVariationType(value,props.data.single_product_detail.id))}
                            options={props.data.single_product_detail}
                            compWidth={constants.vw(120)}
                        />
                    
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{marginRight:5}} 
                            onPress={()=>_manageProdQty(prodDetails.id,'remove',prodDetails.selectedVariationID)}>
                                <Material 
                                    name="minus-circle-outline"
                                    color={constants.Colors.color_grey}
                                    size={25}
                                />
                            </TouchableOpacity>
                            <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Regular}}>{prodDetails.selectedQty > 0 ?prodDetails.selectedQty:"Select"}</Text>
                            <TouchableOpacity style={{marginLeft:5}} 
                            onPress={()=>_manageProdQty(prodDetails.id,'add',prodDetails.selectedVariationID)}>
                                <Material 
                                    name="plus-circle-outline"
                                    color={constants.Colors.color_grey}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                    <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18}}>{'\u20B9'+" "+prodDetails.selectedQtyPrice}</Text>
                    <View>
                        {
                            prodDetails.inventory_status == 0?(
                                <CartBtn 
                                    onPress={()=>addInCart(
                                        prodDetails.id,
                                        prodDetails.selectedVariationID,
                                        prodDetails.selectedQty,
                                        prodDetails.selectedVariationPrice
                                        )
                                    }
                                />):(<OutOfStockTitle title={"Out Of Stock"}/>)
                        }
                    </View>
                </View>
            
                {props.data.single_product_detail.long_description !=""?(<View style={{marginTop:constants.vh(20),marginBottom:constants.vh(20)}}>
                    <MainContentHeading title={"Description :"} />
                    <HtmlContainer description={props.data.single_product_detail.long_description}/>
                    {/*<HtmlContainer description={props.data.single_product_detail.long_description}/>
                                        <HtmlContainer description={props.data.single_product_detail.long_description}/>
                                        <HtmlContainer description={props.data.single_product_detail.long_description}/>
                                        <HtmlContainer description={props.data.single_product_detail.long_description}/>
                                        <HtmlContainer description={props.data.single_product_detail.long_description}/>*/}
                    </View>):(<></>)
                }
            </View>
            <RelatedProduct
                itemtypeData={props.data.productVatiation}
                activeProdItem = {prodDetails.id}
                checkProductDetail={(item)=>checkProductDetails(item.id)}
            />
            <View style={{alginSelf:'center',padding:10}}>
                <SocialLinks size='25'/>
                {data.visible==true?<View style={{width:'100%',height:constants.vh(2)}}/>:(<View style={{width:'100%',height:constants.vh(120)}}/>)}
            </View>
            <View style={{height:constants.vh(70)}}/>
            </Animated.ScrollView>
            {loader()}
            {data.visible==true?wishFooterBtn():null}

        </SafeAreaView>
    )
}

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

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    image_layout:{
        width:constants.width,
        height:constants.width
    },
    button_text:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(16),
        color:constants.Colors.color_WHITE
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductDesc);