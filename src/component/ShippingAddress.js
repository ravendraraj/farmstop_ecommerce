import React,{Component} from 'react'
import {View ,Text,StyleSheet ,Alert,FlatList,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import {PrimaryTextInput ,TextHeading} from '../customElement/Input'
import {getAppartment ,checkDeliveryOnPincode ,getUserAddressList ,addNewShippingAddress ,selectShippingAddress} from '../lib/api'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../customElement/Loader'

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
            houseOrFlat:'',
            country:'India',
            deliverType:'',
            displayForm:false,
            editAddress:0,
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
            this.props.selectShippingAddress(addressId);
        }else{
            ToastAndroid.showWithGravity("Something went wrong,Please try again", ToastAndroid.SHORT, ToastAndroid.TOP);    
        }
    }

    renderAddresList(){
        if(this.props.addressList.length >0){

            let userAddressList = this.props.addressList;
            
            return(
                userAddressList.map((addressRow,id)=>{
                    return (
                        <View style={this.props.defaultShipingAddress == addressRow.id ?styles.defaultAddress:styles.addressContainer}>
                            <Text style={styles.addressLine}>
                                {addressRow.address},
                            </Text>
                            <Text style={styles.addressLine}>
                                {addressRow.district},{addressRow.zipcode},{addressRow.country}
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'flex-end'}}>
                                {this.props.route.params.screen_name == "cart" ?(<TouchableOpacity style={styles.deliveryBtn} onPress={()=>this.setDilevryAddress(addressRow.id)}>
                                                                    <Text style={styles.deliveryBtntext}>Delivery at this Address</Text>
                                                                </TouchableOpacity>):<View/>}
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

                    this.setState({displayForm:true,name:'',query:address,deliverType:'',pincode:addressItem.zipcode,houseOrFlat:house,editAddress:parseInt(addressId)});
             }});

        }else{
            ToastAndroid.showWithGravity("something went wrong", ToastAndroid.SHORT, ToastAndroid.TOP);    
        }
    }

    renderAddAnotherAddressBtn(){
        if(this.props.addressList.length >0){
        return(
            <View>
                <TouchableOpacity style={styles.editBtn} onPress={()=>this.displayForm()}>
                            <Text style={styles.btnText}>Add Another address</Text>
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

    renderForm(){
        const { query } = this.state;
		const productList = this.findAppartment(query);
		const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());
        return(
            <View style={{marginLeft:10,marginTop:10}}>
                {this.renderMsg()}
                <View style={{width:"80%"}}>
                    <PrimaryTextInput placeholder="Contact Name" value={this.state.name} onChangeText={(text)=>this.setState({name:text})}/>
                </View>
                {/* <View style={{width:"80%"}}>
                    <PrimaryTextInput placeholder="Enter Mobile No*"  onChangeText={(text)=>this.setState({mobile:text})}/>
                </View> */}
                <View style={{width:"80%"}}>
                    <PrimaryTextInput placeholder="Pincode" value={this.state.pincode} onChangeText={(text)=>this.setState({pincode:text})} onBlur={()=>this.checkDelivery()}/>
                </View>
                <View style={{width:"80%"}}>
                    <PrimaryTextInput placeholder="House number/flat number"  value={this.state.houseOrFlat} onChangeText={(text)=>this.setState({houseOrFlat:text})}/>
                </View>
                <View style={{width:"100%",marginTop:10}}>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        inputContainerStyle={{ borderWidth: 0 }}
                        style={{ color: constants.Colors.color_grey, fontSize: 18 }}

                        listStyle={{ borderWidth: 0 }}
                        //data to show in suggestion
                        data={productList.length === 1 && comp(query, productList[0].apartment) ? [] : productList}
                        //default value if you want to set something in input
                        defaultValue={query}
                        /*onchange of the text changing the state of the query which will trigger
                        the findAppartment method to show the suggestions*/
                        onChangeText={text => this.setState({ query: text })}
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
                
                <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:constants.vw(70)}}>
                    
                        <TouchableOpacity style={{paddingTop:constants.vw(8)}} onPress={()=>this._submitForm()}>
                            <Text style={styles.btnText}>Save as</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Home"})}>
                                <Text style={(this.state.deliverType !='' && this.state.deliverType !='Office' ? styles.selectedText : styles.notSelectedText)}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selected : styles.notSelected )} onPress={()=>this.setState({deliverType:"Office"})}>
                                <Text style={(this.state.deliverType !='' && this.state.deliverType !='Home' ? styles.selectedText : styles.notSelectedText)}>Office</Text>
                            </TouchableOpacity>
                        </View>
                    
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
        
        if(this.state.name !='' && this.state.pincode !=''  && this.state.query !='' && this.state.deliverType !='' && this.state.houseOrFlat !=""){

            this.props.addNewAddress(addressObject);
            this.setState({ name:'' , pincode :'', query:'' ,deliverType:'',houseOrFlat:'',editAddress:0});
            
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
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={{width:"100%",alignSelf:'center',marginBottom:100}}>
                        <View style={{marginTop:10}}>
                            <TextHeading title="My account" fontsize={25}/>
                        </View>
                        <ScrollView>
                        <View style={{width:"95%",alignSelf:'center'}}>
                            {this.renderFormOnKeyEvent()}
                            {this.renderAddAnotherAddressBtn()}
                            {this.renderAddresList()}
                            {this._loadLoader()}
                        </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE,
        width:"95%",
        alignSelf:'center'
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
        width:"80%",
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
        fontSize:constants.vw(20)

    },
    notSelectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(20)
    },
    deliveryBtntext:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_BLACK,
        fontSize:constants.vw(16)
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
    defaultShipingAddress : state.data.defaultShipingAddress
});

const mapDispatchToProps = dispatch => ({
    getAddressList:() =>dispatch(getUserAddressList()),
    getAppartment : ()=>dispatch(getAppartment()),
    removeCouponMsg:()=>dispatch({type:'REMOVE_COUPON_CODE_MSG'}),
    checkDeliveryOnPincode:(data)=>dispatch(checkDeliveryOnPincode(data)),
    addNewAddress:(data)=>dispatch(addNewShippingAddress(data)),
    selectShippingAddress:(data)=>dispatch(selectShippingAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(shippingAddress);