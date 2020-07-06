import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import SocialLink from './SocialLinks'
//helper function
import {fristLetterCapital} from '../lib/helper'
import { ScrollView } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const bold = constants.fonts.Cardo_Bold;
const regular = constants.fonts.Cardo_Regular;
const italic = constants.fonts.Cardo_Italic;

class KnowMore extends Component {
    constructor(props){
        super(props)
        // this.props.getItem();
        this.state={
            my_wish:'heart-outline',
            wishProdId:null,
            wishProdType:null,
        }
    }

    componentDidMount(){
        //console.log("I am Call")
        //this.props.getItemVariation({start:0,end:((totalprod-1)*2)});
    }

    _addinWishList(prod_id,prodTypeId){
        if(this.state.my_wish == "heart-outline"){
            this.setState({my_wish:'heart',wishProdId:prod_id,wishProdType:prodTypeId})
        }else{
            this.setState({my_wish:'heart-outline',wishProdId:null,wishProdType:null})
        }
    }
    


    renederItemType () {
        let ItemList = this.props.itemtypeData;
        let prodId = this.props.prodId;
    
        if(ItemList != "undefined" && ItemList !=null && prodId != null){
            // let producName = ItemList[0].pname;
            let prodDetails = ItemList.find((item) => item.id === prodId);
            let prodDesc = prodDetails.long_description != '' ? prodDetails.long_description : 'Not Available.';
            console.log(prodDetails);
            return(
                <View style={{alignItems:'center'}}>
                    <View style={{marginTop:20}}>
                        <Image source={{uri:(prod_variation_url+(prodDetails.fimage).replace(' ','_'))}} style={styles.singleImg}/>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginTop:-20,marginRight:-30}}
                        onPress={()=>this._addinWishList(prodDetails.produc_id,prodDetails.id)}>
                            <Material name={this.state.my_wish} color={constants.Colors.color_grey} size={30}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:25,marginTop:10,alignSelf:'center',fontFamily:bold}}>{fristLetterCapital(prodDetails.attribute_name)}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignSelf:'center',width:'80%',marginTop:30}}>
                    <View style={{alignItems:'flex-start'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity style={{marginRight:10}}>
                                <Material 
                                    name="minus-circle-outline"
                                    color={constants.Colors.color_grey}
                                    size={25}
                                />
                            </TouchableOpacity>

                            <Text style={{fontSize:20,fontFamily:regular}}>Select</Text>

                            <TouchableOpacity style={{marginLeft:10}}>
                                <Material 
                                    name="plus-circle-outline"
                                    color={constants.Colors.color_grey}
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{fontFamily:regular,fontSize:20,paddingLeft:3}}>Rs. {prodDetails.price}</Text>
                    </View>
                    <TouchableOpacity style={{padding:4,flexDirection:'row',backgroundColor:constants.Colors.color_heading,width:100,alignSelf:'flex-end',borderRadius:4,marginLeft:25}}>
                        <Material name="cart" size={15} color={constants.Colors.color_BLACK}/>
                        <Text style={{fontFamily:regular}}>Add to Cart</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{alignSelf:'center',justifyContent:'flex-start',marginTop:30}}>
                        <Text style={{fontFamily:constants.fonts.Cardo_Italic,fontSize:20}}>{prodDesc}</Text>
                    </View>

                    <View style={{alignSelf:'center',justifyContent:'flex-start',marginTop:30}}>
                        <Text style={{fontSize:25,fontFamily:bold}}>Know your source</Text>
                        <Text style={{fontSize:20,fontFamily:regular}}>check out our farms and follow us on</Text>
                        <SocialLink size='25'/>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>Not found</Text>
                </View>
            )
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView>
                    {this.renederItemType()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:30,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 10,
        backgroundColor:constants.Colors.color_WHITE
      },
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      padding: 10,
    },
    singleImg: {
      alignItems: 'center',
      width:width/2,
      height:width/2,
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        margin:1
    }
  });

const mapStateToProps = state => ({
    itemtypeData :state.data.productVatiation,
    prodId:state.data.knowMoreProdId,
});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(KnowMore);
