import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, Alert, Dimensions, ScrollView } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import image from "../constants/Image";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {updateDeviceTokenOnServer} from '../lib/api';
import constants from '../constants';
import {navigate} from '../appnavigation/RootNavigation';
import PushController from './PushController';

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
		key: 'three',
		text: 'Loooking for authentic and genuine Organic Produce.',
		image: image.appIntro3,
		backgroundColor: '#F7BB64',
	},
];

const introDoneTest = false; 
class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_Main_App: false,
			logined:false,
		};
		
	}
	
	
	async componentDidMount() {

		let deviceTokenData = await AsyncStorage.getItem('DEVICE_TOKEN');
        if(deviceTokenData != null){
        	console.log("Welcome Screen");
            this.props.setDeviceData(JSON.parse(deviceTokenData));
        }
        
		const res = await AsyncStorage.getItem('introHadDone');
		if(res === "introHadDone"){
				console.log("notification checked");
				this.setState({ show_Main_App: true });
				this.getAsyncData("authData").then((authData) => {
					if(authData != null){
						// this.setState({ show_Main_App: true });
						let objAuthData = JSON.parse(authData);
						if(this.props.userdata.authUserID =='' || this.props.userdata.authUserID == null){
						this.props.loginedIn({email:objAuthData.email, mobile:objAuthData.mobile ,userId:objAuthData.userId ,profile:objAuthData.profile,login_type:objAuthData.Login_Type,authName:objAuthData.name,token:objAuthData.token});
						setTimeout(function(){
							navigate('DrawerScreen');  
						}, 1000);
						}
					}else{
						navigate('NotLogin');
					}
			});
		}
	}

	async  getAsyncData(params) {
		try {
	
			let data = await AsyncStorage.getItem(params);
			return data;
	
		}catch(e) {
			console.log(e);
		}
	}

	_onDone(){
		AsyncStorage.setItem('introHadDone', 'introHadDone');
		AsyncStorage.setItem('WishItem', 'NULL'); //for wishList Storage
		this.props.navigation.navigate('NotLogin');
	}

	_renderExploreMore(key){
		if(key === 'three'){
			return (
				<TouchableOpacity style={styles.exploreMoreBtn} onPress={()=>this._onDone()}>
					<Text style={{fontSize:14,color:constants.Colors.color_WHITE,fontFamily:constants.fonts.Cardo_Bold}}>EXPLORE MORE</Text>
				</TouchableOpacity>
				
			);
		}
	  };


	_renderItem = ({ item }) => {
			if (item.key === 'one') {
				return (
					<View style={styles.container}>
								<Image source={item.image} style={{marginTop:constants.vh(100)}}/>
								<Text style={styles.text}>{item.text}</Text>
									<View style={styles.barndCss}>
										<Image source={image.brand1} style={{ width:300, height: 70 }} />
									</View>
									<View style={styles.barndCss}>
										<View style={{flex:1, flexDirection: 'row', justifyContent: 'center' }} >
											<Image source={image.fssai} style={{ width: 90, height: 90 }} />
											<Image source={image.indiaOrganic} style={{ width: 90, height: 90 }} />
										</View>
									</View>
					</View>
				);
			} else {
				return (
					<View style={styles.container}>

						<Image source={item.image} style={ item.key === 'two' ? styles.silder2 : styles.silder3}/>
						<View style={{flex: 1,justifyContent:'flex-end',marginBottom:90}}>
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
		return(
			<>
			{
		      (this.state.show_Main_App)?(
					<View style={{...styles.container,justifyContent:'center'}}>
					<Image source={constants.image.welcomeLogo} style={{alignSelf:'center',width:constants.width*0.9,height:constants.width*0.9,resizeMode:'cover'}}/>
					<Text style={styles.welcomText}>Welcome to farmstop</Text>
				</View>):(<AppIntroSlider
					renderItem={this._renderItem}
					data={slides}
					dotStyle={{ backgroundColor: 'black' }}
					activeDotStyle={{ backgroundColor: '#7F462C' }}
					showNextButton = {false}
					showDoneButton = {false}
				/>)
			}
			<PushController/>
			</>
		)
	}

}

const styles = StyleSheet.create({
	text: {
		color: '#7F462C',
		textAlign: 'center',
		fontSize: 20,
		padding: 20,
		fontFamily:constants.fonts.Cardo_Regular
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor:'white'
	},
	silder2: {	
		justifyContent:'center',
		width:constants.vh(400),
		height:constants.vh(400),
		marginTop:constants.vh(150)
	},
	silder3: {
		// // flex:1,
		justifyContent:'center',
		width:constants.vh(400),
		height:constants.vh(400),
		marginTop:constants.vh(150)
	},
	paragraph: {
		textAlign: 'center',
		color: constants.Colors.color_intro,
		fontSize:20,
		alignSelf:'auto',
		marginBottom:2,
		fontFamily:constants.fonts.Cardo_Regular,
	},
	welcomText: {
		color: '#7F462C',
		textAlign: 'center',
		fontSize: 25,
		padding: 20,
		fontFamily:constants.fonts.Cardo_Bold
	},
	barndCss:{
		flex: 1,
		justifyContent: 'flex-end',
	},
	exploreMoreBtn:{
		alignSelf:'flex-end',
		paddingRight:10,
		paddingLeft:10,
		paddingTop:5,
		paddingBottom:5,
		borderWidth:1,
		borderColor:constants.Colors.color_BLACK,
		borderRadius: 5,
		borderColor: constants.Colors.color_heading,
		marginBottom:constants.vw(2),
		marginTop:4,
		marginRight:14,
		backgroundColor:constants.Colors.color_heading,
		elevation:10
	}
});

const mapStateToProps = state => ({
	// animate : state.indicator
	userdata:state.data,
});

const mapDispatchToProps = dispatch => ({
	introDone: data => dispatch({ type: 'APP_INTRO_DONE', data: data }),
	loginedIn :(data) =>dispatch({type:'AUTHORIZED-USER', email:data.email ,mobile:data.mobile ,userID:data.userId,profile:data.profile,login_type:data.login_type,authName:data.authName,token:data.token}),
	//loginedIn:(data)=>dispatch(updateDeviceTokenOnServer(data)),
	setDeviceData: (data) => dispatch({ type: 'SET_DIVECE_DATA',token:data.token, os:data.os}),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

