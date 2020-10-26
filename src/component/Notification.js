import React,{Component} from 'react'
import {View ,Text,StyleSheet,Alert,Dimensions,FlatList,ToastAndroid,Image,RefreshControl,SafeAreaView} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../constants'
import SocialLinks from '../component/SocialLinks'
import { prod_image ,weburl } from '../constants/url'
import {getOrderList,getNotification,removeNotification} from '../lib/api'
import {Loader} from '../customElement/Loader'
import {TextHeading,EmptyComp} from '../customElement/Input'
import Icons from 'react-native-vector-icons/FontAwesome'
import {showErrorMsg} from '../lib/helper'
import AsyncStorage from '@react-native-community/async-storage'

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
        this.updateNotification()
    }


updateNotification(){

    if(this.props.authUserID !=null && this.props.authUserID !=""){
        this.props.getNotifications();
    }else{
        this.getAsyncData("authData").then((authData) => {
                    
            if(authData != null){
                let objAuthData = JSON.parse(authData);
                this.props.loginedIn({email:objAuthData.email, mobile:objAuthData.mobile ,userId:objAuthData.userId ,profile:objAuthData.profile,login_type:objAuthData.Login_Type,authName:objAuthData.name,token:objAuthData.token})
                this.props.getNotifications();
                        
            }else{
                this.props.navigation.navigate('SocialLogin');
            }
        });
    }
}

async  getAsyncData(params) {
    try {
    
        let data = await AsyncStorage.getItem(params);
        return data;
    
    }catch(e) {
            console.log(e);
    }
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
                    <Image style={{width:width*0.4,height:width*0.4,marginTop:10}} resizeMode={"contain"} source={{uri:(item.image_url).replace(' ','_')}} />
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

onRefresh(){
    if(this.props.authUserID !=null && this.props.authUserID !=""){
        this.setState({refreshing:true});
        //setTimeout(() => {this.setState({refreshing:false})},12000);

        let url = weburl + 'api-get-notification';
        var formData = new FormData();
            formData.append("user_id", this.props.authUserID);
            formData.append("token",this.props.token);

        let post_req = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                }
        }
        
        //console.log(url,post_req);

        fetch(url,post_req)
        .then(res =>{
            res.json()
            .then(response => {
                if(response.status == "1"){
                    this.setState({refreshing:false})
                    this.props.refreshNotification(response);
                }else{
                    this.setState({refreshing:false})
                }
            })
            .catch( err => {
                this.setState({refreshing:false})
            })
        })
        .catch( err => {
            this.setState({refreshing:false})
        });
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
                <View style={{width:'100%',alignSelf:"center"}}>
                    <TextHeading title="My Notification"/>
                    <ScrollView keyboardShouldPersistTaps={'handled'}
                     refreshControl={
                        <RefreshControl refreshing={this.state.refreshing}
                        onRefresh = {()=>this.onRefresh()}/>
                     }
                    >
                        {this.renederItemType()}
                        {this._loadLoader()}
                    </ScrollView>
                </View>
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
    animate : state.indicator,
    userNotifications: state.data.userNotifications,
    authUserID: state.data.authUserID,
    token:state.data.token
});

const mapDispatchToProps = dispatch => ({
    loginedIn :(data) =>dispatch({type:'AUTHORIZED-USER', email:data.email ,mobile:data.mobile ,userID:data.userId,profile:data.profile,login_type:data.login_type,authName:data.authName,token:data.token}),
    getNotifications:()=>dispatch(getNotification()),
    remove_notify:(data)=>dispatch(removeNotification(data)),
    refreshNotification:(response)=>dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:response.user_notification})

});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

