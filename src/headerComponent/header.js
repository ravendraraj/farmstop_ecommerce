import React from 'react'
import {Image} from 'react-native'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../constants'
import {navigate} from '../appnavigation/RootNavigation'

function header({navigation,cartItem}){
    // onPress={() => {navigation.openDrawer()}}
    const openMenue =()=>{
        navigation.openDrawer()
    }

    const cart = ()=>{
        navigate("MyCart");
    }

    let totalProd = cartItem.length > 0 ? cartItem.length:"";
    return(
        <View style = {styles.head}>
            {/* <TouchableOpacity style={{marginLeft:4}} >
                <Icon name="menu" size={30} onPress={openMenue} color={constants.Colors.color_BLACK}/>
            </TouchableOpacity> */}
            <View style={{flexDirection:"row",justifyContent:'flex-end',width:'100%'}}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>cart()}>
                    <Text style={{position:'absolute',left:15,top:0,zIndex:2,color:constants.Colors.color_BLACK}}>{totalProd}</Text>
                    {/* <Material name="cart" size={30} color={constants.Colors.color_BLACK}/> */}
                    <Image source={constants.image.cartIcon} style={{width:35,height:35}}/>
                </TouchableOpacity>

                <TouchableOpacity >
                    {/* <Icon name="user" size={28}/> */}
                    <Image source={constants.image.userIcon} style={{width:40,height:40}}/>
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
    }
});


const mapStateToProps = state => ({
    cartItem :state.data.addedItems,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(header);