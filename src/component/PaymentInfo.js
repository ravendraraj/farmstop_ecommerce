import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert,SafeAreaView,Image} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation';
import image from "../constants/Image"
import {TextHeading} from '../customElement/Input'

class PaymentInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            forget : false,
            emailId :'',
        }
    }


    _renderView(){
        
            return(
                    <View style={{flex:1,alignSelf:'center',width:"90%",marginTop:constants.vw(10)}}>
                        <TextHeading title="Payment Information" fontsize={constants.vw(25)}/>
                        
                        <View style={{marginTop:constants.vw(90)}}>
                            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                <View style={{flex:1,flexDirection: 'row'}}>
                                    <Image source={constants.image.checkIcon} style={{width:constants.vw(30),height:constants.vw(30),marginTop:constants.vw(5)}}/>
                                    <Text style={{fontSize:constants.vw(25),fontFamily:constants.fonts.Cardo_Regular,marginLeft:10,color:constants.Colors.color_blue}}>Credit Card</Text>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                    <Image source={constants.image.masterIcon} style={styles.icons}/>
                                    <Image source={constants.image.visaIcon} style={styles.icons}/>
                                </View>
                            </View>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Card number"/>
                            </View>

                            <View style={{flex:1,flexDirection: 'row' ,justifyContent:'space-between'}}>
                                <View style={{width:"40%"}}>
                                    <PrimaryTextInput placeholder="Security Code" secureTextEntry={true}/>
                                </View>
                                <View style={{width:"40%"}}>
                                    <PrimaryTextInput placeholder="Expiry date"/>
                                </View>
                            </View>
                        </View>
                        
                        
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}}>
                            <Text style={{fontSize:30,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Confirm Payment</Text>
                        </TouchableOpacity>
                    </View>
            )
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView>
                    <TextHeading title="My Profile"/>
                    <ScrollView>
                        {this._renderView()}
                    </ScrollView>
                </SafeAreaView>
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
    },
    icons:{
        width:constants.vw(60),
        height:constants.vw(40),
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);

