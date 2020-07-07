import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import constants from '../constants'
import {navigate} from '../appnavigation/RootNavigation'

export default function header({navigation}){
    // onPress={() => {navigation.openDrawer()}}
    const openMenue =()=>{
        navigation.openDrawer()
    }

    const cart = ()=>{
        navigate("MyCart");
    }

    return(
        <View style = {styles.head}>
            {/* <TouchableOpacity style={{marginLeft:4}} >
                <Icon name="menu" size={30} onPress={openMenue} color={constants.Colors.color_BLACK}/>
            </TouchableOpacity> */}
            <View style={{flexDirection:"row",justifyContent:'flex-end',width:'100%'}}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>cart()}>
                    <Material name="cart" size={30} color={constants.Colors.color_BLACK}/>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Icon name="user" size={28}/>
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