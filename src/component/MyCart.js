import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { SearchBox } from '../customElement/Input'
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
//helper function
import {fristLetterCapital} from '../lib/helper'

//api call
import {getProduct} from '../lib/api'

//navigation function
import { navigate } from '../appnavigation/RootNavigation'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/100);
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class MyCart extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //console.log("I am Call")
        //this.props.getItemVariation({start:0,end:((totalprod-1)*2)});
    }

    _getItemType(prod_id){
        Alert.alert("Selected Prod"+prod_id);    
    }
    
    renederCartDetails(){
        let subtotal = this.props.subtotal;
        if(subtotal >0){
            return(
                <View style={{width:'90%',alignSelf:'center',marginTop:30,marginBottom:80}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.fonts}>Sub Total</Text>
                        <Text style={styles.fonts}>{subtotal}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.fonts}>Taxes</Text>
                        <Text style={styles.fonts}>{subtotal}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.fonts}>Delivery charges</Text>
                        <Text style={styles.fonts}>{subtotal}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.fonts}>Discount</Text>
                        <Text style={styles.fonts}>{subtotal}</Text>
                    </View>
                    <Text style={{fontFamily:bold,fontSize:20}}>You have a coupon</Text>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }
    }

    renederItemType () {
        let ItemList = this.props.cartData;
        if(ItemList != "undefined" && ItemList !=null){
        return(
            <View>
            <FlatList
            data={ItemList}
            renderItem={({ item }) => (
                <View style={{marginBottom:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                        <View>
                            <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                        </View>
                        <View style={{width:'50%'}}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginRight:8,marginLeft:5}}>
                                    <Material 
                                        name="minus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <Text style={{fontSize:20,fontFamily:bold}}>Select</Text>
                                <TouchableOpacity style={{marginLeft:8}}>
                                    <Material 
                                        name="plus-circle-outline"
                                        color={constants.Colors.color_grey}
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/**Price section */}
                            {/* <View style={{alignSelf:'center',marginBottom:10,marginTop:10,backgroundColor:'red',width:'100%'}}> */}
                                <Text style={{fontSize:20,fontFamily:regular,marginLeft:10}}>Rs. {item.price}</Text>
                            {/* </View> */}

            
                        </View>
                    </View>
                </View>
            )}

            //Setting the number of column
            numColumns={1}
            ListHeaderComponent={()=>(
                <View style={{width:'100%',height:20,marginBottom:10}}>
                </View>
            )}
            ItemSeparatorComponent={()=>(
                <View style={{alignSelf:'center',height: 2,width: "90%",backgroundColor: "#000",marginBottom:10,
                backgroundColor:constants.Colors.color_grey}}>
                </View>
            )}
            ListFooterComponent={()=>(
                this.renederCartDetails()
            )}
            
            keyExtractor={(item) => item.id}
            />
            </View>
        )
        }else{
            return(
                <View style={{alignSelf:'center'}}>
                    <Text> Loading....</Text>
                </View>
            )
        }
    }

    render() {
        return (

                <View style={styles.container}>
                        <View style={styles.MainContainer}>
                            <View>
                                <Text style={{fontSize:18,color:constants.Colors.color_heading,fontFamily:italic,paddingLeft:15}}>
                                    My Cart
                                </Text>
                            </View>
                            {this.renederItemType()}
                            {/* {this.renederCartDetails()} */}
                        </View>
                </View>
            )
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:constants.Colors.color_WHITE
      },
    MainContainer: {
     // justifyContent: 'center',
      //flex: 1,
      //padding: 10,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width:width/3.5,
      height:width/4,
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        margin:1
    },
    fonts:{
        fontSize:20,
        fontFamily:regular
    }
  });

const mapStateToProps = state => ({
    cartData :state.data.addedItems,
    subtotal:state.data.total,
});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
    knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
