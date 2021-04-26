import React, { Component,createRef } from 'react'
import {Platform ,BackHandler,ImageBackground, Dimensions,View, Image,Linking,Text,ToastAndroid,PermissionsAndroid, FlatList, StyleSheet, TouchableOpacity ,ScrollView,Alert,StatusBar} from 'react-native'
import { connect } from 'react-redux';
import { Loader } from '../customElement/Loader'
import { prod_image ,weburl,prod_variation_url } from '../constants/url'
import constants from '../constants'
//import storeImg from '../constants/Image'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import AboutFarm from './AboutFarm'
import Swiper from 'react-native-swiper'
import HTML from 'react-native-render-html'

import {fristLetterCapital,replaceAllSpace} from '../lib/helper'
//api call
import { getProduct, getProductType, searchProductType, getProductTypeByKeyword ,getCartItem,checkDelivery,getUserAddressList} from '../lib/api'
import Geolocation from 'react-native-geolocation-service';
import { checkVersion } from "react-native-check-version";
import FastImageComponent from '../customElement/FastImageComponent';
import ActionSheet from "react-native-actions-sheet";
import {BorderButton} from '../customElement/button';
import ErrorBox from '../customElement/ErrorBox'
import VersionInfo from 'react-native-version-info';
import {MainContentHeading,ProductTitle,MainHeading} from '../customElement/Input'

const regular = constants.fonts.Cardo_Regular;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const headerHeight = height;

