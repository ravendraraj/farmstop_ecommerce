import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {TextHeading} from '../customElement/Input'

const width = Dimensions.get('window').width;
class MyProfile extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }


    renderProfileImage()
    {
        if(this.props.profile != "null" && this.props.profile != "" && this.props.profile != null){
            return(
                <Image 
                    source={{uri:this.props.profile}} 
                    style={{width:constants.vw(90),height:constants.vw(90), borderWidth:2,borderColor:constants.Colors.color_grey,borderRadius:constants.vw(4)}}
                />
            )
        }else{
            return(
                <View style={{width:constants.vw(90),height:constants.vw(90),paddingTop:4,borderWidth:2,borderColor:constants.Colors.color_grey,borderRadius:constants.vw(4),alignItems:'center',backgroundColor:"white"}}>
                    <Icon 
                        name="user"
                        color={constants.Colors.color_BLACK}
                        size={50}
                    />
                </View>
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>
               {/*<TextHeading title="My Profile"/>*/}
                <ScrollView>
                    <View style={{width:'100%',alignSelf:"center",backgroundColor:constants.Colors.color_WHITE,paddingBottom:10}}>
                        <View style={{width:'100%',height:constants.vw(140),backgroundColor:constants.Colors.color_platnium,borderBottomWidth:0,borderColor:constants.Colors.color_grey}}>
                        </View>
                        <View style={{flexDirection:'row',padding:10,marginTop:-constants.vw(60)}}>
                            {this.renderProfileImage()}
                            <View style={{justifyContent:'flex-start',paddingLeft:20,marginTop:constants.vw(45)}}>
                                <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Regular,}}>{this.props.userName}</Text>
                            </View>
                            <View>
                            </View>
                        </View>
                        
                        <View style={{width:'95%',alignSelf:"center",backgroundColor:'white',marginTop:10}}>
                            <View style={styles.profileItem}>
                                <Icon 
                                    name="location-pin"
                                    color={constants.Colors.color_BLACK}
                                    size={20}
                                />
                                <View style={styles.block}>
                                {(this.props.selectAddress != null && this.props.selectAddress !='')?
                                (<Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Regular}}>{this.props.selectAddress}</Text>):(<TouchableOpacity style={styles.locationBtn}onPress={()=>this.props.navigation.navigate("GoogleLocation")}><Text style={{color:constants.Colors.color_BLACK,fontFamily:constants.fonts.Cardo_Regular}}>Select Address</Text></TouchableOpacity>)}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{width:'95%',alignSelf:"center",backgroundColor:'white',paddingBottom:10}}>
                        <View style={styles.profileItem}>
                                <Icon 
                                    name="phone"
                                    color={constants.Colors.color_BLACK}
                                    size={20}
                                />
                                <View style={styles.block}>
                                    <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Regular}}>{ (this.props.authMobile != "null" && this.props.authMobile != "null" && this.props.authMobile != "")? this.props.authMobile: 'Not available'}</Text>
                                </View>
                        </View>

                        <View style={styles.profileItem}>
                            <Image source={constants.image.mailIcon} style={styles.icon}/>
                            <View style={styles.block}>
                                <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Regular}}>{(this.props.authEmail != null && this.props.authEmail != "")?this.props.authEmail:'Not available'}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/*<View style={{justifyContent:'flex-end',alignItems:'center',backgroundColor:constants.Colors.color_platnium}}>
                                    <TouchableOpacity>
                                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:20,padding:10}}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    locationBtn:{
        padding:8,
    },
    icon:{
        width:constants.vw(30),
        height:constants.vw(30)
    },
    block:{
        marginLeft:10
    },
    profileItem:{
        flexDirection:'row',
        marginTop:10
    }

})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
    authEmail:state.data.authEmail,
    authMobile:state.data.authMobile,
    authUserID:state.data.authUserID,
    login_type:state.data.login_type,
    profile:state.data.profile,
    userName:state.data.authName,
    selectAddress:state.data.selectAddress
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

