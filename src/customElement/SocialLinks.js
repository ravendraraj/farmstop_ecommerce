import React from 'react'
import {View,Text ,TouchableOpacity,Image,Linking} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import constants from '../constants'
import {youtubeUrl,facebookUrl,instagramUrl,linkedInUrl} from '../constants/url'
import {MainContentHeading} from '../customElement/Input'

const SocialLinks =(props) =>{
    let iconSize = props.size;
    return(
        <View>
            <MainContentHeading
                title={"Know your source :"}
            />
            <Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Regular}}>check out our farms and follow us on</Text>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',width:'90%',alignSelf:"center",paddingTop:10,paddingBottom:30}}>
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
        </View>
    )
}

export default SocialLinks;