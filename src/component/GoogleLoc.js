import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,PermissionsAndroid ,ToastAndroid,Alert} from 'react-native'
import { connect } from 'react-redux'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {checkDelivery} from '../lib/api'
import {Loader} from '../customElement/Loader'


class GoogleLoc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLongitude: '',//Initial Longitude
			currentLatitude: '',//Initial Latitude
		}
	}

	async requestLocationPermission() {
		try {
		  const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
			  'title': 'Location Access Required',
			  'message': 'This App needs to Access your location'
			}
		  )
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			//To Check, If Permission is granted
			// that.callLocation(that);

			Geolocation.getCurrentPosition(
				//Will give you the current location

				 (position) => {
					 console.log(position);
					const currentLongitude = JSON.stringify(position.coords.longitude);
					//getting the Longitude from the location json
					const currentLatitude = JSON.stringify(position.coords.latitude);
					//getting the Latitude from the location json
					this.setState({ currentLongitude:currentLongitude });
					//Setting state Longitude to re re-render the Longitude Text
					this.setState({ currentLatitude:currentLatitude });
					//Setting state Latitude to re re-render the Longitude Text

					this.props.checkDelivery({lat:currentLatitude,lng:currentLongitude});
				 },
				 (error) => {console.log(error)},
				 { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
			  );

		  } else {
			alert("Permission Denied");
		  }
		} catch (err) {
		//   alert("err",err);
		  console.warn(err)
		}
	}


	_loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
	}

	_showMessage(){
		console.log(this.props.success+"  -  "+this.props.error)
		if(this.props.success != null){
			Alert.alert(
				"Address Alert",
				this.props.success,
				[
				{ text: "OK", onPress: () => this.props.navigation.navigate("MainHome") }
				],
				{ cancelable: false }
			);
			this.props.removeError();
		}else if(this.props.error){
			ToastAndroid.showWithGravity(this.props.error, ToastAndroid.SHORT, ToastAndroid.TOP);
			this.props.removeError();
		}
		
	}
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:"white"}}>
			<View style={styles.container}>
				<TouchableOpacity onPress={()=>this.requestLocationPermission()} style={{width:30,height:30,marginTop:14}}>
					<Icon name="my-location" size={25} color={constants.Colors.color_BLACK}/>
				</TouchableOpacity>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<GooglePlacesAutocomplete
						placeholder={"Enter Address"}
						placeholderTextColor="gray"
						lavel={'geocode'}
						minLength={2} // minimum length of text to search
						autoFocus={true}
						ref={(instance) => { this.locationRef = instance }}
						autoCapitalize='sentences'
						returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
						listViewDisplayed={false}    // true/false/undefined
						fetchDetails={true}
						renderDescription={row => row.description} // custom description render
						onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

							//console.log('dataDetail', details.address_components);
							console.log(details);

							const addressDetails = details.address_components;
							const geometry = details.geometry;
							console.log(geometry.location['lat']);
							console.log(geometry.location['lng']);
							this.setState({ currentLongitude:geometry.location['lng'] });
							this.setState({ currentLatitude:geometry.location['lat'] });
							this.props.checkDelivery({lat:geometry.location['lat'],lng:geometry.location['lng']});



							// const countryName = addressDetails.filter(function (data) { if (data.types[0]) { return data.types[0] == "country" } });
							// const stateName = addressDetails.filter(function (data) { if (data.types[0]) { return data.types[0] == "administrative_area_level_1" } });
							// const cityName = addressDetails.filter(function (data) { if (data.types[0]) { return data.types[0] == "locality" } });
							// const { lat, lng } = details.geometry.location;
							// let countryNameVal = ''
							// let stateNameVal = ''
							// let cityNameVal = ''
							// if (countryName.length > 0) {
							// 	countryNameVal = countryName[0].long_name;
							// }
							// if (stateName.length > 0) {
							// 	stateNameVal = stateName[0].long_name;
							// }
							// if (cityName.length > 0) {
							// 	cityNameVal = cityName[0].long_name;
							// }

							// var addressData = {
							// 	businessCountry: countryNameVal,
							// 	businessState: stateNameVal,
							// 	businessCity: cityNameVal,
							// 	businessAddress: data.description,
							// 	businessLongitude: lng,
							// 	businesslatitude: lat
							// }
							//        this.props.navigation.state.params.onAddressSelect(addressData);
							//this.props.navigation.goBack();
						}}

						getDefaultValue={() => ''}

						query={{
							// available options: https://developers.google.com/places/web-service/autocomplete
							key: 'AIzaSyDV7cINGIE3Re1ACdMWbgcseonHpubiBjE',// taken from farmstop web
							input: 'delhi',
							types: 'geocode'
						}}

						fetchDetails ={true}

						styles={{
							textInputContainer: {
								backgroundColor: "#fff",
								borderBottomWidth:0,
								borderTopWidth:0,
								fontSize: 20,
								fontFamily: constants.fonts.Cardo_Bold,
							},
							description: {
								fontWeight: 'bold',
							},
							predefinedPlacesDescription: {
								color: '#fff'
							},
							textInput: {
								marginLeft: 0,
								marginRight: 0,
								height: 38,
								fontSize: 16,
								fontFamily: constants.fonts.Cardo_Regular,
							},
						}}


					/>

				</View>
				{this._loadLoader()}
				{this._showMessage()}
			</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		flexDirection:'row',
		justifyContent:'space-between',
		width:'90%',
		alignSelf:'center'
	},
	inputBox: {
		marginTop: 20
	}
})

const mapStateToProps = state => ({
	// itemtypeData :state.data.productVatiation,
	animate : state.indicator,
	success: state.error.success,
	error: state.error.err,
	//address : state.data.selectAddress
});

const mapDispatchToProps = dispatch => ({
	checkDelivery: (data) => dispatch(checkDelivery(data)),
	removeError: () => dispatch({ type: 'REMOVE_ERROR' }),
	// knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoc);

