import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import CustomStyles from "../constants/CustomStyles";
import { TouchableOpacity } from 'react-native-gesture-handler';
class AboutFarm extends Component {
    
    renederItemType () {
        return(
            <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between'}} >
		 		<TouchableOpacity  style={{ marginLeft:-10,alignItems: "center", height: 100, width: 100, borderColor: 'red', borderWidth: 2, paddingTop: 30,  }} activeOpacity={0}>
					<Text style={{ fontSize: 30 }}> Sell </Text>
		 		</TouchableOpacity>
		 		<TouchableOpacity style={{ marginRight:-10 ,alignItems: "center", height: 100, width: 100, borderColor: 'red', borderWidth: 2, paddingTop: 30}} >
					<Text style={{ fontSize: 30 }}> Buy </Text>
	 			</TouchableOpacity>
		    </View>
        )
    }

    render() {
        return (

            <View style={CustomStyles.slide}>
                <ScrollView >
                <SearchBox
                    // title = {constants.constStrings.LOGIN_BUTTON_TITLE} 
                    autoCapitalize="none"
                    //onChangeText={(val) => this.textInputChange(val)}
                    placeholder={'Search for good health'}
                   />
                
         			{this.renederItemType()}
                
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    // animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
    // verify: data => dispatch(getLotDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutFarm);
