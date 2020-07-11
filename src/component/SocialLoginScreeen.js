import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert ,Dimensions,Image} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class SocialLoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            forget : false,
            emailId :'',
        }
    }
    
    _renderForgetView(){
        this.setState({forget:true});
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

    _renderView(){
        if(this.state.forget == true){
            return(
                <View style={{width:'80%',alignSelf:"center"}}>
                            <TextHeading title="forgot password?" fontsize={25}/>
                            <View style={styles.inputBox}>
                                <PrimaryTextInput placeholder="Enter Email Id" onChangeText={(text) => this.setState({emailId:text})}/>
                            </View>
                            <TouchableOpacity style={{alignSelf:'center',marginTop:40}} onPress={()=>this._sendOtp()}>
                                <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
            )
        }else{
            return(
            <View style={{width:'80%',alignSelf:"center"}}>
                        <Image source={constants.image.social_login} style={{width:width/2,height:width/2,marginTop:height/20,alignSelf:'center'}}/>
                        
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Text style={styles.text}>Login Or Register</Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:10}}>
                            <TouchableOpacity>
                                <Image source={constants.image.gmail_icon} style={{width:65,height:45}}/>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Icon name="facebook-square" size={53} color={constants.Colors.color_facebook}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{alignSelf:'center',fontSize:28,fontFamily:constants.fonts.Cardo_Regular}}>or</Text>

                        <Text style={styles.text}>Register Here</Text>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Email/"/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Password" secureTextEntry={true}/>
                        </View>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginTop:20}} onPress={()=>this._renderForgetView()}>
                            <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Regular,color:constants.Colors.color_BLACK}}>Forget Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
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
        marginTop:20
    },
    text:{
        color:constants.Colors.color_BLACK,
        fontSize:25,
        fontFamily:constants.fonts.Cardo_Bold
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginScreen);

