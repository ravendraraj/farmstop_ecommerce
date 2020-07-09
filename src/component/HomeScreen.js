import React, { Component } from 'react'
import { Alert,View, Image, Text, ToastAndroid, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { SearchBox, TextHeading } from '../customElement/Input'
import { Loader } from '../customElement/Loader'
import { prod_image } from '../constants/url'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';

//api call
import { getProduct, getProductType, searchProductType,getProductTypeByKeyword } from '../lib/api'
//import { constants } from 'fs';
const regular = constants.fonts.Cardo_Regular;
class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      query: '',
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
    this.props.getItem({ start: 1, end: 6 });
    this.setState({ productList: this.props.productName });
  }

  findProduct(query) {
    //method called everytime when we change the value of the input
    if (query === '' || query.length <=2) {
      //if the query is null then return blank
      return [];
	}
	
    const { productList } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return productList.filter(prod => prod.attribute_name.search(regex) >= 0);
  }


  _getItemType(prod_id) {
    this.props.getProductType(prod_id)
    // Alert.alert("Selected Prod"+prod_id);    
    this.props.loader();
    navigate('ProductType');
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
                <Text style={{ fontSize: 12, marginTop: 10, alignSelf: 'center', fontFamily: regular }}>{item.title}</Text>
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
      }, 2000);
    }
  }

  seacrhProduct(key){
    // Alert.alert(key);
    this.props.getProductTypeByKeyword({key})
    navigate('ProductType');
  }

  render() {
    const { query } = this.state;
    const productList = this.findProduct(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
		{/* <View style={styles.SectionStyle}> */}
			<AntDesign name="search1" size={20} color={constants.Colors.color_BLACK} 
			style={styles.ImageStyle}/>

			<Autocomplete
				autoCapitalize="none"
				autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={{borderWidth:0}}
        style={{color:constants.Colors.color_grey,fontSize:18}}
        
        listStyle={{borderWidth:0}}
				//data to show in suggestion
				data={productList.length === 1 && comp(query, productList[0].attribute_name) ? [] : productList}
				//default value if you want to set something in input
				defaultValue={query}
				/*onchange of the text changing the state of the query which will trigger
				the findProduct method to show the suggestions*/
				onChangeText={text => this.setState({ query: text })}
				placeholder="Search for good health"
				renderItem={({ item }) => (
					//you can change the view you want to show in suggestion from here
					<TouchableOpacity onPress={() => {this.setState({ query: item.attribute_name }),this.seacrhProduct(item.attribute_name)}}>
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
    backgroundColor: constants.Colors.color_WHITE
  },
  MainContainer: {
    justifyContent: 'center',
	flex: 1,
	// marginTop:60,
    padding: 10,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  autocompleteContainer: {
    position:'absolute',
    left:35,
	  top:0,
	  width:'85%',
    backgroundColor: constants.Colors.color_WHITE,
    borderWidth: 0,
    zIndex:2,
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
});

const mapStateToProps = state => ({
  animate: state.indicator,
  error: state.error.err,
  itemData: state.data.productData,
  productName: state.data.searchProdName,
});

const mapDispatchToProps = dispatch => ({
  getItem: (data) => dispatch(getProduct(data)),
  // selecttProd:(data)=>dispatch({type:'SELECT_PRODUCT',prodId:data}),
  removeError: () => dispatch({ type: 'REMOVE_ERROR' }),
  loader: () => dispatch({ type: 'LOADING' }),
  getProductType: (data) => dispatch(getProductType(data)),
  searchProductType: () => dispatch(searchProductType()),
  getProductTypeByKeyword: (keyword) => dispatch(getProductTypeByKeyword(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
