import React,{Component} from 'react'
import {View ,Text,StyleSheet,Alert,Dimensions,FlatList,ToastAndroid,Image,RefreshControl,SafeAreaView,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import { prod_image ,weburl } from '../constants/url'
import {getNotification,removeNotification} from '../lib/notification'
import {Loader} from '../customElement/Loader'
import {TextHeading,EmptyComp} from '../customElement/Input'
import Icons from 'react-native-vector-icons/FontAwesome'
import {showErrorMsg,replaceAllSpace} from '../lib/helper'
import FastImage from 'react-native-fast-image'
import {resetNewNotification} from '../appnavigation/RootNavigation'
import {unsetNewNotifiCounterToStorage} from '../services/async-storage'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            trackOrderId:'',
            refreshing:false,
        }
    }

    componentDidMount(){
        this.handleServerReq();
        this.resetNotificationCounter();
    }

    resetNotificationCounter(){
        if(this.props.totalNewNotification !="" && this.props.totalNewNotification>0){
            setTimeout(()=>{
                unsetNewNotifiCounterToStorage();
                resetNewNotification();
            },2000);
        }
    }


    async handleServerReq(){
        this.props.loading_notification();
        //dispatch({type:"LOADING_USER_NOTIFICATION"});
        let result = await this.props.getNotifications();
    }

    async onRefresh(){
        this.setState({refreshing:true});
        let result = await this.props.getNotifications();
        this.setState({refreshing:false});
    }



    _loadLoader() {
            if(this.props.animate){
                return(
                    <Loader />
            )
        }
    }

    renderImageMsg(item){
        // console.log("notification url=>",(item.image_url).replace(' ','_'));
        if(item.image_url !=""){
            return(
                <View style={constants.width >300 ?{flexDirection:"row"}:{}}>
                    <View style={{padding:5,width:width*0.5}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18,lineHeight:25}}>{item.title}</Text>
                        <TouchableOpacity>
                            <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:16,lineHeight:25}}>{item.message}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FastImage
                            style={{width:width*0.4,height:width*0.4,marginTop:10}}
                            source={{
                                uri:replaceAllSpace(item.image_url),
                                priority: FastImage.priority.normal,
                                cache: FastImage.cacheControl.immutable,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {/*<Image style={{width:width*0.4,height:width*0.4,marginTop:10}} resizeMode={"contain"} source={{uri:replaceAllSpace(item.image_url)}} />*/}
                    </View>
                </View>
            )
        }else{
            return(
                <View style={{padding:10}}>
                    <TouchableOpacity onPress={()=>{item.type == "order"?this._trackOrderOnpress(item.order_no):''}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18,lineHeight:25}}>{item.title}</Text>
                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:16,lineHeight:25}}>{item.message}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

     renederItemType() {
        let notification = this.props.userNotifications;
        if (notification.length > 0) {
          return (
            <FlatList
                data={notification}
                    // refreshControl={
                    //     <RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()} />
                    // }
                    renderItem={({ item }) => (
                    <View style ={styles.prodBlock}>
                        <View style={item.type == "order" ? styles.orderNotifications:styles.offerNotification}/>
                        <View style={{flexDirection:'column'}}>
                            {this.renderImageMsg(item)}
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingBottom:10,marginTop:constants.vh(10),width:width*0.98}}>
                                <View style={{flexDirection:'row'}}>
                                    <Icons name="bell" size={16} color={constants.Colors.color_BLACK}/>
                                    <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:14,paddingLeft:10}}>{item.date}</Text>
                                </View>
                                <View style={{marginRight:20,}}>
                                    <TouchableOpacity style={{paddingLeft:10,paddingRight:10}} onPress={()=>this._removeWishList(item.id)}>
                                        <Icons name="trash-o" color={constants.Colors.color_BLACK} size={20}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
              
                numColumns={1}
                keyExtractor={item => item.id}
                ListFooterComponent={
                        <View style={{height:100}}/>
                }
            />
          )
        }else{
            
                if(this.props.animate == false){
                return(
                        <EmptyComp imageName={constants.image.emptyNotification} 
                            welcomText={"You don't have any notification yet"}
                            redirectText={""}
                            onPress={()=>this.props.navigation.navigate("MainHome")}
                        />
                    )
                }
        }
      }


        _trackOrderOnpress(order_number){
            if( order_number!= ""){
                this.props.navigation.navigate('OrderDetails', {order_no: order_number});
            }
        }

        _removeWishList(notifyId){
            if(notifyId !=''){
                Alert.alert(
                    'Farmstop',"Do you want remove this?",
                    [
                        {
                            text: 'Ok',
                            onPress: () => this.props.remove_notify(notifyId),
                        },
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false }
                );
            }else{
                showErrorMsg("Something went wrong,Please try after some time.",'');
            }
        }

        render(){
            return(
                <SafeAreaView style={styles.container}>
                {/*<View style={styles.container}>*/}
                    <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                    <View style={{width:'100%',alignSelf:"center"}}>
                        {/*<TextHeading title="My Notification"/>*/}
                        <ScrollView keyboardShouldPersistTaps={'handled'}
                         refreshControl={
                            <RefreshControl refreshing={this.state.refreshing}
                            onRefresh = {()=>this.onRefresh()}/>
                         }
                        >
                            {this.renederItemType()}
                        </ScrollView>
                    </View>
                    {this._loadLoader()}
                </SafeAreaView>
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
    animate : state.notification.notification_load,
    userNotifications: state.notification.userNotifications,
    authUserID: state.data.authUserID,
    token:state.data.token,
    totalNewNotification:state.notification.totalNewNotification
});

const mapDispatchToProps = dispatch =>({
    loginedIn :(data) =>dispatch({type:'AUTHORIZED-USER', email:data.email ,mobile:data.mobile ,userID:data.userId,profile:data.profile,login_type:data.login_type,authName:data.authName,token:data.token}),
    loading_notification:(data) =>dispatch({type:'LOADING_USER_NOTIFICATION'}),
    getNotifications:()=>dispatch(getNotification()),
    remove_notify:(data)=>dispatch(removeNotification(data)),
    refreshNotification:(response)=>dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:response.user_notification})

});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

