import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'

const width = Dimensions.get('window').width;
class AboutFarm extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width:'90%',alignSelf:"center"}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_BLACK ,fontSize:20}}>
                            Farmstop Organic farms
                        </Text>
                        <View style={{marginTop:10}}>
                            <Text
                            style={{color:constants.Colors.color_BLACK,fontFamily:constants.fonts.Cardo_Italic,fontSize:18}}>
                                Organic farming for us at "farmstop"is practiced with devotion and passion to contribute for a better society. We are certified organic farmers with a vision to change the way food is produced and consumed.
                            </Text>
                            <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_BLACK ,fontSize:20,marginTop:5}}>
                                A glimpse of our farms
                            </Text>
                            <Image source={constants.image.aboutFarm} style={{width:width-20,height:width-140,alignSelf:'center'}}/>
                            <Text style={{fontFamily:constants.fonts.Cardo_Italic,color:constants.Colors.color_BLACK ,fontSize:18,marginTop:30}}>
                                Please click the links below to understand how
                                we raise crops and what goes into the farms
                            </Text>
     
                            <View>
                                <SocialLinks size='25'/>
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
    inputBox:{
        marginTop:20
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutFarm);

