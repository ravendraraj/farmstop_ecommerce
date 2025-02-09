import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert,FlatList,ToastAndroid, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import {getAppartment ,checkDeliveryOnPincode ,removeAddress,getUserAddressList ,addNewShippingAddress ,selectShippingAddress} from '../lib/api'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../customElement/Loader'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import RadioButton from '../customElement/RadioButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import {navigateWithParams} from '../appnavigation/RootNavigation';

class shippingAddress extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            query: '',//(this.props.selectAddress == null?'':this.props.selectAddress),
            name:'',
            mobile:'',
            State:'',
            pincode:'',//(this.props.shippingPincode == null?'':this.props.shippingPincode),
            appartment:'',//(this.props.selectAddress == null?'':this.props.selectAddress),
            houseOrFlat:'',
            country:'India',
            deliverType:'Home',
            displayForm:false,
            editAddress:0,
            option1:'select',
            option2:'notselect',
            is_default:false,
            searchAddress:''
        };
    }

    // componentDidUpdate(nextProps){
    //     console.log(nextProps);
    // }

    static getDerivedStateFromProps(nextProps, prevState){
        //console.log("getDrived",nextProps, prevState);
        let {selectAddress,shippingPincode} = nextProps;
        let {searchAddress} = prevState;
        if(selectAddress !=null && selectAddress != searchAddress){
            return{
                searchAddress:selectAddress,
                appartment:selectAddress,
                query:selectAddress,
                pincode:(shippingPincode == null?'':shippingPincode),
            }
        }else{
            return null;
        }
    }

    searchAddressLocation(){
        this.setState({searchAddress:''});
        navigateWithParams("GoogleLocation","shippingAddressScreen");
    }


    async componentDidMount() {
        if(this.props.addressList.length <=0 && this.props.authUserID !=''){
            this.props.getAddressList();
        }

        if(this.props.apartmentList.length <= 0){
            // await this.props.getAppartment();
        }
    }

    openForm(){
        if(this.props.userId !=""){
            this.props.navigation.navigate("AddNewAddress");
        }else{
            this.props.navigation.navigate("SocialLogin");
        }
    }


    _loadLoader() {
    if (this.props.animate) {
      return (
        <Loader />
      )
    }
  }

    findAppartment(query) {
		//method called everytime when we change the value of the input
		if (query === '' || query.length <= 2) {
			//if the query is null then return blank
			return [];
		}

		if (this.props.apartmentList.length > 0) {
			const { productList } = this.props.apartmentList;
			//making a case insensitive regular expression to get similar value from the film json
			const regex = new RegExp(`${query.trim()}`, 'i');
			//return the filtered film array according the query from the input

			return this.props.apartmentList.filter(prod => (prod.apartment.search(regex) >= 0 ));
		} else {
			return [];
		}
    }
    
    seacrhProduct(key) {
		// Alert.alert(key);
		// this.props.getProductListForSearch({ prodKey: key, screen: this.props.route.name })
		//this.props.navigation.navigate('ProductType',{keyword:key});
	}

    setDilevryAddress(addressId){
        if(addressId !=""){
            // console.log("rooo",this.props.route);
            var data = [];
                data["id"] = addressId;
                data["screen_name"] = this.props.route.params.screen_name;
        
            this.props.selectShippingAddress(data);
        }else{
            ToastAndroid.showWithGravity("Something went wrong,Please try again", ToastAndroid.SHORT, ToastAndroid.TOP);    
        }
    }

    removeAddresses(addressId){
        if(this.state.displayForm && this.props.addressList.length <= 1)
        {
            this.setState({displayForm:false})
        }
        this.props.removeAddress(addressId);
    }

    renderAddresList(){
        if(this.props.addressList.length >0){

            let userAddressList = this.props.addressList;
            
            return(
                userAddressList.map((addressRow,id)=>{
                    return (
                        <View style={this.props.defaultShipingAddress == addressRow.id ?styles.defaultAddress:styles.addressContainer} key={id}>
                            <Text style={styles.addressLine}>
                                {addressRow.contactName}
                            </Text>
                            <Text style={styles.addressLine}>
                                {addressRow.address},
                            </Text>
                            <Text style={styles.addressLine}>
                                {addressRow.district},{addressRow.zipcode},{addressRow.country}
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'flex-end'}}>
                                {(this.props.route.params.screen_name == "cart" || this.props.route.params.screen_name =="PaymentOption") ?(<TouchableOpacity style={styles.deliveryBtn} onPress={()=>this.setDilevryAddress(addressRow.id)}>
                                                                    <Text style={styles.deliveryBtntext}>Delivery at this Address</Text>
                                                                </TouchableOpacity>):(
                                                                <TouchableOpacity style={styles.deliveryBtn} onPress={()=>this.removeAddresses(addressRow.id)}>
                                                                    <FontAwesome name="trash-o" color={constants.Colors.color_BLACK} size={20}/>
                                                                </TouchableOpacity>)}
                                <TouchableOpacity style={styles.editBtn} onPress={()=>this.editAddress(addressRow.id)}>
                                    <Text style={styles.editBtntext}>Edit Address</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            )
        }else{
            return(
                this.renderForm()
            )
        }
    }

    displayForm(){
        if(this.state.displayForm){
            this.setState({displayForm:false});
        }else{
            this.setState({displayForm:true});
        }
    }

    renderFormOnKeyEvent(){
        if(this.state.displayForm){
            return(
                this.renderForm()   
            )
        }
    }

    editAddress(addressId){
        if(addressId !=''){
            this.props.addressList.map(addressItem=>{
             if(addressItem.id == addressId){
                    var str =addressItem.address;
                    var find =str.indexOf(',');
                    var house = "";
                    var address = "";
                    if(find >=0){
                        house = str.substring(0, find);
                        address =str.substring(find+1, str.length);;
                     }else{
                        address = str;
                    }

                    let deliverTypeString="";

                    if(addressItem.addressType == "Home"){
                        this.setState({option1:"select"});
                        this.setState({option2:"notselect"});
                        deliverTypeString = 'Home';

                    }else{
                        this.setState({option2:"select"});
                        this.setState({option1:"notselect"});
                        deliverTypeString = addressItem.addressType;
                    }

                    let isDefaultValue = false;
                    if(addressItem.default_address == 1){
                        isDefaultValue = true;
                    }

                    this.setState({displayForm:true,name:addressItem.contactName,query:address,deliverType:deliverTypeString,pincode:addressItem.zipcode,houseOrFlat:house,editAddress:parseInt(addressId),is_default:isDefaultValue});
             }});

        }else{
            ToastAndroid.showWithGravity("something went wrong", ToastAndroid.SHORT, ToastAndroid.TOP);    
        }
    }

    renderAddAnotherAddressBtn(){
        if(this.props.addressList.length >0){
        return(
            <View style={{marginTop:20}}>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',borderWidth:1,backgroundColor:constants.Colors.color_heading,borderColor:constants.Colors.color_heading,borderRadius:4,borderRadius:4,padding:10}} onPress={()=>this.displayForm()}>
                            <Text style={{fontSize:18,fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_WHITE}}>Add Another address</Text>
                            <Icons name={"arrow-right"} size={10} style={{marginTop:constants.vw(8),color:constants.Colors.color_WHITE}}/>
                </TouchableOpacity>
            </View>
        )
        }
    }
    
    checkDelivery(){
        if(this.state.pincode !=""){
            // Alert.alert(this.state.pincode);
            let isNum = /^\d+$/.test(this.state.pincode);
            if(this.state.pincode.length == 6 && isNum)
            {
                this.props.checkDeliveryOnPincode({pincode:this.state.pincode});
            }else{
                ToastAndroid.showWithGravity("Please enter vaild pincode", ToastAndroid.SHORT, ToastAndroid.TOP);    
            }
        }
    }



    renderMsg(){
        if(this.props.coupon_msg !=''){
            let msg = this.props.coupon_msg;
            setTimeout(()=>{this.props.removeCouponMsg()},2000);
            ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.TOP);
            // this.setState({pincode:''});
        }
    }

       _radioHandler(){
            if(this.state.option1 == "select")
            {
                this.setState({option1:"notselect"})
                this.setState({option2:"select"})
                this.setState({deliverType:''})
                // Alert.alert("Other")

            }else{
                this.setState({option1:"select"})
                this.setState({option2:"notselect"})
                this.setState({deliverType:'Home'})
                // Alert.alert("Home")
            }
        }

    async fetchAppartment(searchKey){
        let {query} = this.state;
        this.setState({ query: searchKey});

        if(query !="" && query.length >=2){
            await this.props.getAppartment({keyword:query});
        }
    }

    selectedDefaultAddress(){
        let {is_default} = this.state;
        //console.log("check_box",is_default);
        if(is_default == false){

            this.setState({
                is_default:true
            });

        }else{

            this.setState({
                is_default:false
            });

        }
    }

    renderForm(){
        const { query } = this.state;
		const productList = this.findAppartment(query);
		const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());
        return(
            <View style={{marginLeft:10,marginTop:10}}>
                {this.renderMsg()}
                <View style={styles.textInputBox}>
                    <PrimaryTextInput placeholder="Contact Name" value={this.state.name} onChangeText={(text)=>this.setState({name:text})}/>
                </View>
                <View style={styles.textInputBox}>
                    <PrimaryTextInput placeholder="House number/flat number"  value={this.state.houseOrFlat} onChangeText={(text)=>this.setState({houseOrFlat:text})}/>
                </View>
                <View style={{width:"100%",marginTop:10}}>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        inputContainerStyle={{ borderWidth: 0 }}
                        style={{ color: constants.Colors.color_grey, fontSize: 18 }}
                        listContainerStyle={{borderWidth:0}}
                        listStyle={{ borderWidth: 0 }}
                        //data to show in suggestion
                        data={productList.length === 1 && comp(query, productList[0].apartment) ? [] : productList}
                        //default value if you want to set something in input
                        defaultValue={query}
                        /*onchange of the text changing the state of the query which will trigger
                        the findAppartment method to show the suggestions*/
                        // onChangeText={text => this.setState({ query: text})}
                        onChangeText={text => this.fetchAppartment(text)}
                        onSubmitEditing ={()=> this.seacrhProduct(this.state.query)}
                        placeholder="Appartment or Location"
                        renderItem={({ item }) => (
                        //you can change the view you want to show in suggestion from here
                        <TouchableOpacity onPress={() => { this.setState({ query: item.apartment }), this.seacrhProduct(item.apartment) }}>
                            <Text style={styles.itemText}>
                            {item.apartment}
                            </Text>
                        </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={{...styles.textInputBox ,marginTop:40}}>
                    <PrimaryTextInput placeholder="Pincode" value={this.state.pincode} onChangeText={(text)=>this.setState({pincode:text})} onBlur={()=>this.checkDelivery()}/>
                </View>
                
                <View style={{...styles.textInputBox,paddingTop:constants.vw(15)}}>
                    <TouchableOpacity style={{flexDirection:'row'}}
                        onPress={()=>{this.searchAddressLocation()}}
                    >
                        <MaterialIcon name="my-location" size={constants.vw(20)} color={"grey"}/>
                        <Text style={{paddingLeft:10,fontSize: 16,fontFamily: constants.fonts.Cardo_Regular,color:"grey"}}>Search Address</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:constants.vw(20)}}>
                        <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Bold}}>Address Type</Text>
                        <View style={{flexDirection:'row',marginTop:constants.vh(10)}}>
                        {/*<TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Home"})}>
                                            <Text style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selectedText : styles.notSelectedText)}>Home</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Office"})}>
                                            <Text style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selectedText : styles.notSelectedText)}>Office</Text>
                                 </TouchableOpacity>*/}
                        <View style={{flexDirection:'row'}}>
                            <RadioButton  checked={this.state.option1} onPress={()=>this._radioHandler()}/>
                            <Text>Home</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <RadioButton  checked={this.state.option2} onPress={()=>this._radioHandler()}/>
                            <Text>Other</Text>
                        </View>

                        </View>
                    
                </View>
                { this.state.option2 == "select"?
                    (<View style={styles.textInputBox}>
                        <PrimaryTextInput placeholder="Enter Other Address" value={this.state.deliverType} onChangeText={(text)=>this.setState({deliverType:text})}/>
                    </View>):(<View/>)
                }

                <View style={{flexDirection:'row',paddingTop:constants.vw(10)}}>
                    <Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Bold,marginTop:constants.vw(5)}}>Default Address</Text>
                    <CheckBox
                        disabled={false}
                        value={this.state.is_default}
                        onValueChange={(newValue) => this.selectedDefaultAddress()}
                    />
                </View>

                <View style={{...styles.textInputBox,alignSelf:'center',marginTop:20}}>
                <TouchableOpacity style={{borderWidth:1,backgroundColor:constants.Colors.color_heading,borderColor:constants.Colors.color_heading,borderRadius:4,borderRadius:4,padding:10}} onPress={()=>this._submitForm()}>
                            <Text style={{fontSize:16,fontFamily:constants.fonts.Cardo_Bold,textAlign:'center',color:constants.Colors.color_WHITE}}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }


    _submitForm(){
        if(this.props.shippingCharges == null){
            this.setState({pincode:''});
        }
        var addressObject = [];
            addressObject["name"] = this.state.name;
            addressObject["pincode"] = this.state.pincode;
            addressObject["address"] = this.state.query;
            addressObject["houseOrFlat"] = this.state.houseOrFlat;
            addressObject["country"] = this.state.country;
            addressObject["deliverOn"] = this.state.deliverType;
            addressObject["isUpdateAddress"] = this.state.editAddress;
            addressObject["is_default"] = this.state.is_default;
            //console.log(addressObject,"address testing");
        
        if(this.state.name !='' && this.state.pincode !=''  && this.state.query !='' && this.state.deliverType !='' && this.state.houseOrFlat !=""){

            this.props.addNewAddress(addressObject);
            this.setState({ name:'' , pincode :'', query:'' ,deliverType:'',houseOrFlat:'',editAddress:0,displayForm:false});
            
        }else if(this.state.pincode ==''){ 
            ToastAndroid.showWithGravity("Delivery not available given pincode ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }if(this.state.deliverType ==''){ 
            ToastAndroid.showWithGravity("please select address type HOME or OFFICE ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }if(this.state.name ==''){ 
            ToastAndroid.showWithGravity("please enter name ", ToastAndroid.SHORT, ToastAndroid.TOP);
        }if(this.state.houseOrFlat ==''){ 
            ToastAndroid.showWithGravity("please select House No/Flat No", ToastAndroid.SHORT, ToastAndroid.TOP);
        }else if(this.state.query ==''){
            ToastAndroid.showWithGravity("Please select Appartment/Location", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }


    render(){
        return(
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                    {/*<TextHeading title="My Account"/>*/}
                    {this._loadLoader()}
                    <KeyboardAwareScrollView 
                        keyboardShouldPersistTaps={'handled'}
                        extraScrollHeight={10}
                        enableOnAndroid={true}
                    >
                    <View style={{width:"100%",alignSelf:'center'}}>
                        <ScrollView>
                        <View style={{width:"95%",alignSelf:'center',marginBottom:30}}>
                            {this.renderFormOnKeyEvent()}
                            {this.renderAddAnotherAddressBtn()}
                            <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18,marginTop:20}}>Current Addresses</Text>
                            {this.renderAddresList()}
                        </View>
                        </ScrollView>
                    </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE,
        width:"100%",
        alignSelf:'center'
    },
    textInputBox:{
        width:'98%'
    },
    addressContainer:{
        borderWidth:2,
        borderRadius:5,
        borderColor:constants.Colors.color_grey,
        marginTop:10,
        marginBottom:10,
        padding:10
    },
    defaultAddress:{
        borderWidth:2,
        borderRadius:5,
        borderColor:constants.Colors.color_heading,
        marginTop:10,
        marginBottom:10,
        padding:10
    },
    addressLine:{
        fontFamily:constants.fonts.Cardo_Regular,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(18)
    },

    btnText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(20)
    },
    autocompleteContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: constants.Colors.color_WHITE,
		borderBottomWidth: 3,
        zIndex: 2,
        width:"98%",
	},
	descriptionContainer: {
		flex: 1,
		// justifyContent: 'center',
    },
    itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2,
	},
    editBtn:{
        paddingLeft:constants.vw(10),
        paddingRight:constants.vw(10),
        marginTop:constants.vw(15)
    },

    editBtntext:{
        width:constants.vw(110),
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(16)
    },inputBox:{
        marginTop:constants.vw(10)
    },
    selected:{
        backgroundColor:constants.Colors.color_heading,
        padding:constants.vw(10)
    },
    notSelected:{
        // backgroundColor:constants.Colors.color_WHITE,
        // borderWidth:1,
        // borderColor:constants.Colors.color_heading,
        padding:constants.vw(10)
    },
    selectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:'white',
        fontSize:constants.vw(16)

    },
    notSelectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(16)
    },
    deliveryBtntext:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(16),
        width:constants.width*0.5
    },
    deliveryBtn:{
        paddingLeft:constants.vw(10),
        paddingRight:constants.vw(10),
        marginTop:constants.vw(15)  
    }
})

const mapStateToProps = state => ({
    animate: state.indicator,
    error: state.error.err,
    authUserID : state.data.authUserID,
    addressList:state.data.addressList,
    coupon_msg : state.data.coupon_msg,
    shippingCharges:state.data.shippingCharges,
    apartmentList : state.data.apartmentList,
    defaultShipingAddress : state.data.defaultShipingAddress,
    shippingPincode:state.data.shippingPincode,
    selectAddress:state.data.selectAddress
});

const mapDispatchToProps = dispatch => ({
    getAddressList:() =>dispatch(getUserAddressList()),
    getAppartment : (data)=>dispatch(getAppartment(data)),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
    checkDeliveryOnPincode:(data)=>dispatch(checkDeliveryOnPincode(data)),
    addNewAddress:(data)=>dispatch(addNewShippingAddress(data)),
    selectShippingAddress:(data)=>dispatch(selectShippingAddress(data)),
    removeAddress:(data)=>dispatch(removeAddress(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(shippingAddress);