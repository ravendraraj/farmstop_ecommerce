import React,{Component} from 'react'
import {ToastAndroid,View ,Text,StyleSheet, Alert ,Image,TouchableOpacity,ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import constants from '../constants'
import image from "../constants/Image"
import {logout,getNotification} from "../lib/api"

import {weburl} from '../constants/url'
import { navigate } from '../appnavigation/RootNavigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class DrawerContent extends Component{ 
    constructor(props){
        super(props);
        this.state={
            userID:"null",
            name:null,
            profile:null,
            displayMyOrderChild:false,
            displayMyAccChild:false,
            imageUri:''
        }
    }
    

    async componentDidMount() {
        // Execute the created function directly
        // await this.getUserDetails();
    }

    async getUserDetails() {
        try {
            let authData = await AsyncStorage.getItem("authData");
            if(authData != null){
                let objAuthData = JSON.parse(authData);
                 this.setState({userID:objAuthData.userId,name:objAuthData.name ,profile:objAuthData.profile});
                console.log(objAuthData.name+"-"+objAuthData.profile+"-"+objAuthData.email+"-"+objAuthData.userId+"-"+objAuthData.mobile);
            }
        } catch(e) {
        console.log(e);
        }
    }

_profileRender(){
    
    if(this.props.profile != "null" && this.props.profile != null && this.props.profile !=''){
            return(
                <Image 
                source={{ uri: this.props.profile}} 
                style={{width:constants.vw(100),height:constants.vw(100), borderRadius:constants.vw(50)}} 
            />
                
            )
    }else{
        return(
            <View>
                <TouchableOpacity style={{width:constants.vw(100),height:constants.vw(100),paddingTop:constants.vw(20),borderWidth:0,borderRadius:constants.vw(60),alignItems:'center',backgroundColor:"white",alignSelf:'center'}} onPress={() => this._redirect('My Profile')}>
                    <Icon 
                        name="user"
                        color={constants.Colors.color_BLACK}
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

_tabMyAccount(){
    if(this.state.displayMyAccChild ){
        this.setState({displayMyAccChild:false});
    }else{
        this.setState({displayMyAccChild:true});
    }
}

renderMyAccTab(){
    if(this.state.displayMyAccChild ){
        return(
            <View style={{marginLeft:25}}>
                <TouchableOpacity style={styles.childMenuTab} onPress={() => this._redirect('My Profile')}>
                    <Text style={styles.MenueLable}>Your Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.childMenuTab} onPress={() => this._redirect('ShippingAddress')}>
                    <Text style={styles.MenueLable}>Your Address</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

_tabMyOrderList(){
    if(this.state.displayMyOrderChild){
        this.setState({displayMyOrderChild:false});
    }else{
        this.setState({displayMyOrderChild:true});
    }
}

_redirect(routeParam){
    
    if(this.props.authUserID != null && this.props.authUserID != "null" && this.props.authUserID !=''){
        {/***this.props.navigation.navigate(routeParam);***/}
        
        if(routeParam === "Notification" && this.props.fetchNotification == true){
            this.props.getNotifications();
        }

        this.props.navigation.navigate(routeParam, {
            screen_name: "side_menu_bar",
        });
    }else{
        this.props.navigation.navigate("SocialLogin");
    }
}

renderMyOrder(){
    if(this.state.displayMyOrderChild){
        return(
            <View style={{marginLeft:25}}>
                <TouchableOpacity style={styles.childMenuTab} onPress={() => this._redirect('MyOrderTab')}>
                    <Text style={styles.MenueLable}>Track Your Order</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

renderLogout(){
    
    if(this.props.authUserID != null && this.props.authUserID != "null" && this.props.authUserID !=''){
        return(
            <TouchableOpacity style={{marginTop:constants.vh(20),marginBottom:constants.vh(20)}} onPress={() => this._logOutEvent()}>
                <Text style={styles.withOutIcon}>Logout</Text>
            </TouchableOpacity>
        )
    }
}

_renderSignUpAndLogin(){
    
    if(this.props.authUserID == null || this.props.authUserID == "null" || this.props.authUserID ==''){
        return(
            <TouchableOpacity style={{marginBottom:constants.vh(20)}} onPress={() => {this.props.navigation.navigate('SocialLogin')}}>
                <Text style={styles.withOutIcon}>Singup | Login</Text>
            </TouchableOpacity>
        )
    }
}

async _logOutEvent(){
    await this.props.logout();
}

 render(){

     return(
         <View style={{flex:1}}>
             <ScrollView>
            <ImageBackground
                style={{flex: 1}}
                source={constants.image.commonBg}
                resizeMode={'repeat'}
            > 
                <View style={{}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.closeDrawer()}} style={{alignSelf:'flex-end',padding:10}}>
                        <Icons name={"close"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>
                </View>
                 <View style={{flexDirection:"row",marginTop:-8,paddingBottom:constants.vw(20),paddingLeft:10}}>
                    {this._profileRender()}
                    <View style={{flex:1,marginTop:constants.vw(10),marginLeft:constants.vw(20),marginRight:3}}>
                        <Text style={styles.userName}>Hello !</Text>
                        <Text style={styles.userName}>{(this.props.userName != "" && this.props.userName != null)? this.props.userName: 'User'}</Text>
                    </View>
                </View>
            </ImageBackground>
                <View style={{paddingLeft:0,paddingTop:10}}>
                    <View style={{paddingLeft:10}}>
                    {this._renderSignUpAndLogin()}
                    </View>
                    <View style={{paddingLeft:10}}>

                    <TouchableOpacity style={styles.menuTab} onPress={()=>navigate("MainHome")}>
                    {/*<TouchableOpacity 
                        style={styles.menuTab}
                        onPress={()=>{this.props.navigation.navigate("MainHome")}}
                    >*/}
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.homeIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>Home</Text>
                        </View>
                        <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuTab} onPress={() => this._tabMyAccount()}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.profile} style={{width:constants.vw(18),height:constants.vw(24)}}/>
                            <Text style={styles.MenueLable}>My Account</Text>
                        </View>
                        <Icons name={(this.state.displayMyAccChild== true)?"angle-down":"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>
                    {this.renderMyAccTab()}

                    <TouchableOpacity style={styles.menuTab} onPress={() => this._tabMyOrderList()}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.myOrderIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>My Orders</Text>
                        </View>
                        <Icons name={(this.state.displayMyOrderChild== true)?"angle-down":"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>
                    {this.renderMyOrder()}
                    
                    <TouchableOpacity style={styles.menuTab} onPress={() => this._redirect('Wish List')}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.heartIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>Wish List</Text>
                        </View>
                        <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>

                    <View style={{width:'102%',borderColor:constants.Colors.color_platnium,borderBottomWidth:1,marginLeft:-8,marginTop:constants.vw(8),marginBottom:constants.vw(8)}}/>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('Faq')}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.questionIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>FAQ</Text>
                        </View>
                        <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this._redirect('Notification')}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.notificationIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>Notifications</Text>
                        </View>
                        <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>

                    <View style={{width:'102%',borderColor:constants.Colors.color_platnium,borderBottomWidth:1,marginLeft:-8,marginTop:constants.vw(8),marginBottom:constants.vw(8)}}/>

                    <View style={{marginLeft:25}}>
                        <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('Organic Certification')}}>
                            <Text style={styles.MenueLable}>Certificate</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('AboutFarm')}}>
                            <Text style={styles.MenueLable}>About Us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('AboutFarm')}}>
                            <Text style={styles.MenueLable}>Our Farms</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:'102%',borderColor:constants.Colors.color_platnium,borderBottomWidth:1,marginLeft:-8,marginTop:constants.vw(8),marginBottom:constants.vw(8)}}/>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('HowItWorks')}}>
                        <Text style={styles.withOutIcon}>How it works</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('ContactScreen')}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={constants.image.mailIcon} style={styles.icon}/>
                            <Text style={styles.MenueLable}>Contact Us</Text>
                        </View>
                        <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
                    </TouchableOpacity>
                    {this.renderLogout()}
                    </View>
                </View>
             </ScrollView>
        </View>
     )
 }
}

