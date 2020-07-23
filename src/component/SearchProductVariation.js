import React, { Component } from 'react'
import { ImageBackground, View, Image, Text, ToastAndroid, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux';
import { Loader } from '../customElement/Loader'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'
import Autocomplete from 'react-native-autocomplete-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { prod_variation_url } from '../constants/url'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
//helper function
import { fristLetterCapital } from '../lib/helper'

//api call
import { getProduct, getProductType, setWishListItemOnServer, getProductTypeByKeyword } from '../lib/api'
import { Picker } from '@react-native-community/picker';

const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
class SearchProductVariation extends Component {
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


	async componentDidMount() {
		//this.props.getItem({ start: 1, end: 6 });
		this.setState({ productList: this.props.productName });
		//await this.props.searchProductType();
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

			return this.props.productName.filter(prod => (prod.attribute_name.search(regex) >= 0 && prod.product_id == this.props.activeProd));
		} else {
			return [];
		}
	}

	_ShowError() {
		if (this.props.error) {
			ToastAndroid.showWithGravity(this.props.error, ToastAndroid.SHORT, ToastAndroid.TOP);
			//   setTimeout(() => {
			this.props.removeError();
			//   }, 2000);
		}
	}

	seacrhProduct(key) {
		// Alert.alert(key);
		this.props.getProductListForSearch({ prodKey: key, screen: this.props.route.name })
		//this.props.navigation.navigate('ProductType',{keyword:key});
	}

	_addinWishList = data => {
		// data.isMyWish =! "heart" ? "heart-outline": "heart";
		if (this.props.authEmail != "" || this.props.authMobile != '') {
			//this.props.setWishInLocal(data);//save in local
			this.props.setWishListItemOnServer(data); //save in server
			this.props.addInWish(data.id);
			this.props.addSearchItemInWish(data.id);
		} else {
			ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
		}
	};

	_manageProdQty = (prod, variationId, typeaction) => {
		if (variationId != "") {
			this.props.manageQty({ prodId: prod, typeOfAct: typeaction ,screen: this.props.route.name});
		} else {
			ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
		}
	}

	_addInCart(prodCatId_id, ProdVariationID, Itemid, navigateToCart) {

		if (ProdVariationID != '') {
			this.props.addToCart({Itemid:Itemid ,screen: this.props.route.name});
		} else {
			ToastAndroid.showWithGravity("Please First Select Variation", ToastAndroid.SHORT, ToastAndroid.TOP);
		}
	}

	setVariationType(variationValue, prod_id) {
		console.log(variationValue);
		//ToastAndroid.showWithGravity(variationValue+" - "+prod_id, ToastAndroid.SHORT, ToastAndroid.TOP);
		this.props.selectProdVariation({ prod_id: prod_id, value: variationValue ,screen: this.props.route.name});
	}

	variationOpt = (variation) => {

		return (variation.map((item, index) => {
			return (<Picker.Item label={item.varition} key={index} value={item.varition} />)
		}));
	}

	selectQtyDetail(item) {
		if (item.selectedVariationID != '') {
			return (
				<Text style={{ fontSize: 16, fontFamily: regular, marginLeft: 10 }}>{(item.selectedQtyVariation + " | QTY:" + item.selectedQty)} </Text>
			)
		}
	}

	_knowMore(prod_id) {
		this.props.knowMore({ prodId: prod_id, screen: this.props.route.name });
		navigate("knowMoreProd");
	}

	renderSearchList() {

		let ItemList = this.props.searchProductList;
		if (ItemList != "undefined" && ItemList.length > 0) {

			let updateItemList = ItemList.map(item => {
				if (item.isMyWish == '') {
					item.isMyWish = 'heart-outline';
				}
				return item;
			});

			return (
				// <View style={{marginTop:-100}}>
				<FlatList
					data={updateItemList}
					renderItem={({ item }) => (
						<View style={{ marginBottom: 10 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
								{/* <TouchableOpacity onPress={()=>this._getItemType(item.id)}> */}
								<View>
									<Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url + (item.fimage).replace(' ', '_')) }} />
									<TouchableOpacity style={{ position: 'absolute', top: -4, right: 0 }}
										onPress={() => this._addinWishList(item)}>
										<Material name={item.isMyWish} color={constants.Colors.color_grey} size={25} />
									</TouchableOpacity>
									{/* <Text style={{fontSize:12,marginTop:10,alignSelf:'center',fontFamily:regular}}>{fristLetterCapital(item.attribute_name)}</Text> */}
								</View>
								{/* </TouchableOpacity> */}

								{/** Select Option */}
								<View style={{ width: '50%' }}>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity style={{ marginRight: 8, marginLeft: 5 }}
											onPress={() => this._manageProdQty(item.id, item.selectedVariationID, 'remove')}>
											<Material
												name="minus-circle-outline"
												color={constants.Colors.color_grey}
												size={25}
											/>
										</TouchableOpacity>

										<Picker
											selectedValue={item.selectedVariationID == "" ? "" : item.selectedQtyVariation}
											// mode="dropdown"
											style={{ height: 50, width: 110, marginTop: -12, fontFamily: constants.fonts.Cardo_Bold }}
											onValueChange={(value) => (this.setVariationType(value, item.id))}
										>
											<Picker.Item label="Select" value="Select" />
											{this.variationOpt(item.variation_details)}
										</Picker>
										{/* <Text style={{fontSize:20,fontFamily:bold}}>{item.selectedQty >0 ?item.selectedQty:"Select"}</Text> */}
										<TouchableOpacity style={{ marginLeft: 8 }}
											onPress={() => this._manageProdQty(item.id, item.selectedVariationID, 'add')}>
											<Material
												name="plus-circle-outline"
												color={constants.Colors.color_grey}
												size={25}
											/>
										</TouchableOpacity>
									</View>
									{this.selectQtyDetail(item)}
									{/**Price section */}
									<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
										<Text style={{ fontSize: 20, fontFamily: bold }}>Rs. {(item.selectedVariationID != '') ? item.selectedQtyPrice : item.price}</Text>
										<TouchableOpacity style={{ padding: 2, flexDirection: 'row', backgroundColor: constants.Colors.color_heading, width: 85, alignSelf: 'flex-end', justifyContent: 'center', borderRadius: 4 }}
											onPress={() => this._addInCart(item.product_id, item.selectedVariationID, item.id, true)}>
											<Material name="cart" size={15} color={constants.Colors.color_BLACK} />
											<Text style={{ fontSize: 12, fontFamily: regular }}>Add to Cart</Text>
										</TouchableOpacity>
									</View>

									{/**Know More  section */}
									{/* <TouchableOpacity style={{alignSelf:'center',marginTop:15}} onPress={()=>this._knowMore(item.id)}>
                            <Text style={{fontFamily:bold}}>Know More</Text>
                        </TouchableOpacity> */}
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ width: "40%" }}>
									<Text style={{ fontSize: 12, alignSelf: 'center', fontFamily: regular }}>{fristLetterCapital(item.attribute_name)}</Text>
								</View>
								<View style={{ width: "50%" }}>
									<TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this._knowMore(item.id)}>
										<Text style={{ fontFamily: bold }}>Know More</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}
					//Setting the number of column
					numColumns={1}
					ListHeaderComponent={() => (
						<View style={{ width: '100%', height: 20, marginBottom: 10 }}>
						</View>
					)}
					ItemSeparatorComponent={() => (
						<View style={{
							alignSelf: 'center', height: 2, width: "90%", backgroundColor: "#000", marginBottom: 10,
							backgroundColor: constants.Colors.color_grey
						}}>
						</View>
					)}
					ListFooterComponent={() => (

						<View style={{ width: '100%', height: 60 }}>
						</View>
					)}

					// keyExtractor={(item) => item.id}
					keyExtractor={(item, index) => item.id.toString()}
				// extraData={this.state}
				//onEndReachedThreshold={0.5}
				//onEndReached={this.LoadMoreRandomData}

				/>
				// </View>
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
		const { query } = this.state;
		const productList = this.findProduct(query);
		const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());
		return (
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
					onSubmitEditing={() => this.seacrhProduct(this.state.query)}
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
					{this.renderSearchList()}
				</View>
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
	searchProductList: state.data.searchProductList,
	productName: state.data.searchProdName,
	activeProd: state.data.activeProduct,
});