const actionSheetRef = createRef();

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.onEndReachedCalledDuringMomentum = true;
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

  _loadLoader(){
    if (this.props.animate) {
      return (
        <Loader/>
      )
    }
  }

  async componentDidMount() {
    let app_menu = await this.props.getItem({ start: 1, end: 6 });
    //console.log(app_menu);
    this.setState({ productList: this.props.productName });
    if(app_menu == "success"){
      this.displayEnquireForm();
    }
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

  if(!this.props.cartItemSync){
    await this.props.getCartItem();
  }

  if(this.props.accessToken !="" && this.props.accessToken != null){
    this.props.getAddressList();
  }

  let deviceTokenData = await AsyncStorage.getItem('DEVICE_TOKEN');
    if(deviceTokenData != null){
      this.props.setDeviceData(JSON.parse(deviceTokenData));
    }
    
    const current_version = await VersionInfo.appVersion;
    if(current_version !=undefined && current_version !=null && !isNaN(current_version)){
      let current_ver = parseFloat(current_version);
      const version = await checkVersion({currentVersion:current_ver});

      //console.log(current_ver,"Got version info:", version,"current_version ",current_version);
      
      let requireUpdate = version.needsUpdate;
      if(requireUpdate !='' && requireUpdate === true){
        Alert.alert(
            'Farsmtop Application Update',
            'New version of the app is available. Do you want to update?',
              [
                {
                  text: 'Update',
                  onPress: () =>{Linking.openURL(version.url)}
                },
                {
                  text: 'Not Now',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
              ],
            { cancelable: false }
        );
      }
    }
  }

  async displayEnquireForm(){
    await actionSheetRef.current?.setModalVisible();
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
				(position) =>{
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
                        // Alert.alert(
                        //   'Location Alert',
                        //   'Delivery is not avaliable on your current address ,please select another location Location',
                        //   [
                        //     {
                        //       text: 'Select',
                        //       onPress: () => this.props.navigation.navigate("GoogleLocation")
                        //     },
                        //     {
                        //       text: 'Cancel',
                        //       onPress: () => console.log('Cancel Pressed'),
                        //       style: 'cancel'
                        //     },
                        //   ],
                        //   { cancelable: false }
                        // );
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

  onEndReached = ({ distanceFromEnd }) => {
    //console.log("dusitance",distanceFromEnd);
    if(!this.onEndReachedCalledDuringMomentum){
        this.setState({showFooter:true});
        this.onEndReachedCalledDuringMomentum = true;
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

  renederItemType(){
    let ItemList = this.props.itemData;
    if (ItemList != "undefined" && ItemList != null && ItemList.length>0){
      return(
        <View>
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
          ListHeaderComponent={<View style={{height:20}}/>}
          data={ItemList}
          renderItem={({ item }) => (
            <View style={{...styles.homeProdCat,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this._getItemType(item.id)}>
                <FastImageComponent
                  layout={styles.imageThumbnail}
                  image_url={replaceAllSpace(prod_image + item.img)}
                  resizeImage={"contain"}
                />
                  {/*<FastImage
                                      style={styles.imageThumbnail}
                                      source={{
                                        uri:replaceAllSpace(prod_image + item.img),
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable,
                                      }}
                                      resizeMode={FastImage.resizeMode.contain}
                                    />*/}

                <Text style={{
                  fontSize:constants.vw(13),
                  marginTop:constants.vw(9),
                  alignSelf:'center',
                  fontFamily:constants.fonts.Cardo_Bold,
                  textAlign:'center',
                  color:constants.Colors.color_heading
                }}
                >
                  {fristLetterCapital(item.title)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          numColumns={2}
          keyExtractor={(item) => item.id}

          // onEndReached={this.onEndReached.bind(this)}
          // onEndReachedThreshold={0.1}
          // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          
          ListFooterComponent={
            <View>
            {this.props.baskets.length >0?(<View style={{...styles.wrapper}}>
                <Swiper  activeDotColor={constants.Colors.color_statusbar} loop={true} autoplay={true} autoplayDirection={true} autoplayTimeout={6} scrollEnabled={true}>
                    {this.props.baskets.map((item,id)=>{
                        if(this.props.prodId != item.id){
                          let shortDesc = " <p> "+item.short_description+" </p>";
                            return (    
                                <View style={{flexDirection:'row',justifyContent:'space-evenly'}} key={id}>
                                    <FastImageComponent
                                      layout={{width:constants.width*0.4,height:constants.width*0.35,justifyContent:'center',alignItems:'center'}}
                                      image_url={replaceAllSpace(prod_variation_url+item.fimage)}
                                      resizeImage={"contain"}
                                    />
                                    <View style={{width:constants.width*0.5}}>
                                        <MainContentHeading title={item.attribute_name}/>
                                        <View style={{marginTop:constants.vh(10)}}>
                                            <HTML html={shortDesc}
                                                tagsStyles={{p:styles.tagLayout}}
                                            />
                                        </View>
                                        <TouchableOpacity style={{borderRadius:9,borderWidth:1,borderColor:constants.Colors.color_btn,padding:5,backgroundColor:constants.Colors.color_btn,marginTop:constants.vh(20),width:constants.vw(80)}}
                                            onPress={()=>{this.props.navigation.navigate("BasketScreen",{"basketId":item.id})}}
                                        >
                                            <Text style={{textAlign:'center',fontSize:constants.vh(14),fontFamily:constants.fonts.Cardo_Regular, color:constants.Colors.color_WHITE}}>
                                                View More
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                        })}
                </Swiper>
            </View>):(<View/>)}
            {/*this.renederAboutFarm()*/}
            <View style={{marginTop:constants.vh(30)}}>
                <AboutFarm/>
            </View>
            </View>
          }
        />
        </View>
      )
    }else if(!this.props.animate){
      return(
        <View>
          <ErrorBox btn_title={"Retry"} content={constants.constStrings.error_msg} onPress={()=>{this.props.getItem()}}/>
        </View>
      )
    }else{
      return(
        <View/>
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
              <View style={{marginTop:constants.vh(30)}}>
                  <AboutFarm/>
              </View>
      )
    }else{
      return(
        <View style={{height:constants.height*0.6}}/>
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
        <View style={{position:'absolute',bottom:10,width:constants.width*0.98,alignSelf:'center',backgroundColor:'white'}}>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(18)}}>Sourced from certified farms and Delivered to</Text>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(18)}}>your doorstep!</Text>
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

  selectPopOption(action){
    
    actionSheetRef.current?.hide();
    if(action == "yes"){
      this.props.navigation.navigate("AppartmentEnquiry");
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
          <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
          <View style={styles.MainContainer}>
            {this._ShowError()}
            {this.renederItemType()}
            {/*this.renderSourceSection()*/}
          </View>
          {this._loadLoader()}

            <ActionSheet
              ref={actionSheetRef} 
                //gestureEnabled={true}
                bounceOnOpen={true}
              style={{backgroundColor:'red'}}
            >
              
              <View style={{width:'90%',alignSelf:'center'}}>
                <Image source={constants.image.bottom_enquery_form} style={{width:'100%',height:constants.vw(200),alignSelf:'center',resizeMode:'contain'}}/>
                <MainHeading
                  title={"Would you want us to serve your Apartment/Society?"}
                  subTitle={'We are just a "form" away!'}
                />
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',alignSelf:'center',marginTop:constants.vh(25),marginBottom:constants.vh(25)}}>
                    
                    <BorderButton 
                      buttonName="YES!"
                      onPress={()=>this.selectPopOption("yes")}
                    />
                    <BorderButton 
                      buttonName="NO!" 
                      onPress={()=>this.selectPopOption("no")}
                    />

                </View>
              </View>
            </ActionSheet>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageThumbnail: {
    alignSelf: 'center',
    width: constants.vw(70),
    height: constants.vw(70),
    alignItems:'center',
    justifyContent:'center'
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
    width:constants.width,
    height: '50%',
    //flex: 1
  },
  wrapper:{
        marginTop:constants.vh(20),
        alignSelf:'center',
        width:constants.width*0.95,
        height:constants.width*0.5,
        borderRadius:8,
        backgroundColor:"white",
        marginBottom:constants.vh(10),
        borderColor:constants.Colors.color_lineGrey,
        borderWidth:1,
        elevation:4,
        padding:5

    },
    tagLayout:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vh(16)
    }
});

const mapStateToProps = state => ({
  animate: state.indicator,
  error: state.error.err,
  itemData: state.data.productData,
  productName: state.data.searchProdName,
  selectAddress:state.data.selectAddress,
  shippingPincode:state.data.shippingPincode,
  cartItemSync:state.data.cartItemSync,
  baskets:state.data.baskets,
  accessToken:state.data.token
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
  setDeviceData: (data) => dispatch({ type: 'SET_DIVECE_DATA',token:data.token, os:data.os}),
  getAddressList:() =>dispatch(getUserAddressList())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
