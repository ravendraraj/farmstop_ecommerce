import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,FlatList,TextInput,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl } from '../constants/url'
import {getOrderList} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,PrimaryTextInput,TextHeading,EmptyComp} from '../customElement/Input'

const width = Dimensions.get('window').width;
class MyOrderList extends Component{
    constructor(props){
        super(props);
        this.state={
            trackOrderId:'',
        }
    }

componentDidMount(){
	if(this.props.authUserID != null && this.props.orderList.length == 0){
		this.props.getOrderList();
	}
}

_loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

 renederItemType() {
    let orderList = this.props.orderList;
    if (orderList.length > 0) {
    	var i=1;
      return (
        <FlatList
          	data={orderList}

          	ListHeaderComponent={()=>(
                <View style={{flexDirection:'row'}}>
                    {/*<View style={{width:constants.vw(20)}}>
                	   <Text style={styles.headerText}></Text>
                    </View>*/}

                    <View style={{width:constants.vw(80)}}>
                	   <Text style={styles.headerText}>Date</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                	   <Text style={styles.headerText}>order number</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                	   <Text style={styles.headerText}>Status</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                	   <Text style={styles.headerText}>Details</Text>
                    </View>
                </View>
            )}

          	renderItem={({ item }) => (
                <View style ={{width:'95%',alignSelf:'center',marginBottom:8}}>
            	<View style={{flexDirection:'row'}}>
                    {/*<View style={{width:constants.vw(20)}}>
                	   <Text style={styles.contentText}>{}.</Text>
                    </View>*/}

                    <View style={{width:constants.vw(70)}}>
                	   <Text style={styles.contentText}>{item.date}</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                	   <Text style={styles.contentText}>{item.order_no}</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                	   <Text style={styles.contentText}>{item.order_status == "0" ? "Pending" :"Delivered"}</Text>
                    </View>

                    <View style={{width:constants.vw(90)}}>
                    	<TouchableOpacity>
                    		<Text style={styles.contentDetailText}>
                    			Download Invoice
                    		</Text>
                    	</TouchableOpacity>
                    </View>
                </View>

                <View style={{width:constants.vw(100) ,paddingLeft:constants.vw(10)}}>
                    <TouchableOpacity onPress={()=>this._trackOrderOnpress(item.id)}>
                        <Text style={styles.moreDetails}>More details</Text>
                    </TouchableOpacity>
                </View>
                </View>
          	)}
          
          	numColumns={1}
            keyExtractor={item => item.id}

          	ListFooterComponent={
                <View style={{marginTop:constants.vw(20),marginBottom:constants.vw(100)}}>
                	<Text style={{fontSize:20,color:constants.Colors.color_heading,fontFamily:constants.fonts.Cardo_Italic,paddingLeft:15,marginTop:constants.vw(20)}}>
                			Track Your Order
                	</Text>
                	<View style={styles.inputBox}>
                		
                            <TextInput placeholder="Enter coupon code" 
                                value={this.state.trackOrderId}
                                onChangeText={(text)=>this.setState({trackOrderId:text})}
                            />
                	</View>
                </View>
            }
        />
      )
    }else{
    	
    		if(this.props.animate == false){
                return(
                    <EmptyComp imageName={constants.image.emptyCart} 
                        welcomText={"Not found any order"}
                        redirectText={"SHOP NOW"}
                        onPress={()=>this.props.navigation.navigate("MainHome")}
                    />
                )
            }
    }
  }


_trackOrderOnpress(orderId){
    // let orderID = this.state.trackOrderId;
    if( orderId!= ""){
        this.props.navigation.navigate('TrackOrder', {orderId: orderId});
    }else{
        ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
}

_trackOrder(){
    let orderID = this.state.trackOrderId;
    if( orderID!= ""){
        this.props.navigation.navigate('TrackOrder', {orderID: orderID});
    }else{
        ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
}

    render(){
        return(
            <View style={styles.container}>
                <View style={{width:'100%',alignSelf:"center"}}>
                    <TextHeading title="My Orders"/>
                	{this.renederItemType()}
                	{this._loadLoader()}
                </View>
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
    	marginLeft:10,
    	borderWidth:1,
    	borderColor:"red",
    	width:constants.vw(200)
    },
    headerText:{
    	color:constants.Colors.color_heading,
    	fontFamily:constants.fonts.Cardo_Regular,
    	fontSize:constants.vw(18)
    },
    contentText:{
        color:constants.Colors.color_Black,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18)  
    },
    moreDetails:{
        color:'red',
        fontFamily:constants.fonts.Cardo_Italic,
        fontSize:constants.vw(18)    
    },
    contentDetailText:{

        color:constants.Colors.color_Black,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18),  
        textAlign:'center'
    }
})

const mapStateToProps = state => ({
    animate : state.indicator,
    itemData: state.data.productData,
    orderList: state.data.orderList,
    authUserID: state.data.authUserID,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    getOrderList:()=>dispatch(getOrderList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);

