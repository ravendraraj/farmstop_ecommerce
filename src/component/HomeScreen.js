import React, { Component } from 'react'
import {Platform ,BackHandler,ImageBackground, Dimensions,View, Image, Text, ToastAndroid,PermissionsAndroid, FlatList, StyleSheet, TouchableOpacity ,ScrollView,Alert} from 'react-native'
import { connect } from 'react-redux';
import { Loader } from '../customElement/Loader'
import { prod_image ,weburl } from '../constants/url'
import constants from '../constants'
import storeImg from '../constants/Image'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import AboutFarm from './AboutFarm'

//api call
import { getProduct, getProductType, searchProductType, getProductTypeByKeyword ,getCartItem,checkDelivery} from '../lib/api'
import Geolocation from 'react-native-geolocation-service';
import SocialLinks from '../component/SocialLinks'
const regular = constants.fonts.Cardo_Regular;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const headerHeight = height;
class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      query: '',
      dilevryStatus: false,
      checkedShippingArea : false,
      showFooter:false,
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
			    await this.checkCurrentLocForDelivery();

        }else{
		  //this.setState({dilevryStatus : true});
          let addressArray =  JSON.parse(address);
        //   console.log(addressArray.address +" "+ addressArray.postal_code +" "+addressArray.shippingCharges);
          await this.props.shippingAddress({address:addressArray.address , shipping_cost:addressArray.shippingCharges, pincode:addressArray.postal_code});
        }
      }catch(e){
        console.log(e);
      }
  }

  if(!this.props.cartItemSync)
    await this.props.getCartItem();

  }


  async  checkCurrentLocForDelivery() {
    try {
		  const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
				'title': 'Location Access Required',
				'message': 'This App needs to Access your location'
				}
			  );
			  
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			 Geolocation.getCurrentPosition(
				(position) => {
				    const currentLongitude = JSON.stringify(position.coords.longitude);
					  const currentLatitude = JSON.stringify(position.coords.latitude);
				    // this.props.checkDelivery({lat:currentLatitude,lng:currentLongitude});
            let url = weburl + 'api-check-delivery-loc?lat='+currentLatitude+"&lng="+currentLongitude;
            console.log(url);

            fetch(url)
            .then(res =>{
                res.json()
                .then(response => {
                    //console.log(response);
                    if(response.status == "1"){
                            var userShipingAddress = {
                                "address" : response.address,
                                "postal_code":response.detail['pincode'],
                                "shippingCharges":response.detail['shipping_cost'],
                            }

                            AsyncStorage.setItem('userShippingAdd', JSON.stringify(userShipingAddress));
                            this.props.shippingAddress({address:response.address , shipping_cost:response.detail['shipping_cost'], pincode:response.detail['pincode']});
                        
                    }else{
                        // dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                        Alert.alert(
                          'Location Alert',
                          'Delivery is not avaliable on your current address ,please select another location Location',
                          [
                            {
                              text: 'Select',
                              onPress: () => this.props.navigation.navigate("GoogleLocation")
                            },
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel'
                            },
                          ],
                          { cancelable: false }
                        );
                    }
                })
                .catch( err => {
                    // dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
                })
            })
            .catch( err => {
                // dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
                navigate("internetError");
            });



					},
					(error) => {//console.log(error)
          },
					{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
			  	);

		  	}else {
				  alert("Permission Denied");
		  	}
		} catch (err) {
		//   alert("err",err);
		  console.warn(err)
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
    // console.log(prod_id,"Ravendra");
    await this.props.setProdId(prod_id);
    // console.log(this.props.route,"route");
     console.log(this.props.navigation);
        // this.props.navigation.reset({
        //   index: 1,
        //   routes: [
        //     {
        //       name: 'Product',
        //     },
        //   ],
        // })

    this.props.navigation.navigate('Product');
  }


  renederItemType() {
    let ItemList = this.props.itemData;
    if (ItemList != "undefined" && ItemList != null) {
      return (
        <FlatList
          ref={
            (c) => {
              this.flatList = c;
            }
          }
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.onScrollEnd}
          contentOffset={
            {x: 0, y: headerHeight}
          }
          data={ItemList}
          renderItem={({ item }) => (
            <View style={styles.homeProdCat}>
              <TouchableOpacity onPress={() => this._getItemType(item.id)}>
                <Image style={styles.imageThumbnail} source={{ uri: (prod_image + item.img) }} />
                <Text style={{ fontSize: constants.vw(13), marginTop:constants.vw(9), alignSelf: 'center', fontFamily: constants.fonts.Cardo_Bold }}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.1}
          onEndReached={()=>this.LoadMoreRandomData()}
          ListFooterComponent={
            this.renederAboutFarm()
          }
        />
      )
    }
  }

  onScrollEnd = (e) => {
    const scrollTop = e.nativeEvent.contentOffset.y;    
     
    if (scrollTop < headerHeight) {
      // console.log(scrollTop,"Ravendra");
      // Scrolls to top instead to y = 100
      if(scrollTop==0){
          this.setState({showFooter:false});
      }
    }
  }

  LoadMoreRandomData(){
    this.setState({showFooter:true});
    // Alert.alert("Hii");
    //console.log("loader");
  }

  renederAboutFarm(){
    if(this.state.showFooter){
      return(
              <View style={{marginTop:constants.vh(60)}}>
                  <AboutFarm/>
              </View>
      )
    }else{
      return(
        <View style={{width:'100%',height:height/1.5}}/>
      )
    }
  }

  _ShowError() {
    // if (this.props.error) {
    //   ToastAndroid.showWithGravity(this.props.error, ToastAndroid.SHORT, ToastAndroid.TOP);
    //   setTimeout(() => {
    //    this.props.removeError();
    //   }, 1000);
    // }
  }

  seacrhProduct(key) {
    // Alert.alert(key);
    this.props.getProductTypeByKeyword({ prodKey:key ,screen:this.props.route.name});
    this.props.navigation.navigate('ProductType',{keyword:key});
  }

  renderSourceSection(){
    let ItemList = this.props.itemData;
    //if (ItemList != "undefined" && ItemList != null) {
    if ( this.state.showFooter != true && ItemList != "undefined" && ItemList != null) {
      return(
        // <View style={{flex:1,justifyContent:"flex-end",marginBottom:constants.vw(14)}}>
        <View style={{position:'absolute',bottom:10,width:"100%",alignSelf:'center'}}>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(18)}}>Sourced from farm and Delivered to</Text>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(18)}}>your door step</Text>
            </View>
              <Image source={constants.image.knowMoreSource} style={{width:constants.vw(310),height:constants.vw(80),alignSelf:'center'}}/>
              <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(16),alignSelf:'center'}}>scroll down to know your source</Text>
            <Image source={constants.image.scrollIcon} style={{width:constants.vw(25),height:constants.vw(25),alignSelf:'center'}}/>  
        </View>
      )
    }
  }

  renderProdOnCheckDelivery(){
    if(this.props.shippingPincode == null && this.state.checkedShippingArea == true){
        Alert.alert(
          'Location Alert',
          'Delivery is not avaliable on your current address ,please select another location Location',
          [
            {
              text: 'Select',
              onPress: () => this.props.navigation.navigate("GoogleLocation")
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
          ],
          { cancelable: false }
        );
    }        
  }

  render() {
    const { query } = this.state;
    const productList = this.findProduct(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      //<ImageBackground style={styles.imgBackground}
        //resizeMode='contain'
        //source={storeImg.appIntro1}>

        <View style={styles.container}>
          {/* <View style={styles.SectionStyle}> */}
          {/*<AntDesign name="search1" size={20} color={constants.Colors.color_BLACK}
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
                    />*/}
          <View style={styles.MainContainer}>
            {this._ShowError()}
            {this._loadLoader()}
            {this.renederItemType()}
            {this.renderSourceSection()}
          </View>
        </View>
      //</ImageBackground>
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
    width:"100%",
    backgroundColor: constants.Colors.color_WHITE,
  },
  homeProdCat:{
    flex: 1, 
    flexDirection: 'column', 
    margin: constants.vw(4), 
    alignItems: 'center',
    paddingBottom:constants.vw(10)
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    width:'100%',
    marginTop:constants.vw(15),
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
  shippingPincode:state.data.shippingPincode,
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
  checkDelivery: (data) => dispatch(checkDelivery(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
