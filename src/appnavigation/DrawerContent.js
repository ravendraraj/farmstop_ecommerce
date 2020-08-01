import React,{Component} from 'react'
import {ToastAndroid,View ,Text,StyleSheet, Alert ,Image,TouchableOpacity,ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import constants from '../constants'
import image from "../constants/Image"
import {logout} from "../lib/api"

class DrawerContent extends Component{
    constructor(props){
        super(props);
        this.state={
            userID:"null",
            name:null,
            profile:null,
            displayMyOrderChild:false,
            displayMyAccChild:false,
            
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
                <TouchableOpacity style={styles.uploadImage}>

                    <Text style={styles.profileText}>Upload</Text>
                    <Text style={styles.profileText}>your</Text>
                    <Text style={styles.profileText}>image</Text>

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
                <TouchableOpacity style={styles.childMenuTab} onPress={() => this._redirect('AboutFarm')}>
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
        this.props.navigation.navigate(routeParam)
    }else{
        ToastAndroid.showWithGravity("Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
}

renderMyOrder(){
    if(this.state.displayMyOrderChild){
        return(
            <View style={{marginLeft:25}}>
                <TouchableOpacity style={styles.childMenuTab} onPress={() => this._redirect('pageNotFound')}>
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
         <View style={{flex:1,marginLeft:10}}>
             <ScrollView>
                 <View style={{flexDirection:"row",marginTop:constants.vw(20),marginBottom:constants.vw(20)}}>
                    {this._profileRender()}
                    <View style={{flex:1,marginTop:constants.vw(10),marginLeft:constants.vw(20),marginRight:3}}>
                        <Text style={styles.userName}>Hello</Text>
                        <Text style={styles.userName}>{(this.props.userName != "" && this.props.userName != null)? this.props.userName: 'User'}</Text>
                    </View>
                </View>
                <View>
                    {this._renderSignUpAndLogin()}
                    <TouchableOpacity style={styles.menuTab} onPress={() => this._tabMyAccount()}>
                        <Image source={constants.image.profile} style={{width:constants.vw(32),height:constants.vw(32)}}/>
                        <Text style={styles.MenueLable}>My Account</Text>
                    </TouchableOpacity>
                    {this.renderMyAccTab()}

                    <TouchableOpacity style={styles.menuTab} onPress={() => this._tabMyOrderList()}>
                        <Image source={constants.image.myOrderIcon} style={styles.icon}/>
                        <Text style={styles.MenueLable}>My Orders</Text>
                    </TouchableOpacity>
                    {this.renderMyOrder()}
                    
                    <TouchableOpacity style={styles.menuTab} onPress={() => this._redirect('WishList')}>
                        <Image source={constants.image.heartIcon} style={styles.icon}/>
                        <Text style={styles.MenueLable}>Wish List</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('OrderSuccuess')}}>
                        <Image source={constants.image.questionIcon} style={styles.icon}/>
                        <Text style={styles.MenueLable}>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('internetError')}}>
                        <Image source={constants.image.notificationIcon} style={styles.icon}/>
                        <Text style={styles.MenueLable}>Notifications</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft:25}}>
                        <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('AboutFarm')}}>
                            <Text style={styles.MenueLable}>About Us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('WishList')}}>
                            <Text style={styles.MenueLable}>Our Farms</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('HowItWorks')}}>
                        <Text style={styles.withOutIcon}>How it works</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuTab} onPress={() => {this.props.navigation.navigate('ContactScreen')}}>
                        <Image source={constants.image.mailIcon} style={styles.icon}/>
                        <Text style={styles.MenueLable}>Contact Us</Text>
                    </TouchableOpacity>
                    {this.renderLogout()}
                </View>
             </ScrollView>
        </View>
     )
 }
}

const styles = StyleSheet.create({
	MenueLable: {
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18),
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
        marginTop:7,
        marginBottom:7,
        width:'80%'
    },
    icon:{
        width:constants.vw(30),
        height:constants.vw(30)
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
        borderWidth:1,borderColor:'red',
        borderRadius:constants.vh(50),
        justifyContent:'center'
    },
    userName:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vh(20)
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
    // itemtypeData :state.data.productVatiation,
    animate: state.indicator,
    error: state.error.err,
    authEmail:state.data.authEmail,
    authMobile:state.data.authMobile,
    authUserID:state.data.authUserID,
    login_type:state.data.login_type,
    profile:state.data.profile,
    userName:state.data.authName
});

const mapDispatchToProps = dispatch => ({
    removeError: () => dispatch({type:'REMOVE_ERROR'}),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
    // manualLogin:(data)=>dispatch(loginValidation(data)),
    // social_login:(data)=>dispatch(socialLogin(data)),
    // loginedIn :(data) =>dispatch({type:'AUTHORIZED-USER', email:data}),
    logout:(data)=>dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);