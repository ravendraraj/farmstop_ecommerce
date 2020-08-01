import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert,FlatList} from 'react-native'
import {connect} from 'react-redux'
import {ButtonWithIcon} from '../customElement/button'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import {DropDown ,AppartMentDropDown ,NormalButton} from '../customElement/button'
import {getAppartment ,checkDeliveryOnPincode ,addNewShippingAddress,getUserAddressList} from '../lib/api'
var state = [];
state.push({"label":'Karnatka' ,"value":"Karnatka"});
class shippingAddress extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            query: '',
            name:'',
            mobile:'',
            State:'',
            pincode:'',
            appartment:'',
            address:'',
            country:'India',
            deliverType:'',
        };
    }

    async componentDidMount() {
        if(this.props.addressList.length <=0 && this.props.authUserID !=''){
            this.props.getAddressList();
        }

        if(this.props.apartmentList.length <= 0){
            await this.props.getAppartment();
        }
    }

    openForm(){
        if(this.props.userId !=""){
            this.props.navigation.navigate("AddNewAddress");
        }else{
            this.props.navigation.navigate("SocialLogin");
        }
    }

    _getState(value){
        if(value != "" && value!="Select State"){
            this.setState({State:value});
        }else{
            ToastAndroid.showWithGravity("Please Select State", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    //check delivery on entered pincoded
    checkDelivery(){
        if(this.state.pincode !=""){
            // Alert.alert(this.state.pincode);
            this.props.checkDeliveryOnPincode({pincode:this.state.pincode});
            if(this.props.shippingCharges == null){
                this.setState({pincode:''});
            }
        }
    }

    renderAddresList(){
        if(this.props.addressList.length <0){
            let userAddressList = this.props.addressList;
            return(
                <View>

                <FlatList
                  data={userAddressList}
                      renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 4, alignItems: 'center' }}>
                          <TouchableOpacity onPress={console.log(item.id)}>
                            <Text style={{ fontSize: constants.vw(13), marginTop:constants.vw(9), alignSelf: 'center', fontFamily: constants.fonts.Cardo_Bold }}>{item.address}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                  
                  numColumns={1}
                  keyExtractor={(item) => item.id}
                />
                </View>
            )
        }else{
            this.renderAddressForm();
        }
    }

    renderAddressForm(){
        return(
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
        )
    }

    render(){
        return(
            <View style={styles.container}>
                {this.renderAddresList()}
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
    authUserID : state.data.authUserID,
    addressList:state.data.addressList,
    coupon_msg : state.data.coupon_msg,
    shippingCharges:state.data.shippingCharges,
    apartmentList : state.data.apartmentList,
});

const mapDispatchToProps = dispatch => ({
    getAddressList:() =>dispatch(getUserAddressList()),
    getAppartment : ()=>dispatch(getAppartment()),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
    checkDeliveryOnPincode:(data)=>dispatch(checkDeliveryOnPincode(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(shippingAddress);