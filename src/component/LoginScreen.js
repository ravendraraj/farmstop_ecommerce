import React,{Component} from 'react'
import {View ,Text,StyleSheet, Alert} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation';

class LoginScreen extends Component{
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
        
            return(
            <View style={{width:'80%',alignSelf:"center"}}>
                        <TextHeading title="Log in" fontsize={25}/>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Email"/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Password" secureTextEntry={true}/>
                        </View>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginTop:20}} onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                            <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Regular,color:constants.Colors.color_BLACK}}>Forget Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignSelf:'center',marginTop:40}}>
                            <Text style={{fontSize:25,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
            )
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
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

