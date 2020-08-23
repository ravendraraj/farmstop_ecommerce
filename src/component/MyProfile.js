import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {TextHeading} from '../customElement/Input'
import {ButtonWithIcon} from '../customElement/button'
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
        return(
            <View style={styles.container}>
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
                            <Text style={{fontSize:17,fontFamily:constants.fonts.Cardo_Bold,alignSelf:'center',color:constants.Colors.color_grey}}>{(this.props.authEmail != null && this.props.authEmail != "")?this.props.authEmail:'Not available'}</Text>
                            <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Regular,marginTop:0,alignSelf:'center'}}>{ (this.props.authMobile != "null" && this.props.authMobile != "null" && this.props.authMobile != "")? this.props.authMobile: 'Not available'}</Text>
                        </View>
                    </View>
                    <View style={{width:'95%',alignSelf:'center',marginTop:constants.vw(40)}}>
                        <ButtonWithIcon buttonName={"Your Orders"} leftIcon={constants.image.myOrderIcon} rightIcon={"arrow-right"} isImg={true} onPress={()=>{this.props.navigation.navigate("MyOrderTab")}}/>
                        <ButtonWithIcon buttonName={"Address"} leftIcon={"location-pin"} rightIcon={"arrow-right"} isImg={false} onPress={()=>{this.props.navigation.navigate("ShippingAddress",{screen_name: "side_menu_bar"})}}/>
                        <ButtonWithIcon buttonName={"Logout"} leftIcon={"logout"} rightIcon={""} isImg={false} onPress={()=>this._logOutEvent()}/>
                        
                    </View>
                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={{width:'98%',alignSelf:'center',justifyContent:'flex-end',alignItems:'center',backgroundColor:constants.Colors.color_WHITE,borderWidth:1,borderColor:constants.Colors.color_grey,borderRadius:5,marginBottom:10,backgroundColor:constants.Colors.color_heading}}
                    onPress={()=>this.props.navigation.navigate("EditProfile",{screen_name:'MyProfile'})}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:20,padding:10,color:constants.Colors.color_WHITE}}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
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
    },
    blockShadow:{
        width:'100%',
        alignSelf:'center',
        marginTop:constants.vh(30),
        backgroundColor:constants.Colors.color_WHITE,
        borderRadius:10,
        shadowRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        elevation: 1    
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

