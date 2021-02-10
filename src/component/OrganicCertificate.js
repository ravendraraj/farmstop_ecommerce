import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,SafeAreaView,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import {TextHeading} from '../customElement/Input'
import {navigate} from '../appnavigation/RootNavigation'
import FastImage from 'react-native-fast-image'

const width = Dimensions.get('window').width;
export default function OrganicCertificate(props){
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                <ScrollView>
                    <View style={{width:'95%',alignSelf:"center"}}>
                        <View style={{flex:1,marginTop:constants.vw(5)}}>
                            <Text style={styles.paragraph}>Farmstop organic farms is a 32 hectare (80+ acre) organic farms located in Ramasamudram in AP bordering Karnataka.</Text>
                            <Text style={styles.paragraph}>
                                We encourage farmers to take up organic farming by supporting them in understanding the technical know-hows and nuances of preparing pesticides and fertilizers, this is done without any charges and sheerly out of a passion for organic farming, thus creating a sustainable planet.
                            </Text>

                            <Text style={styles.paragraph}>
                                We have been practicing organic farming for the last 5 years and are in 2nd year for conversion from Aditi certifications We use age-old techniques and organic methods in our farms. Pesticides are made in house using plants that are effective in controlling pests and are also beneficial to the plants. Fertilizers are prepared out of animal husbandry bi-products, dry compost, waste decomposers, etc..
                            </Text>
                            <TouchableOpacity onPress={()=>{navigate("ImageViewerScreen")}}>
                                <FastImage
                                    style={styles.certificateBlock}
                                    source={{
                                        uri:"https://www.farmstop.in/uploads/certificate/c1.jpeg",
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />

                                <FastImage
                                    style={styles.certificateBlock}
                                    source={{
                                        uri:"https://www.farmstop.in/uploads/certificate/c2.jpeg",
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />

                                <FastImage
                                    style={styles.certificateBlock}
                                    source={{
                                        uri:"https://www.farmstop.in/uploads/certificate/c3.jpeg",
                                        priority: FastImage.priority.normal,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                {/*<Image source={{uri:"https://www.farmstop.in/uploads/certificate/c1.jpeg"}} style={styles.certificateBlock}/>
                                                                <Image source={{uri:"https://www.farmstop.in/uploads/certificate/c2.jpeg"}} style={styles.certificateBlock}/>
                                                                <Image source={{uri:"https://www.farmstop.in/uploads/certificate/c3.jpeg"}} style={styles.certificateBlock}/>
                                                                <Image source={{uri:"https://www.farmstop.in/uploads/certificate/c4.jpeg"}} style={styles.certificateBlock}/>*/}
                            </TouchableOpacity>

                            <View style={{width:constants.width,height:40}}/>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    text:{
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold
    },
    paragraph:{
        color:constants.Colors.color_BLACK,
        fontFamily:constants.fonts.Cardo_Italic,
        fontSize:18,
        padding:5,
    },
    certificateBlock:{
        alignSelf:'center',
        width:constants.width*0.95,
        height:constants.height*0.7,
        resizeMode:'contain',

    }

})


