import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,FlatList,TextInput} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl } from '../constants/url'
import {getOrderList} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {findOrderStatus} from '../lib/helper'

const width = Dimensions.get('window').width;
class TrackOrder extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

componentDidMount(){
    // console.log(this.props.route.params['orderId']);

}

_loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

 renederItemTrackList() {
        let order_no = this.props.route.params['order_no'];
        let orderDetails = this.props.orderList.find((item)=> item.order_no == order_no);
            // console.log(this.props.route.params,order_no,orderDetails);
      return (
            <View>
                <View style={{flexDirection:'row' ,justifyContent: 'space-between',}}>
                    <Text style={styles.orderDetailsText}>Order Number</Text>
                    <Text style={styles.orderDetailsText}>{ orderDetails.payment_option == ""? "Online Payment" : "Cash on Delivery"}</Text>
                </View>
                <View style={{flexDirection:'row' ,justifyContent: 'space-between',}}>
                    <Text style={styles.orderDetailsText}>{orderDetails.order_no}</Text>
                    <Text style={styles.orderDetailsText}>Rs.{orderDetails.total_cost}</Text>
                </View>

                <View style={{marginBottom:constants.vw(40),marginTop:constants.vw(20)}}>
                    <View style={styles.tractContainer}>
                        <View>
                            <Image source={constants.image.orderHowItWorks}
                                style={styles.imageTrack}/>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <Text style={styles.trackText}>Order Placed</Text>
                        </View>
                    </View>

                    <Image source={constants.image.dotedline} style={styles.arcImage}/>

                    <View style={styles.tractContainer}>
                        <View>
                            
                            <Image source={constants.image.orderHarvested}
                                style={styles.imageTrack}/>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <Text style={styles.trackText}>Produce Harvested</Text>
                        </View>
                    </View>
                    <Image source={constants.image.dotedline} style={styles.arcImage}/>

                    <View style={styles.tractContainer}>
                        <View>
                        
                            <Image source={constants.image.delivery}
                                style={styles.imageTrack}/>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <Text style={styles.trackText}>Order in Transit</Text>
                        </View>
                    </View>

                    <Image source={constants.image.dotedline} style={styles.arcImage}/>
                    <View style={styles.tractContainer}>
                        <View>
                        
                            <Image source={constants.image.deliverHowItWork}
                               style={styles.imageTrack}/>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            <Text style={styles.trackText}>Order Dispatched</Text>
                        </View>
                    </View>
                </View>
                <Text style={{textAlign:'center',fontSize:constants.vw(18),fontFamily:constants.fonts.Cardo_Bold}}>Contact us at info@farmstop.in</Text>
            </View> 
      )
    } 

    render(){
        return(
            <View style={styles.container}>
                <View style={{width:'90%',alignSelf:"center"}}>
                	<Text style={{fontSize:25,color:constants.Colors.color_heading,fontFamily:constants.fonts.Cardo_Italic,marginBottom:constants.vw(20)}}>
                        Track your Order
                    </Text>
                	{this.renederItemTrackList()}
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
    orderDetailsText:{
        color:constants.Colors.color_Black,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(16)
    },
    trackText:{
      color:constants.Colors.color_Black,
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18),
    },
    tractContainer:{
        flexDirection:'row' ,
        justifyContent: 'space-evenly',
        width:'90%',
        alignSelf:'center',
        height:constants.vw(60)
    },
    imageTrack:{
        position:'relative',
        right:20,
        zIndex:0,
        width:constants.vw(90),
        height:constants.vw(90),
        alignSelf:'center'
    },
    arcImage:{
        width:20,
        height:constants.vh(50),
        position:'relative',
        left:constants.vw(200),
        zIndex:1,
    },
})

const mapStateToProps = state => ({
    animate : state.indicator,
    orderList: state.data.orderList,
    authUserID: state.data.authUserID,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder);

