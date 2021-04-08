import React, {useEffect,useState} from 'react'
import { View,ScrollView, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions ,ToastAndroid, StatusBar} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../../constants/url'
import constants from '../../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../../customElement/Loader'
import { getProductType,setWishListItemOnServer } from '../../lib/api'

import {ProdBoxWithMargin} from '../../customElement/BlockComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil(height/(width/2));

const SubProduct=(props)=>{

    const [ isRefreshing, setRefresh ] = useState(false);

    const [data,setData] = useState({
        page_no:1,
        total_prod:10,
        active_prod:'',
    });

    useEffect(()=>{
        if(props.data.activeProduct !=''){
            if(props.data.activeProduct != data.active_prod){
                handeleReq();
                setData({...data,active_prod:props.data.activeProduct});
            }
        }
    },[props.data.activeProduct]);

    const handeleReq=async()=>{
        let result = await props.dispatch(getProductType({prodID:props.data.activeProduct, start:0, end:data.page_no*data.total_prod}));
        // setData({
        //     ...data,
        //     page_no:2
        // });
    }

    const _handleRefresh = async () => {
        setRefresh(true);
        await setData({
                ...data,
                page_no:1
            });

        const payload = {
            prodID:props.data.activeProduct, 
            start:0, 
            end:data.page_no*data.total_prod
        };
        
        let result = await props.dispatch(getProductType(payload));
        //console.log("fertilizer==>",result);
        setRefresh(false);
    }

    const _addinWishList = prodData => {
        if(props.data.token != ""){
            var data = [];
                data["id"] = prodData.id;
                data["screen"] = props.route.name;
                props.dispatch(setWishListItemOnServer(data));

        }else{
            props.navigation.navigate("SocialLogin");
        }
    };

    return(
        <View style={styles.container}>
            <View style={{alginSelf:'center'}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props.data.productVatiation}
                    renderItem={({ item }) =>(
                      <ProdBoxWithMargin
                        prodImage={item.fimage !=''?(prod_variation_url+item.fimage):''}
                        prodData={item}
                        onPress={()=>_addinWishList(item)}
                      />
                    )}
                    numColumns={2}
                    keyExtractor={(item) => item.id}

                    refreshing={isRefreshing}
                    onRefresh={()=> _handleRefresh()}
                />
            </View>
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state){
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        indicator,data,error
    };
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_light_grey
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubProduct);