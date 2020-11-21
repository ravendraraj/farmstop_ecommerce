import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,ToastAndroid,Alert} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {TextHeading,PrimaryTextInput} from '../customElement/Input'
import {ButtonWithIcon,NormalButton} from '../customElement/button'
import {updateProfile} from "../lib/api"
import {emailValidations, mobileNoValidations} from '../lib/helper'
import {Loader} from '../customElement/Loader' 

const width = Dimensions.get('window').width;
class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            email:this.props.authEmail,
            mobile:this.props.authMobile,
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

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

    _submit(){
        let email =this.state.email;
        let mobile =this.state.mobile;
        if(!emailValidations(email)){
            ToastAndroid.showWithGravity("Please fill email", ToastAndroid.SHORT, ToastAndroid.TOP);
        }else if(!mobileNoValidations(mobile)){
            ToastAndroid.showWithGravity("Please fill correct mobile number ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }else{
            let screen_name = this.props.route.params.screen_name;
            this.props.updateProfile({email,mobile,screen_name});
        }
    }

    _showMsg(){
        let msg = this.props.popup;
        if(msg !="" && msg == "Update Profile")
        {
            ToastAndroid.showWithGravity("Profile Update Successfully.", ToastAndroid.SHORT, ToastAndroid.TOP);
            this.props.remove_popup();
        }
    }

    _sendMessage(){
        Alert.alert(
            'Farmstop',
            "Sorry, you can't change your email from your existing account",
            [
                {
                    text: 'Go Back',
                    onPress: () => this.props.navigation.navigate(this.props.route.params.screen_name)
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                    },
            ],
                {   
                    cancelable: false
                }
            );
    }

    render(){
        let email =this.props.authEmail;
        let mobile =this.props.authMobile;

        let emailEditable = (email =='' || email =='null' || email ==null || email =="undefined")?true:false;
        let mobEditable = (mobile =='' || mobile =='null' || mobile ==null || mobile =="undefined")?true:false;
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
                                elevation: 0,
                                paddingBottom:constants.vh(20),
                                paddingTop:constants.vh(20)
                              }} 
                            >

                                {this.renderProfileImage()}
                            </View>
                        </View>
                        <View style={{width:'95%',alignSelf:'center',marginTop:constants.vw(40)}}>
                            <PrimaryTextInput
                                value={this.state.email}
                                placeholder="Enter Email"
                                editable={emailEditable}
                                onChangeText={(text)=>this.setState({email:text})}
                            />
                            <PrimaryTextInput
                                value={this.state.mobile}
                                placeholder="Enter Mobile Number"
                                editable={mobEditable}
                                onChangeText={(text)=>this.setState({mobile:text})}
                            />
                        </View>
                    </View>
                </ScrollView>
                    {this._loadLoader()}
                    {this._showMsg()}
                    <TouchableOpacity style={{width:'98%',alignSelf:'center',justifyContent:'flex-end',alignItems:'center',backgroundColor:constants.Colors.color_heading,borderWidth:0,borderRadius:5,marginBottom:10}} onPress={()=>{(email !="" && email !="undefined" && mobile !="" && mobile !="undefined")?this._sendMessage():this._submit()}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:20,padding:10,color:constants.Colors.color_WHITE}}>SAVE</Text>
                    </TouchableOpacity>
                
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
    animate: state.indicator,
    authEmail:state.data.authEmail,
    authMobile:state.data.authMobile,
    authUserID:state.data.authUserID,
    login_type:state.data.login_type,
    profile:state.data.profile,
    userName:state.data.authName,
    popup:state.data.popup
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
    updateProfile:(data)=>dispatch(updateProfile(data)),
    remove_popup:()=>dispatch({type:'REMOVE_POPUP'})

});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

