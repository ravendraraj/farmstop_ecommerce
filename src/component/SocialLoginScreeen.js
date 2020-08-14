import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert ,Dimensions,Image} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign'
// import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {gmail_api_key} from '../constants/key'
import {AccessToken,GraphRequest,GraphRequestManager,LoginManager} from 'react-native-fbsdk'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import {loginValidation ,socialLogin} from '../lib/api'
import { Loader } from '../customElement/Loader'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class SocialLoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            forget : false,
            emailIdOrMobile :'',
            password:''
        }
    }

    _loadLoader() {
        if (this.props.animate) {
          return (
            <Loader />
          )
        }
      }

    componentDidMount(){
        GoogleSignin.configure({
            webClientId: gmail_api_key,
        });

        if(this.props.authEmail != "")
        {
            this.props.loginedIn("");
        }

    }
    
    _renderForgetView(){ 
        this.setState({forget:true});
    }

    _renderSignUpScreen(){
        navigate("SignUp");
    }

    setEmailMob(text){
       // console.log(text);
        this.setState({emailIdOrMobile:text});
    }
    
    submitManualReg(){
        if(this.state.emailIdOrMobile !='' && this.state.password !=""){
                //Alert.alert(this.state.emailIdOrMobile+"  "+this.state.password);
                this.props.manualLogin({email:this.state.emailIdOrMobile, password:this.state.password})
                
                //reset user data
                // this.setState({
                //     emailIdOrMobile:'',
                //     password:''
                // })

        }else{
            Alert.alert("Please Fill Email id or Mobile number");
        }
    }

    _showMsg(){
        Alert.alert(
            "Recover Password",
            "You Entered this email : "+ this.state.emailId,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confrim", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );      
    }

    _sendOtp(){
        if(this.state.emailId == ''){
            //Alert.alert("Not get Email Id");
        }else{
            this._showMsg();
            //Alert.alert("Email ID ="+ this.state.emailId);
        }
    }

    _signIn = async () => {
        console.log("sigin in call");
        try {

            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //   this.setState({ userInfo });
            var user_data = [];
            user_data["id"] = userInfo.user.id;
            user_data["email"] = userInfo.user.email;
            user_data["name"] = userInfo.user.name;
            user_data["first_name"] = userInfo.user.givenName;
            user_data["last_name"] = userInfo.user.familyName;
            user_data["social_type"] = "GMAIL";
            user_data["image"] = userInfo.user.photo;
            
            //send sever request for saving data
            await this.props.social_login(user_data);

            // console.log(userInfo)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            //Alert.alert(error.code)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            //Alert.alert(error.code)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
           console.log(error.code)
          } else {
            // some other error happened
            console.log(error.code)
          }
        }
      };


    _renderView(){
       
            return(
            <View style={{width:'80%',alignSelf:"center"}}>
                        <Image source={constants.image.social_login} style={styles.socialImage}/>
                        
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Text style={styles.text}>Login Or Register</Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:(height/35)}}>
                            <TouchableOpacity onPress={this._signIn}>
                                <Image source={constants.image.gmail_icon} style={styles.gmaiIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.loginWithFacebook}>
                                <Icon name="facebook-square" size={constants.vh(60)} color={constants.Colors.color_facebook}/>
                            </TouchableOpacity>

                        </View>

                        <Text style={{alignSelf:'center',fontSize:constants.vh(25),fontFamily:constants.fonts.Cardo_Regular,marginTop:constants.vw(8)}}>or</Text>

                        <Text style={styles.text}>Login Here</Text>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Email/Mobile Number" onChangeText={(text)=>this.setEmailMob(text)}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Password" secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})} onSubmitEditing={()=>this.submitManualReg()}/>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity style={{alignSelf:'flex-end',marginTop:constants.vw(10)}} onPress={()=>this._renderSignUpScreen()}>
                                <Text style={{fontSize:constants.vh(20),fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_BLACK}}>Create Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignSelf:'flex-end',marginTop:constants.vw(10)}} onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                                <Text style={{fontSize:constants.vh(20),fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_BLACK}}>Forget Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{alignSelf:'center',backgroundColor:'red',alignItems:'center'}}> */}
                            <Text style={{textAlign:'center',fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(15),marginTop:constants.vw(10)}}>
                                Having issue signing up, please write to us at info@farmstop.in
                            </Text>
                        {/* </View> */}

                        <TouchableOpacity style={{alignSelf:'flex-end',paddingRight:constants.vw(10),paddingLeft:constants.vw(10),borderWidth:1,borderColor:constants.Colors.color_BLACK,borderRadius: 5,marginBottom:constants.vw(2),marginTop:-3}} onPress={()=>this.props.navigation.navigate('MainHome')}>
                                <Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_BLACK}}>SKIP</Text>
                        </TouchableOpacity>
                    </View>
            )
    }

    getInfoFromToken = (token) => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id,name,first_name,last_name,email,picture.type(large)',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, userInfo) => {
            if (error) {
                this._LoginError();
            } else {
            //   this.setState({userInfo: user});
              console.log('result:', userInfo);
                var user_data = [];
                user_data["id"] = userInfo.id;
                user_data["email"] = userInfo.email;
                user_data["name"] = userInfo.name;
                user_data["first_name"] = userInfo.first_name;
                user_data["last_name"] = userInfo.last_name;
                user_data["social_type"] = "FACEBOOK";
                user_data["image"] = userInfo.picture.data.url;
                console.log(user_data);            
                this.saveFbLoginData(user_data);
              //https://graph.facebook.com/1650578358457019/picture?type=normal

            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      };

      async saveFbLoginData(user_data){
            await this.props.social_login(user_data);
      }
    
      loginWithFacebook = () => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logOut();
        LoginManager.logInWithPermissions(['public_profile']).then(
          login => {
            if (login.isCancelled) {
                this._LoginError();
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
              });
            }
          },
          error => {
            // console.log('Login fail with error: ' + error);
            this._LoginError();
          },
        );
      };

    _LoginError() {
        Alert.alert(
            "Login Error",
            "Something went wrong ,Please try again later",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
        this.props.removeError(); 
    }

    _ShowError() {
        if (this.props.error) {
            Alert.alert(
                "Error Message",
                this.props.error,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
              this.props.removeError(); 
        }
      }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    {/* {this._ShowError()} */}
        	        {this._loadLoader()}
                    {this._renderView()}
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
        // marginTop:20
    },
    text:{
        marginTop:constants.vh(10),
        color:constants.Colors.color_BLACK,
        fontSize:constants.vh(25),
        fontFamily:constants.fonts.Cardo_Bold
    },
    socialImage:{
        width:constants.vw(160),
        height:constants.vh(160),
        marginTop:(height/35),
        alignSelf:'center'
    },
    gmaiIcon:{
        width:constants.vw(60),
        height:constants.vh(50),
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
    animate: state.indicator,
    error: state.error.err,
    authEmail :state.data.authEmail,
});

const mapDispatchToProps = dispatch => ({
    removeError: () => dispatch({type:'REMOVE_ERROR'}),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
    manualLogin:(data)=>dispatch(loginValidation(data)),
    social_login:(data)=>dispatch(socialLogin(data)),
    loginedIn :(data) =>dispatch({type:'AUTHORIZED-USER', email:data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginScreen);