const mapDispatchToProps = dispatch => ({
	getItem: (data) => dispatch(getProduct(data)),
	removeError: () => dispatch({ type: 'REMOVE_ERROR' }),
	loader: () => dispatch({ type: 'LOADING' }),
	getProductType: (data) => dispatch(getProductType(data)),
	getProductListForSearch: (data) => dispatch(getProductTypeByKeyword(data)),
	setProdId: (data) => dispatch({ type: 'ACTIVE-PROD', id: data }),
	selectProdVariation: (data) => dispatch({ type: "SET_PRODUCT_VARIATION", prod_id: data.prod_id, variation: data.value, screen: data.screen }),

	knowMore: (data) => dispatch({ type: 'KNOW_MORE_ABOUT_PROD', prodTypeId: data.prodId, screen: data.screen }),
	addToCart :(data)=> dispatch({type:'ADD_TO_CART',id:data.Itemid ,screen:data.screen}),
	manageQty:(data) =>dispatch({type:'ADD-PROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct ,screen:data.screen}),
	setWishListItemOnServer : (data)=>dispatch(setWishListItemOnServer(data)),
	addInWish:(data) => dispatch({type:'ADD-WISH', activeProdId:data}),
	addSearchItemInWish :(data)=>dispatch({type:'SEARCH-PROD-ADD-WISH',activeProdId:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductVariation);
