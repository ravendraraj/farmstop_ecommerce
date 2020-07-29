import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions ,ToastAndroid} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
//helper function
import {fristLetterCapital} from '../lib/helper'
import {Loader} from '../customElement/Loader'

//api call
import { getProductType,setWishListItemInLocal ,setWishListItemOnServer,addItemToCart,setCartItemLocal} from '../lib/api'
import {Picker} from '@react-native-community/picker';

//navigation function
import { navigate } from '../appnavigation/RootNavigation'

import AutoScrollListview from '../customElement/Auto'
import Marquee from '../customElement/marquee'
// import TestMarquee from './TestMarquee';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/(width/4));
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class PorductVariation extends Component {
    constructor(props){
        super(props)
        // this.props.getItem();
        this.state={
            ListItem :'',
            page:1,
        }
    }

   async componentDidMount(){
        if(this.props.activeProd != '')
        await this.props.getProductType({prodID:this.props.activeProd ,start:0,end:totalprod})
    }

    _addinWishList = data => {
        // data.isMyWish =! "heart" ? "heart-outline": "heart";
        if(this.props.authEmail != "" || this.props.authMobile != ''){
            //this.props.setWishInLocal(data);//save in local
            this.props.setWishListItemOnServer(data); //save in server
            this.props.addInWish(data.id);
        }else{
            ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    };
    
    _manageProdQty = (prod ,variationId,typeaction)=>{
        if(variationId !=""){
            this.props.manageQty({ prodId: prod, typeOfAct: typeaction ,screen: this.props.route.name});
        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    LoadMoreRandomData = async() =>{
        if(this.props.activeProd !=''){
            if(this.props.no_more_data == false){
                let pageNo = this.state.page+1;
                await this.props.getProductType({prodID:this.props.activeProd ,start:((this.state.page * totalprod)+1), end:totalprod});
                this.setState({page:pageNo});
            }else{
                ToastAndroid.showWithGravity("No more product find", ToastAndroid.SHORT, ToastAndroid.TOP);
            }
        }
    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

    _getItemType(prod_id){
        Alert.alert("Selected Prod"+prod_id);    
    }
    
    _knowMore(prod_id){
        this.props.knowMore({prodId:prod_id, screen:this.props.route.name});
        navigate("knowMoreProd");
    }

    //add product in cart
    async _addInCart(prodCatId_id,ProdVariationID,Itemid,selectedQty){

        if(ProdVariationID !=''){
            var data = [];
            data["id"] = Itemid;
            data["variationId"] = ProdVariationID;
            data["screen"] = this.props.route.name;
            data["qty"] = selectedQty
            // var data={"id":Itemid ,"variationId":ProdVariationID ,"screen":this.props.route.name};
            await this.props.addItemToCart(data);
            this.props.setCartItemLocal()
        }else{
            ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    //Remove from cart 
    _removeFromCart(prodCatId,itemId){
        this.props.removeFromCart(itemId);
    }

    renderItemTitle(){
        const Auto=this.props.productData.length>0?<AutoScrollListview itemList= {this.props.productData} totalProd={totalprod} scrollPosition={5} /> :null;
        return (
            <View style={{paddingBottom:0,marginBottom:-70}}>
                <Marquee duration={18*1000} >
                        {Auto}
                </Marquee>
            </View>
        )
    }

    setVariationType(variationValue, prod_id){
        console.log(variationValue);
        //ToastAndroid.showWithGravity(variationValue+" - "+prod_id, ToastAndroid.SHORT, ToastAndroid.TOP);
        this.props.selectProdVariation({ prod_id: prod_id, value: variationValue ,screen: this.props.route.name});
    }

    variationOpt = (variation) =>{
        
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.varition} key={index} value={item.varition}  />)
        }));
    }

    selectQtyDetail(item){
        if(item.selectedVariationID != ''){
            return(
                <Text style={{fontSize:16,fontFamily:regular,marginLeft:10}}>{(item.selectedQtyVariation +" | QTY:"+item.selectedQty)} </Text>
            )
        }
    }

    renederItemType () {
        
        let ItemList = this.props.itemtypeData;
        if(ItemList != "undefined" && ItemList.length > 0){

            let updateItemList = ItemList.map(item => {
                if(item.isMyWish == ''){
                    item.isMyWish = 'heart-outline';
                }
                return item;
            });

        return(
            <View>
                {/* <Text style={{fontSize:18,color:constants.Colors.color_heading,fontFamily:italic,marginTop:40,marginBottom:30}}>
                    {fristLetterCapital(producName)}
                </Text> */}
                {this.renderItemTitle()}
            <FlatList
            data={updateItemList}
            renderItem={({ item }) => (
                <View style={{marginBottom:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                        {/* <TouchableOpacity onPress={()=>this._getItemType(item.id)}> */}
                        <View>
                            <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                            <TouchableOpacity style={{position:'absolute',top:-4,right:0}}
                            onPress={()=>this._addinWishList(item)}>
                                <Material name={item.isMyWish} color={constants.Colors.color_grey} size={25}/>
                            </TouchableOpacity>
                            {/* <Text style={{fontSize:12,marginTop:10,alignSelf:'center',fontFamily:regular}}>{fristLetterCapital(item.attribute_name)}</Text> */}
                        </View>
                        {/* </TouchableOpacity> */}

                        {/** Select Option */}
                        <View style={{width:'50%'}}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginRight:8,marginLeft:5}}
                                onPress={()=>this._manageProdQty(item.id,item.selectedVariationID,'remove')}>
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
                                {/* <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty >0 ?item.selectedQty:"Select"}</Text> */}
                                <TouchableOpacity style={{marginLeft:8}}
                                onPress={()=>this._manageProdQty(item.id,item.selectedVariationID,'add')}>
                                    <Material 
                                        name="plus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                            {this.selectQtyDetail(item)}
                            {/**Price section */}
                            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
                                <Text style={{fontSize:20,fontFamily:bold}}>Rs. {(item.selectedVariationID !='') ? item.selectedQtyPrice : item.price}</Text>
                                <TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_heading,width:85,alignSelf:'flex-end',justifyContent:'center',borderRadius:4}}
                                    onPress={()=>this._addInCart(item.product_id,item.selectedVariationID ,item.id,item.selectedQty)}>
                                    <Material name="cart" size={15} color={constants.Colors.color_BLACK}/>
                                    <Text style={{fontSize:12,fontFamily:regular}}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>

                            {/**Know More  section */}
                            {/* <TouchableOpacity style={{alignSelf:'center',marginTop:15}} onPress={()=>this._knowMore(item.id)}>
                                <Text style={{fontFamily:bold}}>Know More</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:"40%"}}>
                        <Text style={{fontSize:12,alignSelf:'center',fontFamily:regular}}>{fristLetterCapital(item.attribute_name)}</Text>
                        </View>
                        <View style={{width:"50%"}}>
                        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>this._knowMore(item.id)}>
                                <Text style={{fontFamily:bold}}>Know More</Text>
                        </TouchableOpacity>
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

                <View style={{width:'100%',height:60}}>
                </View>
            )}
            
            // keyExtractor={(item) => item.id}
            keyExtractor={(item,index) => item.id.toString()}
            // extraData={this.state}
            onEndReachedThreshold={0.5}
            onEndReached={this.LoadMoreRandomData}

            />
            </View>
        )
        }
        // else{
        //     return(
        //         <View style={{alignSelf:'center'}}>
        //             <Text> Loading....</Text>
        //         </View>
        //     )
        // }
    }

    render() {
        return (

            <View style={styles.container}>
                {/* <ScrollView > */}
                    {/* <SearchBox autoCapitalize="none"
                        //onChangeText={(val) => this.textInputChange(val)}
                        placeholder={'Search for good health'}
                    /> */}
                    { this._loadLoader() }
                    <View style={styles.MainContainer}>
                        {/* {this.renderItemTile()} */}
                        {this.renederItemType()}
                    </View>
                {/* </ScrollView> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:30,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 10,
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
    }
  });

const mapStateToProps = state => ({
    animate : state.indicator,
    itemtypeData :state.data.productVatiation,
    activeProd : state.data.activeProduct,
    authEmail :state.data.authEmail,
    authMobile :state.data.authMobile,
    no_more_data: state.data.no_more_data,
    productData : state.data.productData,
});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
    knowMore:(data)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:data.prodId,screen:data.screen}),
    addItemToCart :(data)=> dispatch(addItemToCart(data)),
    setCartItemLocal:()=>dispatch(setCartItemLocal()),
    removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
    loader:()=>dispatch({type : 'LOADING'}),
    getProductType: (data) => dispatch(getProductType(data)),
    addInWish:(data) => dispatch({type:'ADD-WISH', activeProdId:data}),
    manageQty:(data) =>dispatch({type:'ADD-PROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct ,screen:data.screen}),
    setWishInLocal :(data)=>dispatch(setWishListItemInLocal(data)),
    setWishListItemOnServer : (data)=>dispatch(setWishListItemOnServer(data)),
    selectProdVariation: (data) => dispatch({ type: "SET_PRODUCT_VARIATION", prod_id: data.prod_id, variation: data.value, screen: data.screen }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PorductVariation);
