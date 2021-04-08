import React,{useState} from 'react'
import {View ,StyleSheet,ActivityIndicator,Image} from 'react-native'
import constants from "../constants"
import FastImage from 'react-native-fast-image'

function FastImageComponent(props){
	const [ isProgress, setProgress ] = useState(false);
	let caseAction = props.image_url !=""?props.resizeImage:'NO_IMAGE';
	switch (caseAction){
        case 'COVER':
		return(
			<FastImage
				style={props.layout}
				source={{
					uri: props.image_url,
					priority: FastImage.priority.high,
					cache: FastImage.cacheControl.immutable,
				}}
				resizeMode={FastImage.resizeMode.cover}
				onLoadStart={() => {setProgress(true)}}
				onLoadEnd={() => {setProgress(false)}}
			>
				<ActivityIndicator size="small" color={constants.Colors.secondary_color} animating={isProgress}/>
			</FastImage>
		);

		case "NO_IMAGE":
		return(
			<View>
				<Image style={props.layout} source={constants.image.noImageIcon}/>
			</View>
		)

		default:
		return(
			<FastImage
				style={{...props.layout,alignSelf:'center',justifyContent:'center'}}
				source={{
					uri: props.image_url,
					priority: FastImage.priority.high,
					cache: FastImage.cacheControl.immutable,
				}}
				resizeMode={FastImage.resizeMode.contain}
				onLoadStart={() => {setProgress(true)}}
				onLoadEnd={() => {setProgress(false)}}
			>
				<ActivityIndicator size="small" color={constants.Colors.color_statusbar} animating={isProgress}/>
			</FastImage>
		);
	}
}

export default FastImageComponent;