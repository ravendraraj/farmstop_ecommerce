import React from 'react'
import {Image} from 'react-native'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import constants from '../constants'
import {navigate} from '../appnavigation/RootNavigation'

function main_screen_header({navigation,cartItem}){
    // onPress={() => {navigation.openDrawer()}}
    const openMenue =()=>{
        navigation.openDrawer()
    }

    const nav = (route)=>{
        navigate(route);
    }

    let totalProd = cartItem.length > 0 ? cartItem.length:0;
    return(
        <View style = {styles.head}>
            {/* <TouchableOpacity style={{marginLeft:4}} >
                <Icon name="menu" size={30} onPress={openMenue} color={constants.Colors.color_BLACK}/>
            </TouchableOpacity> */}
            <View style={{flexDirection:"row",justifyContent:'flex-end',width:'100%'}}>
            <TouchableOpacity style={{marginRight:20}} onPress={()=>nav("GoogleLocation")}>
                    <Image source={constants.image.liveLocIcon} style={{width:35,height:35}}/>
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight:20}} onPress={()=>nav("MyCart")}>
                    <View style={styles.cartTextContainer}>
                        <Text style={styles.cartText}>{totalProd}</Text>
                    </View>
                    {/* <Material name="cart" size={30} color={constants.Colors.color_BLACK}/> */}
                    <Image source={constants.image.cartIcon} style={{width:35,height:35}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>nav("MyProfile")}>
                    {/* <Icon name="user" size={25}/> */}
                    <Image source={constants.image.userIcon} style={{width:35,height:35}}/>
                </TouchableOpacity>
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
    },
    cartTextContainer:{
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

export default connect(mapStateToProps, mapDispatchToProps)(main_screen_header);