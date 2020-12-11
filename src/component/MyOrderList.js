import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,FlatList,TextInput,ToastAndroid,StatusBar} from 'react-native'
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

        console.log("constructor");
}

componentDidMount(){
	if(this.props.authUserID != null && this.props.orderList.length == 0){
		this.props.getOrderList();
	}

    console.log("mount");
}

componentWillUnmount(){
    console.log("Unmount");
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

          	renderItem={({ item }) => (
                <View style ={styles.prodBlock}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.heading}>Order Date:</Text>
                        <Text style={styles.date}>
                             {item.date}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.heading}>Order No:</Text>
                        <Text style={styles.date}>
                            {item.order_no}
                        </Text>
                    </View>
                   
                   <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                       <View>
                            <TouchableOpacity onPress={()=>this._trackOrderOnpress(item.order_no)}>
                                <Text style={styles.moreDetails}>
                                    Track Order
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>this._orderDetails(item.order_no)}>
                                <Text style={styles.moreDetails}>
                                    Order Details
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
          	)}
          
          	numColumns={1}
            ListFooterComponent={()=>(
                    <View style={{height:100}}/>
            )}
            
            keyExtractor={item => item.id}
        />
      )
    }else{
    	
    		if(this.props.animate == false){
                return(
                    <EmptyComp imageName={constants.image.emptyCart} 
                        welcomText={"Oops! Not found any order."}
                        redirectText={"SHOP NOW"}
                        onPress={()=>this.props.navigation.navigate("Home")}
                    />
                )
            }
    }
  }


_trackOrderOnpress(order_number){
    // let orderID = this.state.trackOrderId;
    if( order_number!= ""){
        this.props.navigation.navigate('TrackOrder', {order_no: order_number});
    }else{
        ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
}

_orderDetails(order_number){
    // let orderID = this.state.trackOrderId;
    if( order_number!= ""){
        this.props.navigation.navigate('OrderDetails', {order_no: order_number});
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
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                <View style={{width:'100%',alignSelf:"center"}}>
                    {/*<TextHeading title="My Orders"/>*/}
                	{this.renederItemType()}
                </View>
                {this._loadLoader()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    moreDetails:{
        color:constants.Colors.color_heading,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18)    
    },prodBlock:{
        alignSelf:'center',
        width:'95%',
        backgroundColor:"white",
        borderRadius:2,
        elevation:4,
        padding:10,
        marginBottom:10,
        marginTop:10,
    },date:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16
    },
    heading:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16,
        width:"40%"
    }
})

const mapStateToProps = state => ({
    animate : state.indicator,
    itemData: state.data.productData,
    orderList: state.data.orderList,
    authUserID: state.data.authUserID,
    itemData: state.data.productData,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    getOrderList:()=>dispatch(getOrderList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);

