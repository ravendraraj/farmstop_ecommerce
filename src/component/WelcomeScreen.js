import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Alert, Dimensions, ScrollView } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import SellerInfoScreen from './SellerInfoScreen'
import image from "../constants/Image";
import { navigate } from '../appnavigation/RootNavigation'
import CustomStyles from "../constants/CustomStyles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../constants'

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
		this.props.introDone("introDone");
		Alert.alert("Async function call");
		AsyncStorage.setItem('introHadDone', 'introHadDone');
		console.log("seller");
		navigate('Drawer');
	}

	_renderExploreMore(key){
		if(key === 'three'){
			return (
				<TouchableOpacity style={{marginTop:10}} onPress={this._onDone}>
					<Text style={{fontSize:20,color:constants.Colors.color_heading,fontFamily:constants.fonts.Cardo}}>Explore More</Text>
				</TouchableOpacity>
			);
		}
	  };


	_renderItem = ({ item }) => {
			if (item.key === 'one') {
				return (
					<View style={CustomStyles.slide}>
						<ScrollView >
							<View style={{ alignItems: 'center' }}>
								<Image source={item.image} stye={{ paddingTop: 10 }} />
								<Text style={styles.text}>{item.text}</Text>
									{/* <View style={{marginBottom:40,padding:20}}> */}
										<View style={{ marginBottom:5,paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
											<Image source={image.brand1} style={{ width:300, height: 70 }} />
										</View>
										<View style={{ marginBottom:20,paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
											<Image source={image.fssai} style={{ width: 90, height: 90 }} />
											<Image source={image.indiaOrganic} style={{ width: 90, height: 90 }} />
										</View>
									{/* </View> */}
							</View>
						</ScrollView>
					</View>
				);
			} else {
				return (
					<View style={styles.container}>

						<Image source={item.image} style={styles.image}/>
						<View style={{marginTop:20,alignItems:'center'}}>

							<Text style={styles.paragraph}>
								{item.text}
							</Text>
							{this._renderExploreMore(item.key)}
						</View>
					</View >
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
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
	text: {
		color: '#7F462C',
		textAlign: 'center',
		fontSize: 20,
		padding: 20
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor:'white'
	},
	image: {
		alignSelf: 'center',
		justifyContent:'center',
	},
	paragraph: {
		textAlign: 'center',
		color: constants.Colors.color_intro,
		fontSize:20,
		alignSelf:'auto',
		marginBottom:2,
		fontFamily:constants.fonts.Cardo
	},
});


const mapStateToProps = state => ({
	// animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
	introDone: data => dispatch({ type: 'APP_INTRO_DONE', data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

