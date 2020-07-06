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

class PorductVariation extends Component {
    constructor(props){
        super(props)
        // this.props.getItem();
    }

    componentDidMount(){
        //console.log("I am Call")
        //this.props.getItemVariation({start:0,end:((totalprod-1)*2)});
    }

    _getItemType(prod_id){
        Alert.alert("Selected Prod"+prod_id);    
    }
    
    _knowMore(prod_id){
        this.props.knowMore(prod_id);
        navigate("knowMoreProd");
    }


    renederItemType () {
        let ItemList = this.props.itemtypeData;
        if(ItemList != "undefined" && ItemList !=null){
            let producName = ItemList[0].pname;
        return(
            <View>
                <Text style={{fontSize:18,color:constants.Colors.color_heading,fontFamily:italic,marginTop:40,marginBottom:30}}>
                    {fristLetterCapital(producName)}
                </Text>
            <FlatList
            data={ItemList}
            renderItem={({ item }) => (
                <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:40}} >
                    {/* <TouchableOpacity onPress={()=>this._getItemType(item.id)}> */}
                    <View>
                        <Image style={styles.imageThumbnail} source={{ uri: (prod_variation_url+(item.fimage).replace(' ','_')) }} />
                        <TouchableOpacity style={{position:'absolute',top:-4,right:0}}
                        onPress={()=>this._addinWishList(prodDetails.produc_id,prodDetails.id)}>
                            <Material name="heart-outline" color={constants.Colors.color_grey} size={30}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:12,marginTop:10,alignSelf:'center',fontFamily:regular}}>{fristLetterCapital(item.attribute_name)}</Text>
                    </View>
                    {/* </TouchableOpacity> */}

                    {/** Select Option */}
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
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10,marginTop:10}}>
                            <Text style={{fontSize:20,fontFamily:bold}}>Rs. {item.price}</Text>
                            <TouchableOpacity style={{padding:2,flexDirection:'row',backgroundColor:constants.Colors.color_heading,width:85,alignSelf:'flex-end',justifyContent:'center',borderRadius:4}}>
                                <Material name="cart" size={15} color={constants.Colors.color_BLACK}/>
                                <Text style={{fontSize:12,fontFamily:regular}}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>

                        {/**Know More  section */}
                        <TouchableOpacity style={{alignSelf:'center',marginTop:15}} onPress={()=>this._knowMore(item.id)}>
                            <Text style={{fontFamily:bold}}>Know More</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
            //Setting the number of column
            numColumns={1}
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
                {/* <ScrollView > */}
                    {/* <SearchBox autoCapitalize="none"
                        //onChangeText={(val) => this.textInputChange(val)}
                        placeholder={'Search for good health'}
                    /> */}
                    <View style={styles.MainContainer}>
                        {this.renederItemType()}
                    </View>
                {/* </ScrollView> */}
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
    }
  });

const mapStateToProps = state => ({
    itemtypeData :state.data.productVatiation,
});

const mapDispatchToProps = dispatch => ({
    getItemVariation: (data) => dispatch(getProductVariation(data)),
    knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(PorductVariation);
