import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet,Image,Text,Alert,ToastAndroid,FlatList} from 'react-native'
import {connect} from 'react-redux'
import constants from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {MainHeading} from './Input'
import {ProdBoxWithMargin} from './BlockComponent';

const HorizantalProductList=(props)=>{
	return(
        <View style={styles.prodBlock}>
            <FlatList
                showsVerticalScrollIndicator={false}
                //horizontal={true}
                data={props.productData}
                renderItem={({ item }) => (
                  <ProdBoxWithMargin
                    prodImage={item.fimage !=''?(props.imgUrlPrefix+item.fimage):''}
                    prodData={item}
                  />
                )}
                numColumns={2}
                keyExtractor={(item) => item.id}
            />

        </View>
	)
}

const styles = StyleSheet.create({
    textLayout:{
        fontSize:constants.vw(16),
        color:constants.Colors.text_theme_color
    },
	prodBlock:{
        width:constants.width,
        alignSelf:'center',
        backgroundColor:constants.Colors.color_WHITE,
        borderRadius:0,
        elevation:0,
        padding:constants.vw(2),
        //marginTop: constants.vw(5),
        backgroundColor:constants.Colors.light_grey
    },
});

export default HorizantalProductList;