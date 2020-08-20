import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,FlatList,TextInput} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl,prod_variation_url } from '../constants/url'
import {getOrderDetails} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {fristLetterCapital,findOrderStatus} from '../lib/helper'

const width = Dimensions.get('window').width;
class OrderDetails extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

	async componentDidMount(){
		let order_no = this.props.route.params['order_no'];
		this.props.getOrderDetails(order_no);
	}

	_loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }

    render(){
		return(
			<View style={styles.container}>
				<ScrollView>
		            <View style={{width:'100%',alignSelf:"center"}}>
		                {this.renderOrderDetails()}
						{this._loadLoader()}
					</View>
				</ScrollView>
			</View>
		)
	}

	renderProdOfDelivery(){
		let orderDetails = this.props.OrderDetails;
		return(
            orderDetails.map((item)=>{
                return (
                    <View style={[styles.prodBlock,{flexDirection:'row'}]}>
                    	<Image style={{width:100,height:100}} source={{ uri: (prod_variation_url+(item.image).replace(' ','_')) }} />

                    	<View style={{alignSelf:'center',paddingLeft:20,width:"60%"}}>
	                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:18}}>{fristLetterCapital(item.attribute_name)}</Text>
	                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:16}}>Qty: {item.total_item}</Text>
                        </View>
                    </View>
                )
            })
        )
	}

	renderOrderDetails(){
		console.log(this.props.OrderDetails);
		let orderDetails = this.props.OrderDetails;
		if(orderDetails.length >0){
			return(
				<View>
					<Text style={styles.boldHeading}>View order details</Text>
					<View style={styles.prodBlock}>
						<View style={{flexDirection:'row'}}>
							<Text style={styles.heading}>Order No:</Text>
							<Text style={styles.content}>{orderDetails[0].order_no}</Text>
						</View>
						<View style={{flexDirection:'row'}}>
							<Text style={styles.heading}>Order Date:</Text>
							<Text style={styles.content}>{orderDetails[0].date}</Text>
						</View>
						<View style={{flexDirection:'row'}}>
							<Text style={styles.heading}>Order Total:</Text>
							<Text style={styles.content}>Rs. {orderDetails[0].sub_total_cost}</Text>
						</View>
					</View>
					<Text style={styles.boldHeading}>Product Delivery details</Text>

					<View style={{width:'90%',alignSelf:'center',marginTop:20}}>
						<View style={{flexDirection:'row'}}>
							<Text style={styles.boldHeading}>Order Status:</Text><Text style={{paddingLeft:3,fontSize:18,fontFamily:constants.fonts.Cardo_Regular}}>{findOrderStatus(orderDetails[0].order_status)}</Text>
						</View>
						{this.renderProdOfDelivery()}
						<View style={{width:'100%',height:20}}/>
					</View>
				</View>
			)
		}else{
			return(
				<View>
					<Text style={{alignSelf:'center'}}>
						Loading..
					</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE
    },
    heading:{
    	fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16,
        width:"40%"
    },content:{
    	fontFamily:constants.fonts.Cardo_Regular,
        fontSize:16,
    }
    ,boldHeading:{
    	fontFamily:constants.fonts.Cardo_Bold,
        fontSize:18,
        paddingLeft:10
    },prodBlock:{
    	width:'90%',
        alignSelf:'center',
        backgroundColor:"white",
        borderRadius:2,
        elevation:2,
        padding:10,
        marginBottom:10,
        marginTop:10,
    }
})

const mapStateToProps = state => ({
    animate : state.indicator,
    orderList: state.data.orderList,
    authUserID: state.data.authUserID,
    OrderDetails:state.data.orderDetail,
});

const mapDispatchToProps = dispatch => ({
    getOrderDetails: (data) => dispatch(getOrderDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);