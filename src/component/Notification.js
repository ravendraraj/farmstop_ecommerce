import React,{Component} from 'react'
import {View ,Text,StyleSheet,Alert,Dimensions,FlatList,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl } from '../constants/url'
import {getOrderList,getNotification,removeNotification} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {TextHeading,EmptyComp} from '../customElement/Input'
import Icons from 'react-native-vector-icons/FontAwesome'

const width = Dimensions.get('window').width;
class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            trackOrderId:'',
        }
    }

componentDidMount(){
	if(this.props.authUserID !=null && this.props.authUserID !=""){
        this.props.getNotification();
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
    let notification = this.props.userNotifications;
    if (notification.length > 0) {
      return (
        <FlatList
          	data={notification}

          	renderItem={({ item }) => (
                <View style ={styles.prodBlock}>
                    <View style={item.type == "order" ? styles.orderNotifications:styles.offerNotification}/>
                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity onPress={()=>{item.type == "order"?this._trackOrderOnpress(item.order_no):''}} style={{padding:10}}>
                            <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:16}}>{item.message}</Text>
                        </TouchableOpacity>
                
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingBottom:10}}>
                            <View style={{flexDirection:'row'}}>
                                <Icons name="bell" size={16} color={constants.Colors.color_BLACK}/>
                                <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:14,paddingLeft:10}}>{item.date}</Text>
                            </View>
                            <View style={{marginRight:20}}>
                                <TouchableOpacity onPress={()=>this._removeWishList(item.id)}>
                                    <Icons name="trash-o" color={constants.Colors.color_BLACK} size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
          	)}
          
          	numColumns={1}
            keyExtractor={item => item.id}
        />
      )
    }else{
    	
    		if(this.props.animate == false){
                return(
                    <EmptyComp imageName={constants.image.emptyNotification} 
                        welcomText={"Nothing here !!!"}
                        redirectText={""}
                        onPress={()=>this.props.navigation.navigate("MainHome")}
                    />
                )
            }
    }
  }


    _trackOrderOnpress(order_number){
        // let orderID = this.state.trackOrderId;
        if( order_number!= ""){
            this.props.navigation.navigate('OrderDetails', {order_no: order_number});
            // this.props.navigation.navigate('TrackOrder', {order_no: order_number});
        }else{
            ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    _removeWishList(notifyId){
        if(notifyId !=''){
            this.props.remove_notify(notifyId)
        }else{
            ToastAndroid.showWithGravity("Something went wrong try after some time", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{width:'100%',alignSelf:"center"}}>
                    <TextHeading title="My Notification"/>
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
    moreDetails:{
        color:'red',
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18)    
    },prodBlock:{
        flexDirection:'row',
        alignSelf:'center',
        width:'95%',
        backgroundColor:"white",
        borderRadius:2,
        elevation:4,
        marginBottom:10,
        marginTop:10,
    },date:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16
    },
    orderNotifications:{
        width:4,
        height:'100%',
        backgroundColor:constants.Colors.color_youtube,
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
    },
    offerNotification:{
        width:4,
        height:'100%',
        backgroundColor:constants.Colors.color_green,
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3
    }
})

const mapStateToProps = state => ({
    animate : state.indicator,
    userNotifications: state.data.userNotifications,
    authUserID: state.data.authUserID,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    getNotification:()=>dispatch(getNotification()),
    remove_notify:(data)=>dispatch(removeNotification(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

