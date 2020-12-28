import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet,Text} from 'react-native'
import constants from '../constants'
import Share from 'react-native-share';

const ShareApp = props => {
	const shareApp=()=>{
		let appUrl = "https://play.google.com/store/apps/details?id=com.farmstop&hl=it";    
        let shareOptions={
            title: 'Share Farmstop Application',
            //url: appUrl,
            //message:"https://www.farmstop.in/\nHey,\n\tFarmstop is providing fresh organic veggies,fruits,greens and more.\n\n Get it free at \n"+appUrl,
            message:"https://www.farmstop.in/\nHey, Farmstop is providing fresh organic veggies,fruits,greens and more.\n\n Download the app\n"+appUrl,
        };

        Share.open(shareOptions).then(res =>{
            console.log(res);
	        }).catch(err => {
	            err && console.log(err);
	    });
	}

	return (
		<View>
			<Text 
				style={{
					color:constants.Colors.color_grey,
					fontSize:constants.vw(18),
					fontFamily:constants.fonts.Cardo_Bold,
					marginBottom:constants.vw(10),
					marginTop:constants.vw(5)
				}}
			>
				{props.title}
			</Text>
			<TouchableOpacity style={styles.shareAppBtn} onPress={()=>{shareApp()}}>
				<Text 
					style={{
						color:constants.Colors.color_WHITE,
						fontSize:constants.vw(16),
						fontFamily:constants.fonts.Cardo_Bold
					}}
				>
					Share
				</Text>
			</TouchableOpacity>
		</View>
	)
};

const styles =StyleSheet.create({
	shareAppBtn:{
		width:constants.vw(80),
		borderRadius:constants.vw(16),
		//borderWidth:1,
		backgroundColor:constants.Colors.color_heading,
		alignItems:'center',
		justifyContent:'center',
		padding:constants.vw(5),
		elevation:4
	}
});
export default ShareApp;