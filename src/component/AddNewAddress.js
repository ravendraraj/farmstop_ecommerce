import React,{Component} from 'react'
import {View ,Text,StyleSheet ,ToastAndroid,Alert} from 'react-native'
import {connect} from 'react-redux'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {DropDown ,AppartMentDropDown ,NormalButton} from '../customElement/button'
import constants from '../constants'
import {getAppartment ,checkDeliveryOnPincode ,addNewShippingAddress} from '../lib/api'

var state = [];
state.push({"label":'Karnatka' ,"value":"Karnatka"});

class AddNewAddress extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            mobile:'',
            State:'',
            pincode:'',
            appartment:'',
            address:'',
            country:'India',
            deliverType:'',
        }
    }

    async componentDidMount(){
        if(this.props.apartmentList.length <= 0){
            await this.props.getAppartment();
        }
    }

    _getState(value){
        if(value != "" && value!="Select State"){
            this.setState({State:value});
        }else{
            ToastAndroid.showWithGravity("Please Select State", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    _getAppartment(value){
        if(value != "" && value!="Select State"){
            this.setState({appartment:value});
        }else{
            ToastAndroid.showWithGravity("Please Select Appartment", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    //check delivery on entered pincoded
    checkDelivery(){
        if(this.state.pincode !=""){
            // Alert.alert(this.state.pincode);
            this.props.checkDeliveryOnPincode({pincode:this.state.pincode})
        }
    }

    renderMsg(){
        if(this.props.coupon_msg !=''){
            let msg = this.props.coupon_msg;
            setTimeout(()=>{this.props.removeCouponMsg()},2000);
            ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
            this.setState({pincode:''});
        }
    }

    _submitForm(){
            let name = this.state.name;
            let mobile = this.state.mobile;
            let State = this.state.State;
            let pincode = this.state.pincode;
            let apartment =  this.state.appartment;
            let address = this.state.address;
            let country = this.state.country;
            let deliverOn = this.state.deliverType;

            var addressObject = [];
                addressObject["name"] = this.state.name;
                addressObject["mobile"] = this.state.mobile;
                addressObject["State"] = this.state.State;
                addressObject["pincode"] = this.state.pincode;
                addressObject["apartment"] = this.state.appartment;
                addressObject["address"] = this.state.address;
                addressObject["country"] = this.state.country;
                addressObject["deliverOn"] = this.state.deliverType;

            if(this.state.mobile != '' && this.state.name !='' && this.state.pincode !='' && this.state.State !=''  && this.state.address !='' && this.state.deliverType !=''){

                this.props.addNewAddress(addressObject);
                this.setState({mobile: '', name:'' , pincode :'' ,State :'' , address:'' ,deliverType:''});
                
            }else{
                ToastAndroid.showWithGravity("Please Fill all fileds", ToastAndroid.SHORT, ToastAndroid.TOP);
            }

    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width:'90%',alignSelf:"center"}}>
                        {/* <TextHeading title="My account" fontsize={25}/> */}
                        <View>
                            <PrimaryTextInput placeholder="Enter Name*" onChangeText={(text)=>this.setState({name:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Enter Mobile No*"  onChangeText={(text)=>this.setState({mobile:text})}/>
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Pincode*"  onChangeText={(text)=>this.setState({pincode:text})} onBlur={()=>this.checkDelivery()}/>
                        </View>
                        <View style={styles.inputBox}>
                        <View style={styles.inputBox}>
                            {/* <Text>State</Text> */}
                            <AppartMentDropDown 
                                selectedValue = {this.state.appartment == ""? "": this.state.appartment}
                                onValueChange={ (value) => this._getAppartment(value)}
                                options={this.props.apartmentList}
                                intial_label="Select Appartment" 
                                intial_value="Select Appartment"
                            />
                        </View>
                        </View>
                        <View style={styles.inputBox}>
                            {/* <Text>State</Text> */}
                            <DropDown 
                                selectedValue = {this.state.State == ""? "": this.state.State}
                                onValueChange={ (value) => this._getState(value)}
                                options={state} intial_label="Select State" 
                                intial_value="Select State"
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <PrimaryTextInput placeholder="Your Address" onChangeText={(text)=>this.setState({address:text})}/>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                            <TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Home"})}>
                                <Text style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selectedText : styles.notSelectedText)}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Office"})}>
                                <Text style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selectedText : styles.notSelectedText)}>Office</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:constants.vw(14),marginBottom:10}}>
                            <NormalButton buttonName={"Save as"} onPress={()=>this._submitForm()}/>
                        </View>
                    </View>
                </ScrollView>
                {this.renderMsg()}
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
        marginTop:constants.vw(10)
    },
    selected:{
        backgroundColor:constants.Colors.color_heading,
        padding:constants.vw(10)
    },
    notSelected:{
        backgroundColor:constants.Colors.color_WHITE,
        borderWidth:1,
        borderColor:constants.Colors.color_heading,
        padding:constants.vw(10)
    },
    selectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:'white',
        fontSize:constants.vw(16)

    },
    notSelectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_heading,
        fontSize:constants.vw(16)
    }
})

const mapStateToProps = state => ({
    // itemtypeData :state.data.productVatiation,
    apartmentList : state.data.apartmentList,
    coupon_msg : state.data.coupon_msg,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    otpForsignup: data =>dispatch(sendSignUpOtp(data)),
    getAppartment : ()=>dispatch(getAppartment()),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
    checkDeliveryOnPincode:(data)=>dispatch(checkDeliveryOnPincode(data)),
    addNewAddress:(data)=>dispatch(addNewShippingAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);

