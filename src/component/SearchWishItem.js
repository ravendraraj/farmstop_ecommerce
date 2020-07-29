import React, { Component } from 'react'
import { ImageBackground, View, Image, Text, ToastAndroid, FlatList, StyleSheet, TouchableOpacity ,ScrollView,Alert} from 'react-native'
import { connect } from 'react-redux';
import { Loader } from '../customElement/Loader'
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import storeImg from '../constants/Image'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Picker} from '@react-native-community/picker';

//api call
import { addItemToCart,setCartItemLocal } from '../lib/api'


const regular = constants.fonts.Cardo_Regular;
class SearchWishItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      query: '',
      selectedKey:''
    };
  }

  _loadLoader() {
    if (this.props.animate) {
      return (
        <Loader />
      )
    }
  }


componentDidMount() {
    // this.props.getItem({ start: 1, end: 6 });
    // this.setState({ productList: this.props.productName });
    // await this.props.searchProductType();
  }

  findProduct(query) {
    //method called everytime when we change the value of the input
    if (query === '' || query.length <= 2) {
      //if the query is null then return blank
      return [];
    }

    if (this.props.my_wish_list.length > 0) {
      const { productList } = this.props.my_wish_list;
      //making a case insensitive regular expression to get similar value from the film json
      const regex = new RegExp(`${query.trim()}`, 'i');
      //return the filtered film array according the query from the input
      return this.props.my_wish_list.filter(prod => prod.attribute_name.search(regex) >= 0);
    } else {
      return [];
    }
  }


  async _getItemType(prod_id) {
    await this.props.setProdId(prod_id);
    this.props.navigation.navigate('ProductType', {
      itemId: prod_id
    });
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
    
    let ItemList = this.props.my_wish_list.filter(item=> item.attribute_name == this.state.selectedKey);

    if(ItemList.length >0){
    return(
        <View style={{marginBottom:60}}>
        <FlatList
        data={ItemList}
        renderItem={({ item }) => (
            <View style={{marginBottom:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                    <View>
                        <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(13),alignSelf:'center'}}>{item.attribute_name}</Text>
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
                            <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Bold}}>Rs. {item.selectedVariationID ==''?item.price:item.selectedQtyPrice}</Text>
                            <TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_heading,width:85,alignSelf:'flex-end',justifyContent:'center',borderRadius:4}}
                                onPress={()=>this._addInCart(item.product_id,item.selectedVariationID,item.id,item.selectedQty)}>
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
    }else{
        if(this.props.route.name != "SearchWishItem" ){
            return(
                <View style={{flex:1}}>
                    <Text style={{alignSelf:'center',fontSize:16,fontFamily:constants.fonts.Cardo_Italic,color:constants.Colors.color_intro,marginTop:constants.vh(20)}}>
                        Not found any item
                    </Text>
                </View>
            )
        }
    }
}

  _ShowError() {
    if (this.props.error) {
      ToastAndroid.showWithGravity(this.props.error, ToastAndroid.SHORT, ToastAndroid.TOP);
      setTimeout(() => {
        this.props.removeError();
      }, 1000);
    }
  }

  seacrhProduct(key) {
    // Alert.alert(key);
    // this.props.getProductTypeByKeyword({ prodKey:key ,screen:this.props.route.name});
    // this.props.navigation.navigate('ProductType',{keyword:key});
    this.setState({selectedKey:key});
  }

  render() {
    const { query } = this.state;
    const productList = this.findProduct(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
    //   <ImageBackground style={styles.imgBackground}
    //     resizeMode='contain'
    //     source={storeImg.appIntro1}>
        <View style={styles.container}>
          {/* <View style={styles.SectionStyle}> */}
          <AntDesign name="search1" size={20} color={constants.Colors.color_BLACK}
            style={styles.ImageStyle} />

          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            inputContainerStyle={{ borderWidth: 0 }}
            style={{ color: constants.Colors.color_grey, fontSize: 18 }}

            listStyle={{ borderWidth: 0 }}
            //data to show in suggestion
            data={productList.length === 1 && comp(query, productList[0].attribute_name) ? [] : productList}
            //default value if you want to set something in input
            defaultValue={query}
            /*onchange of the text changing the state of the query which will trigger
            the findProduct method to show the suggestions*/
            onChangeText={text => this.setState({ query: text })}
            onSubmitEditing ={()=> this.seacrhProduct(this.state.query)}
            placeholder="Search for good health"
            renderItem={({ item }) => (
              //you can change the view you want to show in suggestion from here
              <TouchableOpacity onPress={() => { this.setState({ query: item.attribute_name }), this.seacrhProduct(item.attribute_name) }}>
                <Text style={styles.itemText}>
                  {item.attribute_name}
                </Text>
              </TouchableOpacity>
            )}
          />
          {/* </View> */}
          <View style={styles.MainContainer}>
          
            {this._ShowError()}
            {this._loadLoader()}
            {this.renederItemType()}
            
          </View>
        </View>
    //   </ImageBackground>
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
    backgroundColor: constants.Colors.color_WHITE,
    // opacity: .9
  },
  MainContainer: {
    justifyContent: 'center',
    // flex: 1,
    // marginTop:60,
    padding: 10,
  },
  imageThumbnail: {
    alignSelf: 'center',
    width: constants.vw(70),
    height: constants.vw(70),
  },
  autocompleteContainer: {
    position: 'absolute',
    left: 35,
    top: 0,
    width: '85%',
    backgroundColor: constants.Colors.color_WHITE,
    borderWidth: 0,
    zIndex: 2,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.Colors.color_intro,
  },
  ImageStyle: {
    // padding: 10,
    marginTop: 13,
    marginLeft: 10,
    // resizeMode: 'stretch',
    //alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});

const mapStateToProps = state => ({
  animate: state.indicator,
  error: state.error.err,
//   itemData: state.data.productData,
//   productName: state.data.searchProdName,
  my_wish_list :state.data.my_wish_list,
});

const mapDispatchToProps = dispatch => ({
  removeError: () => dispatch({ type: 'REMOVE_ERROR' }),
  loader: () => dispatch({ type: 'LOADING' }),
  // addToCart :(prodId)=> dispatch({type:'ADD_WISH_ITEM_TO_CART',id:prodId}),
  manageCartQty:(data) =>dispatch({type:'MANAGE-WISHPROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
  selectProdVariationInWish :(data)=>dispatch({type:"SET_PRODUCT_VARIATION_IN_WISH",prod_id:data.prod_id, variation:data.value}),
  addItemToCart :(data)=> dispatch(addItemToCart(data)),
  setCartItemLocal:()=>dispatch(setCartItemLocal()),

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchWishItem);