const styles = StyleSheet.create({
	MenueLable: {
        //fontFamily:constants.fonts.CardoBOLD,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(16),
        paddingLeft:10
        },
    TopMarginMenuLable:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:18,
        marginTop:-3,
        paddingLeft:10
    },
    menuTab:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        marginBottom:7,
        width:'90%'
    },
    icon:{
        width:constants.vw(18),
        height:constants.vw(18)
    },
    withOutIcon:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18)
    },
    profileWraper:{
        borderWidth:1,
        borderColor:'red',
        borderRadius: 50
    },
    profileText:{
        alignSelf:'center',
        fontSize:constants.vh(18)
    },
    uploadImage:{
        flex:1,
        width:constants.vh(100),
        height:constants.vh(100),
        borderWidth:1,borderColor:constants.Colors.color_WHITE,
        borderRadius:constants.vh(50),
        justifyContent:'center',
        backgroundColor:constants.Colors.color_WHITE,

    },
    userName:{
        fontFamily:constants.fonts.CardoBOLD,
        fontSize:constants.vh(22),
        color:constants.Colors.color_BLACK
    },
    childMenuTab:{
        flexDirection:'row',
        marginBottom:10,
        width:'80%'  
    },
    imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});
const mapStateToProps = state => ({
    fetchNotification:state.data.fetchNotification,
    animate: state.indicator,
    error:state.error.err,
    authEmail:state.data.authEmail,
    authMobile:state.data.authMobile,
    authUserID:state.data.authUserID,
    login_type:state.data.login_type,
    profile:state.data.profile,
    userName:state.data.authName
});

const mapDispatchToProps = dispatch => ({
    removeError: () => dispatch({type:'REMOVE_ERROR'}),
    getNotifications:()=>dispatch(getNotification()),
    logout:(data)=>dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);