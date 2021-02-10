import React,{Component,createRef} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,FlatList,TextInput,ToastAndroid,StatusBar,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl } from '../constants/url'
import {getOrderList} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {CouponTextInput ,PrimaryTextInput,TextHeading,EmptyComp} from '../customElement/Input'
import ActionSheet from "react-native-actions-sheet";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from '@react-native-community/checkbox';

const actionSheetRef = createRef();
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

        console.log("mount");
    }

    _loadLoader() {
        if(this.props.animate) {
            return(
                <Loader />
            )
        }
    }


    listFilters(){
        return(
            <View style={{backgroundColor:constants.Colors.screen_title}}>
                <TouchableOpacity style={{flexDirection:'row',padding:10,justifyContent:'flex-end'}}
                    onPress={()=>{actionSheetRef.current?.setModalVisible()}}
                >
                    <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vh(18),color:constants.Colors.color_statusbar}}>Filter</Text>
                    <Material name={'filter-outline'} size={constants.vh(20)} color={constants.Colors.color_statusbar}/>
                </TouchableOpacity>
            </View>
        )
    }

    renederItemType() {
        let orderList = this.props.orderList;
        if (orderList.length > 0) {
        	var i=1;
          return(
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

    setToggleCheckBox(value,filter){
        console.log("check box",value);
        this.props.setFilter(filter);
    }

    applyFilters(){
        this.props.getOrderList();
        actionSheetRef.current?.hide();
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                <View style={{width:'100%',alignSelf:"center"}}>
                    {/*<TextHeading title="My Orders"/>*/}
                    {this.listFilters()}
                	{this.renederItemType()}
                    <ActionSheet
                        ref={actionSheetRef} 
                        gestureEnabled={true} bounceOnOpen={true}
                    >
                        <View style={{flexDirection:'row',justifyContent:"space-between",backgroundColor:constants.Colors.color_statusbar,padding:constants.vw(10)}}>
                            <Text style={{fontFamily:constants.fonts.Cardo_BOLD,fontSize:constants.vh(18),color:constants.Colors.color_WHITE}}>Select you filter</Text>
                            <TouchableOpacity style={{backgroundColor:constants.Colors.color_WHITE,padding:constants.vw(5),borderRadius:constants.vw(5),elevation:5}}
                                onPress={()=>{this.applyFilters()}}
                            >
                                <Text style={{fontFamily:constants.fonts.Cardo_BOLD,fontSize:constants.vh(16),color:constants.Colors.color_statusbar}}>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{padding:constants.vw(10)}}>
                            <FlatList
                                data={this.props.orderFilter}
                                renderItem={({ item }) =>(
                                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:constants.Colors.screen_title,marginBottom:constants.vh(5),padding:constants.vw(10)}}>
                                        <Text style={{fontFamily:constants.fonts.Cardo_BOLD,fontSize:constants.vh(16),color:constants.Colors.color_statusbar}}>{item.filter}</Text>
                                        <CheckBox
                                            value={item.selected}
                                            onValueChange={(newValue) => this.setToggleCheckBox(newValue,item.filter)}
                                            disabled={false}
                                            onAnimationType={'one-strok'}
                                        />
                                    </View>
                                )}
                              
                                numColumns={1}
                                ListFooterComponent={()=>(
                                        <View style={{height:100}}/>
                                )}
                                
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ActionSheet>
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
        width:'98%',
        backgroundColor:"white",
        borderRadius:10,
        borderColor:constants.Colors.color_statusbar,
        borderWidth:constants.vw(0.6),
        //elevation:4,
        padding:constants.vw(10),
        marginBottom:constants.vh(10),
        marginTop:constants.vh(10),
    },date:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vh(16)
    },
    heading:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vh(16),
        width:"40%"
    }
})

const mapStateToProps = state => ({
    animate : state.indicator,
    itemData: state.data.productData,
    orderList: state.data.orderList,
    authUserID: state.data.authUserID,
    itemData: state.data.productData,
    orderFilter:state.data.orderFilters
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    getOrderList:()=>dispatch(getOrderList()),
    setFilter:(data)=>dispatch({type:'FILTER_ORDER_LIST',filter:data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);

