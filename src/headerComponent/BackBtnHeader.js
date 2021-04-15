import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native'
import {connect} from 'react-redux'
import constants from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

function BackBtnHeader(props){
    
    const nav = (route)=>{
        props.navigation.navigate(route);
    }

    const toggleDrawer = () => {
      props.navigation.goBack();
    };
    
    return(
        <View>
            <View style={props.screenTitle!==""?styles.linearHead:styles.noShadow}>
                <TouchableOpacity onPress={()=> toggleDrawer()}>
                    <MaterialCommunityIcons name="arrow-left" color={constants.Colors.color_backBtn} size={constants.vw(24)} style={{marginLeft:10}}/>
                </TouchableOpacity>
                <View style={{marginLeft:15,marginTop:5,}}>
                    <Text>{props.screenTitle}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    linearHead:{
        flexDirection :'row',
        paddingTop:constants.vw(10),
        paddingBottom:constants.vw(15),
        //borderBottomWidth:0.5,//updated
        //borderColor:constants.Colors.color_grey,//updated,
        backgroundColor:constants.Colors.color_WHITE,
        elevation:10
    },
    noShadow:{
        flexDirection :'row',
        paddingTop:constants.vw(10),
        paddingBottom:constants.vw(15),
        backgroundColor:constants.Colors.color_WHITE
    }
});


const mapStateToProps = state => ({
    // cartItem :state.data.addedItems,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(BackBtnHeader);