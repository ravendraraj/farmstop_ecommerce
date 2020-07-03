import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Alert, Dimensions, ScrollView } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import SellerInfoScreen from './SellerInfoScreen'
import image from "../constants/Image";
import { navigate } from '../lib/RootNavigation'
import CustomStyles from "../constants/CustomStyles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const slides = [
	{
		key: 'one',
		text: 'Your ethical organic e-store',
		image: image.appIntro1,
		brandImg: image.brandImages,
		backgroundColor: '#F7BB64',
	},
	{
		key: 'two',
		text: 'Are you farmer and want to sell anything "Organic"',
		image: image.appIntro2,
		backgroundColor: '#F7BB64',
	},
	{
		key: 'three',
		text: 'Are you a consumer and want to Buy anything "Organic"',
		image: image.appIntro3,
		backgroundColor: '#F7BB64',
	},
	// {
	// 	key: 'sellbuyopt',
	// 	text: 'Are you a consumer and want to Buy anything "Organic"',
	// 	image: require('../images/slider3.png'),
	// 	backgroundColor: '#F7BB64',
	// },
];

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_Main_App: false,
			seller: false,
			buyer: false,
		};
		
	}
	
	
	_onDone = () => {
		Alert.alert("Async function call");
		AsyncStorage.setItem('introHadDone', 'introHadDone');
		console.log("seller");
		navigate('DrawerScreen');
	}

	_renderNextButton = () => {
		return (
		  <View style={styles.buttonCircle}>
			<AntDesign name="right" size={23}  color="rgba(255, 255, 255, .9)" />
		  </View>
		);
	  };

	  _renderDoneButton = () => {
		return (
		  <View style={styles.buttonCircle}>
			<TouchableOpacity onPress={this._onDone}>
				<AntDesign name="check" size={23}  color="rgba(255, 255, 255, .9)"/>
			</TouchableOpacity>
		  </View>
		);
	  };

	_renderItem = ({ item }) => {
		// if (item.key == 'sellbuyopt1') {
		// 	return (
		// 		<View style={CustomStyles.slide}>
		// 			<ScrollView>
		// 				<View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: height / 3.5 }} >
		// 					<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ marginRight: 25, alignItems: "center", height: 100, width: 100, borderColor: 'red', borderWidth: 2, paddingTop: 30, borderRadius: 50 }} activeOpacity={0} onPress={this._seller}>
		// 						<Text style={{ fontSize: 30 }}> Sell </Text>
		// 					</TouchableHighlight>
		// 					<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ marginLeft: 25, alignItems: "center", height: 100, width: 100, borderColor: 'red', borderWidth: 2, paddingTop: 30, borderRadius: 50 }} onPress={this._buyer}>
		// 						<Text style={{ fontSize: 30 }}> Buy </Text>
		// 					</TouchableHighlight>
		// 				</View>

		// 				<View style={{ alignItems: 'center', marginTop: 150 }}>
		// 					<TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ alignItems: "center", }} onPress={this._buyer}>
		// 						<Text style={{ fontSize: 20, color: 'green' }}> Explore More </Text>
		// 					</TouchableHighlight>
		// 				</View>
		// 			</ScrollView>

		// 		</View>
		// 	);
		// } else {
			if (item.key === 'one') {
				return (
					<View style={CustomStyles.slide}>
						<ScrollView >
							<View style={{ alignItems: 'center' }}>
								<Image source={item.image} stye={{ paddingTop: 10 }} />
								<Text style={styles.text}>{item.text}</Text>
								<View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
									<Image source={image.brand1} style={{ width:300, height: 70 }} />
								</View>
								<View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
									<Image source={image.fssai} style={{ width: 90, height: 90 }} />
									<Image source={image.indiaOrganic} style={{ width: 90, height: 90 }} />
								</View>
							</View>
						</ScrollView>
					</View>
				);
			} else {
				return (
					<View style={CustomStyles.slide}>
						<ScrollView >
							<View style={{ alignItems: 'center' }}>
								<Image source={item.image} />
								<Text style={styles.text}>{item.text}</Text>
							</View>
						</ScrollView>
					</View>
				);
			}
		// }
	};

	render() {
		if (this.state.show_Main_App) {
			return (
				<SellerInfoScreen />
			);
		} else {
			return (
				<AppIntroSlider
					renderItem={this._renderItem}
					data={slides}
					dotStyle={{ backgroundColor: 'black' }}
					activeDotStyle={{ backgroundColor: '#7F462C' }}
					renderDoneButton={this._renderDoneButton}
        			renderNextButton={this._renderNextButton}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		paddingTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 26,
		color: 'black',
		fontWeight: 'bold',
		alignItems: 'center',
		marginTop: 20,
	},
	text: {
		color: '#7F462C',
		textAlign: 'center',
		fontSize: 20,
		padding: 20
	},
	image: {
		width: 250,
		height: 250,
		resizeMode: 'contain',
	},
	buttonCircle: {
		width: 40,
		height: 40,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	  },
});


const mapStateToProps = state => ({
	// animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
	// verify: data => dispatch(getLotDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

