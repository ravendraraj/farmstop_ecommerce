import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {TextHeading} from '../customElement/Input'
import {ButtonWithIcon,StickyButtonComponent} from '../customElement/button'
import ShareApp from '../customElement/ShareApp'
import {logout} from "../lib/api"

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
                    style={{width:constants.vw(120),height:constants.vw(120), borderWidth:2,borderRadius:constants.vw(60),alignSelf:'center'}}
                />
            )
        }else{
            return(
                <View style={{width:constants.vw(120),height:constants.vw(120),paddingTop:constants.vw(30),borderWidth:2,borderRadius:constants.vw(60),alignItems:'center',backgroundColor:"white",alignSelf:'center'}}>
                    <Icon 
                        name="user"
                        color={constants.Colors.color_BLACK}
                        size={50}
                    />
                </View>
            )
        }
    }

    async _logOutEvent(){
        await this.props.logout();
    }

    render(){
        if(this.props.authUserID !=''){
            return(
                <View style={styles.container}>
                    <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                   {/*<TextHeading title="My Profile"/>*/}
                    <ScrollView>
                    <View style={{width:'100%',alignSelf:"center",backgroundColor:constants.Colors.color_WHITE,paddingBottom:10}}>
                        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                            <View
                              style={{
                                backgroundColor: '#fff',
                                width: "100%",
                                borderRadius:10,
                                shadowColor: '#000',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity:  0.4,
                                shadowRadius: 3,
                                elevation: 5,
                                paddingBottom:constants.vh(20),
                                paddingTop:constants.vh(20)
                              }} 
                            >

                                {this.renderProfileImage()}
                                <Text style={{fontSize:18,fontFamily:constants.fonts.Cardo_Bold,marginTop:10,alignSelf:'center'}}>{this.props.userName}</Text>
                                
                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                    <Material name={"email-outline"} size={constants.vh(20)} color={constants.Colors.color_grey}/>
                                    <Text style={{fontSize:constants.vh(17),fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',color:constants.Colors.color_grey,marginLeft:constants.vw(5)}}>{(this.props.authEmail != null && this.props.authEmail != "")?this.props.authEmail:'Not available'}</Text>
                                </View>
                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                    <Material name={"phone"} size={constants.vh(20)} color={constants.Colors.color_grey}/>
                                    <Text style={{fontSize:constants.vh(17),fontFamily:constants.fonts.Cardo_Regular,marginLeft:constants.vw(5)}}>{ (this.props.authMobile != "null" && this.props.authMobile != "null" && this.props.authMobile != "")? this.props.authMobile: 'Not available'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'95%',alignSelf:'center',marginTop:constants.vw(40)}}>

                            <ButtonWithIcon buttonName={"Your Orders"} leftIcon={constants.image.myOrderIcon} rightIcon={"arrow-right"} isImg={true} onPress={()=>{this.props.navigation.navigate("MyOrderTab")}}/>
                            <ButtonWithIcon buttonName={"Address"} leftIcon={"location-pin"} rightIcon={"arrow-right"} isImg={false} onPress={()=>{this.props.navigation.navigate("ShippingAddress",{screen_name: "side_menu_bar"})}}/>
                            {/*<ButtonWithIcon buttonName={"Logout"} leftIcon={"logout"} rightIcon={""} isImg={false} onPress={()=>this._logOutEvent()}/>*/}
                            
                        </View>
                        <View style={{width:'95%',alignSelf:'center',marginTop:constants.vw(20)}}>
                            <ShareApp title={constants.constStrings.shareAppIconProfile}/>
                        </View>

                        </View>
                    </ScrollView>

                    <StickyButtonComponent
                        onPress={()=>this.props.navigation.navigate("EditProfile",{screen_name:'MyProfile'})}
                        button_title={"Edit Profile"}
                    />
                </View>
            )
        }else{
            this.props.navigation.navigate("SocialLogin");
            return null;
        }
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
    logout:(data)=>dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

