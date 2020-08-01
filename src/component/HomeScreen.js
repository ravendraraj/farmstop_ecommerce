import React, { Component } from 'react'
import { ImageBackground, View, Image, Text, ToastAndroid, FlatList, StyleSheet, TouchableOpacity ,ScrollView,Alert} from 'react-native'
import { connect } from 'react-redux';
import { Loader } from '../customElement/Loader'
import { prod_image } from '../constants/url'
import constants from '../constants'
import storeImg from '../constants/Image'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
//api call
import { getProduct, getProductType, searchProductType, getProductTypeByKeyword ,getCartItem} from '../lib/api'


const regular = constants.fonts.Cardo_Regular;
class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      query: '',
    };

    if(!this.props.cartItemSync)
     this.props.getCartItem();
  }

  _loadLoader() {
    if (this.props.animate) {
      return (
        <Loader />
      )
    }
  }


  async componentDidMount() {
    this.props.getItem({ start: 1, end: 6 });
    this.setState({ productList: this.props.productName });
    
    if(this.props.productName.length <= 0){
      await this.props.searchProductType();
    }
    
    //get fetch location
    if(this.props.selectAddress == null){
      try{
        //await AsyncStorage.removeItem("userShippingAdd");
        let address = await AsyncStorage.getItem("userShippingAdd");
        
        if(address == null){
          
          Alert.alert(
            "Get Shipping Address",
            "Please select shipping address",
            [
              { text: "OK", onPress: () => this.props.navigation.navigate("GoogleLocation") }
            ],
            { cancelable: false }
          );

        }else{
          let addressArray =  JSON.parse(address);
          //console.log(addressArray.address +" "+ addressArray.postal_code +" "+addressArray.shippingCharges);
          // this.props.shippingAddress({address:addressArray.address , shipping_cost:addressArray.shippingCharges, pincode:addressArray.postal_code});
        }
      }catch(e){
        console.log(e);
      }
  }

  if(!this.props.cartItemSync)
    await this.props.getCartItem();

  }

  async  getLocation(params) {
		try {
	
			let data = await AsyncStorage.getItem(params);
			return data;
	
		}catch(e) {
			console.log(e);
		}
	}

  findProduct(query) {
    //method called everytime when we change the value of the input
    if (query === '' || query.length <= 2) {
      //if the query is null then return blank
      return [];
    }

    if (this.props.productName.length > 0) {
      const { productList } = this.props.productName;
      //making a case insensitive regular expression to get similar value from the film json
      const regex = new RegExp(`${query.trim()}`, 'i');
      //return the filtered film array according the query from the input
      return this.props.productName.filter(prod => prod.attribute_name.search(regex) >= 0);
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


  renederItemType() {
    let ItemList = this.props.itemData;
    if (ItemList != "undefined" && ItemList != null) {
      return (
        <FlatList
          data={ItemList}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 4, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this._getItemType(item.id)}>
                <Image style={styles.imageThumbnail} source={{ uri: (prod_image + item.img) }} />
                <Text style={{ fontSize: constants.vw(13), marginTop:constants.vw(9), alignSelf: 'center', fontFamily: constants.fonts.Cardo_Bold }}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      )
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
    this.props.getProductTypeByKeyword({ prodKey:key ,screen:this.props.route.name});
    this.props.navigation.navigate('ProductType',{keyword:key});
  }

  renderSourceSection(){
    let ItemList = this.props.itemData;
    if (ItemList != "undefined" && ItemList != null) {
      return(
        <View style={{flex:1,justifyContent:"flex-end",marginBottom:10,}}>
          
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(18)}}>Sourced from our farms delivered to your home</Text>
                <Image source={constants.image.knowMoreSource} style={{width:constants.width-20,height:constants.width/4.5}}/>
                {/* <ScrollView onScroll={Alert.alert('i am call')}> */}
                  <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(16),alignSelf:'center'}}>scroll down to know your source</Text>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("AboutFarm")}>
                    <Image source={constants.image.scrollIcon} style={{width:constants.vw(25),height:constants.vw(25),alignSelf:'center'}}/>
                  </TouchableOpacity>
                {/* </ScrollView> */}
        </View>
      )
    }
  }

  render() {
    const { query } = this.state;
    const productList = this.findProduct(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <ImageBackground style={styles.imgBackground}
        resizeMode='contain'
        source={storeImg.appIntro1}>
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
            {/* <ScrollView style={{flex: 1}} onScroll={this._onScroll}> */}
            {this.renderSourceSection()}
            {/* </ScrollView> */}
          </View>
          {/* </ScrollView> */}
        </View>
      </ImageBackground>
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
    opacity: .9
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
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
  itemData: state.data.productData,
  productName: state.data.searchProdName,
  selectAddress:state.data.selectAddress,
  cartItemSync:state.data.cartItemSync,
});

const mapDispatchToProps = dispatch => ({
  getItem: (data) => dispatch(getProduct(data)),
  removeError: () => dispatch({ type: 'REMOVE_ERROR' }),
  loader: () => dispatch({ type: 'LOADING' }),
  getProductType: (data) => dispatch(getProductType(data)),
  getProductTypeByKeyword: (keyword) => dispatch(getProductTypeByKeyword(keyword)),
  setProdId: (data) => dispatch({ type: 'ACTIVE-PROD', id: data }),
  searchProductType: () => dispatch(searchProductType()),
  shippingAddress: (data) =>dispatch({ type : 'ASYNC_LOCATION_FETCHED',  address : data.address , shipping_cost:data.shipping_cost, pincode:data.pincode}),
  getCartItem:()=>dispatch(getCartItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
