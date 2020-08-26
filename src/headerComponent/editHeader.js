import React from 'react'
import {Image} from 'react-native'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../constants'
import {navigate,navigateWithParams} from '../appnavigation/RootNavigation'

function editHeader({navigation,cartItem,title}){
    // onPress={() => {navigation.openDrawer()}}
    const openMenue =()=>{
        navigation.openDrawer()
    }

    const nav = (route)=>{
        console.log("Ravendra",title.children)
        {/*navigate(route);*/}
        navigateWithParams(route, {screen_name:"MyProfile"});
    }

    let totalProd = cartItem.length > 0 ? cartItem.length:0;
    return(
        <View style = {styles.head}>

            <View style={{flexDirection:"row",justifyContent:'flex-end',width:'100%'}}>
            {
                title.children == "MyProfile"?(<TouchableOpacity onPress={()=>nav("EditProfile")} style={{marginTop:20}}>
                    <Material name="lead-pencil" size={20} /> 
                </TouchableOpacity>):(<View/>)
            }
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    head:{
        flex:1,
        width:'100%',
        height:'100%',
        flexDirection :'row',
        alignSelf:'flex-end'
    },
    headText:{
        color:'black',
    },cartTextContainer:{
        position:'absolute',
        left:25,
        top:-5,
        zIndex:2,
    },cartText:{
        paddingLeft:5,
        paddingRight:5,
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:10,
        color:constants.Colors.color_WHITE,
        backgroundColor:constants.Colors.color_cartText,
        borderWidth:1,
        borderColor:constants.Colors.color_cartText,
        borderRadius:8,
    }
});


const mapStateToProps = state => ({
    cartItem :state.data.addedItems,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(editHeader);