import React from 'react'
import {View,Text ,TouchableOpacity,Image,Linking} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import constants from '../constants'
import {youtubeUrl,facebookUrl,instagramUrl,linkedInUrl} from '../constants/url'

const SocialLinks =(props) =>{
    let iconSize = props.size;
    return(
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',width:'90%',alignSelf:"center",paddingTop:20,paddingBottom:30}}>
            <TouchableOpacity onPress={()=>Linking.openURL(instagramUrl)} style={{margin:5}}>
                {/* <Icon name="instagram" size={40} color={constants.Colors.color_facebook}/> */}
                <Image source={constants.image.instagram_logo} style={{width:45,height:45}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL(facebookUrl)}  style={{margin:5}}>
                <Icon name="facebook-square" size={45} color={constants.Colors.color_facebook}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL(linkedInUrl)} style={{margin:5}}>
                <Icon name="linkedin-square" size={45} color={constants.Colors.color_linkedin}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL(youtubeUrl)} style={{margin:5}}>
                <Icon name="youtube" size={45} color={constants.Colors.color_youtube}/>
            </TouchableOpacity>
        </View>
    )
}

export default SocialLinks;