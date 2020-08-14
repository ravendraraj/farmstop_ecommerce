import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions ,ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import {TextHeading} from '../customElement/Input'

const width = Dimensions.get('window').width;
class HowItWorks extends Component{
        render(){    
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.section}>
        
                        <TextHeading title="How it works"/>

                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{width:"15%"}}>
                                <Text style={styles.numConatiner}>1</Text>
                            </View>

                            <View style={styles.desc}>
                                <Text style={styles.boldText}>Place your Order</Text>
                                <Text style={styles.plainText}> 
                                    Once the order is placed
                                    and confirmed.
                                    We will start to process
                                    the order
                                </Text>
                            </View>
                            
                            <View style={styles.imageContainer}>
                                <Image source={constants.image.orderHowItWorks}
                                style={{position:'relative',right:20,zIndex:0,width:"150%",height:"120%",alignSelf:'center'}}/>
                            </View>
                        </View>

                        <Image source={constants.image.arcLeft} style={styles.arcImage}/>
                        <View style={{flex:1,flexDirection:'row'}}>
                            
                            <View style={styles.imageContainer}>
                                <Image source={constants.image.orderHarvested} style={styles.descImage}/>
                            </View>
                            <View style={styles.desc}>
                                <Text style={styles.boldText}>Order Harvested</Text>
                                <Text style={styles.plainText}> 
                                    Your order will be harvested
                                    packed and made ready for
                                    the delivery
                                </Text>
                            </View>
                            <View style={{width:"15%"}}>
                                <Text style={styles.numConatiner}>2</Text>
                            </View>
                            
                        </View>

                        <Image source={constants.image.arcRight} style={styles.arcImage}/>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{width:"15%"}}>
                                <Text style={styles.numConatiner}>3</Text>
                            </View>

                            <View style={styles.desc}>
                                <Text style={styles.boldText}>Order Delivered</Text>
                                <Text style={styles.plainText}> 
                                    Your order will xa delivered via
                                    our delivery partners safely adhering
                                    to all the safety.
                                </Text>
                            </View>

                            <View style={styles.imageContainer}>
                                <Image source={constants.image.deliverHowItWork} 
                                style={{position:'relative',right:20,zIndex:0,width:"160%",height:"100%",alignSelf:'center'}}/>
                            </View>
                        </View>

                    </View>
                 </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    section:{
        flex:1,
        flexDirection:'column',
        width:'90%',
        alignSelf:"center" ,
        marginBottom:constants.vh(20)
    },
    text:{
        fontSize:constants.vw(28),
        fontFamily:constants.fonts.Cardo_Bold
    },
    numConatiner:{
      paddingTop:10,
      fontSize:constants.vw(88),
      fontFamily:constants.fonts.Cardo_Bold,
      alignSelf:'center'
    },
    desc:{
        position:'relative',
        zIndex:1,
        paddingTop:20,
        width:"55%",
    },
    boldText:{
      fontSize:constants.vw(16),
      fontFamily:constants.fonts.Cardo_Bold    
    },
    plainText:{
      fontSize:constants.vw(16),
      fontFamily:constants.fonts.Cardo_Regular   
    },
    imageContainer:{
        width:"30%"
    },
    descImage:{
        position:'relative',
        zIndex:0,
        width:"140%",
        height:"120%",
        alignSelf:'center'
    },
    arcImage:{
        width:constants.vh(100),
        height:constants.vh(100),
        alignSelf:'center'
    },


})

const mapStateToProps = state => ({
    animate: state.indicator,
    error: state.error.err,
});

const mapDispatchToProps = dispatch => ({
    removeError: () => dispatch({type:'REMOVE_ERROR'}),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
