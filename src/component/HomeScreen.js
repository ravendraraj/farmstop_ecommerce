import React, { Component } from 'react'
import { View, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { Searchbar, shadow, TextInput } from 'react-native-paper';
import CustomStyles from "../constants/CustomStyles";
import { SearchBox, TextHeading } from '../customElement/Input'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {prod_image} from '../constants/url'
import constants from '../constants'
import { navigate } from '../appnavigation/RootNavigation'

//api call
import {getProduct ,getProductType} from '../lib/api'
//import { constants } from 'fs';
const regular = constants.fonts.Cardo_Regular;
class HomeScreen extends Component {
    constructor(props){
        super(props)
        // this.props.getItem();
    }

    componentDidMount(){
        console.log("I am Call")
        this.props.getItem({start:1,end:6});
    }

    _getItemType(prod_id){
        this.props.getProductType(prod_id)
        // Alert.alert("Selected Prod"+prod_id);    
        navigate('ProductType');
    }
    
    renederItemType () {
        let ItemList = this.props.itemData;
        if(ItemList != "undefined" && ItemList !=null){
        return(
            <FlatList
            data={ItemList}
            renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'column', margin:4,alignItems:'center' }}>
                    <TouchableOpacity onPress={()=>this._getItemType(item.id)}>
                        <Image style={styles.imageThumbnail} source={{ uri: (prod_image+item.img) }} />
                        <Text style={{fontSize:12,marginTop:10,alignSelf:'center',fontFamily:regular}}>{item.title}</Text>
                    </TouchableOpacity>
                </View>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item) => item.id}
            />
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
                    <SearchBox autoCapitalize="none"
                        //onChangeText={(val) => this.textInputChange(val)}
                        placeholder={'Search for good health'}
                    />
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
      width:100,
      height: 100,
    },
  });

const mapStateToProps = state => ({
    itemData :state.data.productData,
});

const mapDispatchToProps = dispatch => ({
    getItem: (data) => dispatch(getProduct(data)),
    // selecttProd:(data)=>dispatch({type:'SELECT_PRODUCT',prodId:data}),
    getProductType:(data)=>dispatch(getProductType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
