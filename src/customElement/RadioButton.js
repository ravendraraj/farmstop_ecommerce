import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet} from 'react-native'
import constants from '../constants'

const RadioButton = props => {

	return (
		<TouchableOpacity style={styles.circle} onPress={props.onPress}>
			{props.checked == "select" ? (<View style={styles.checkedCircle} />) : (<View />)}
		</TouchableOpacity>
	)
};

const styles =StyleSheet.create({
	circle:{
		height:20,
		width:20,
		borderRadius:10,
		borderWidth:1,
		borderColor:'black',
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal:10,
	},
	checkedCircle:{
		width:14,
		height:14,
		borderRadius:7,
		borderColor:'black',
		backgroundColor:constants.Colors.color_intro
	}

});
export default RadioButton;