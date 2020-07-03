import React, { Component } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { Searchbar, shadow, TextInput } from 'react-native-paper';
import CustomStyles from "../constants/CustomStyles";
import { SearchBox, TextHeading } from '../customElement/Input'
import { TouchableOpacity } from 'react-native-gesture-handler';
import image from "../constants/Image";
class HomeScreen extends Component {
    
    renederItemType () {
        return(
            <View>
            <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between'}} >
		 		<TouchableOpacity  style={{ marginLeft:-10,alignItems: "center", paddingTop: 30,  }} activeOpacity={0}>
                    <Image source={image.organic} stye={{ paddingTop: 10 }} />
		 		</TouchableOpacity>
		 		<TouchableOpacity  style={{ marginLeft:-10,alignItems: "center", paddingTop: 30,  }} activeOpacity={0}>
                    <Image source={image.organic} stye={{ paddingTop: 10 }} />
		 		</TouchableOpacity>
		    </View>
                        <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between'}} >
                        <TouchableOpacity style={{ marginRight:-10 ,alignItems: "center", paddingTop: 30}} >
                           <Image source={image.farm} stye={{ paddingTop: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight:-10 ,alignItems: "center", paddingTop: 30}} >
                           <Image source={image.farm} stye={{ paddingTop: 10 }} />
                        </TouchableOpacity>
                   </View>
                               <View style={{ paddingHorizontal: 50, flexDirection: 'row', justifyContent: 'space-between'}} >
                               <TouchableOpacity  style={{ marginLeft:-10,alignItems: "center", paddingTop: 30,  }} activeOpacity={0}>
                                  <Image source={image.organic} stye={{ paddingTop: 10 }} />
                               </TouchableOpacity>
                               <TouchableOpacity  style={{ marginLeft:-10,alignItems: "center", paddingTop: 30,  }} activeOpacity={0}>
                                  <Image source={image.organic} stye={{ paddingTop: 10 }} />
                               </TouchableOpacity>
                          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
