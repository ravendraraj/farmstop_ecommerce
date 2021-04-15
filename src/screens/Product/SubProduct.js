import React, {useEffect,useState} from 'react'
import { View,ScrollView, Image,Text, Alert,FlatList,StyleSheet,TouchableOpacity,Dimensions ,ToastAndroid, StatusBar} from 'react-native'
import { connect } from 'react-redux';
import {prod_variation_url} from '../../constants/url'
import constants from '../../constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {Loader} from '../../customElement/Loader'
import { getProductType,setWishListItemOnServer } from '../../lib/api'
import ProdBoxWithMargin from '../../customElement/BlockComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const totalprod = Math.ceil((height/constants.vw(330))*2);

const SubProduct=(props)=>{
    const [ isRefreshing, setRefresh ] = useState(false);
    const [data,setData] = useState({
        page_no:1,
        total_prod:totalprod,//10,
        active_prod:'',
        onEndReachedCalledDuringMomentum: true,
    });

    useEffect(()=>{
        if(props.data.activeProduct !=''){
            if(props.data.activeProduct != data.active_prod){
                handeleReq();
                setData({...data,active_prod:props.data.activeProduct});
            }
        }else{
            let defaultSearch = props.data.productData;
            props.dispatch({ type: 'ACTIVE-PROD', id:defaultSearch[0].id });
            //setData({...data,active_prod:defaultSearch[0].});
            //handeleReq();
        }
    },[props.data.activeProduct]);

    const handeleReq=async()=>{
        props.dispatch({type:'PRODUCT_VARIATION_LOADING'});
        let result = await props.dispatch(getProductType({prodID:props.data.activeProduct, start:0, end:data.page_no*data.total_prod}));
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
        if(props.data.token !="" && props.data.authUserID !=""){
            var data = [];
                data["id"] = prodData.id;
                data["screen"] = "PorductVariation";
                props.dispatch(setWishListItemOnServer(data));

        }else{
            props.navigation.navigate("SocialLogin");
        }
    };

    const loader=()=>{
        if(props.data.product_vari_loading == true){
            return(
                <Loader/>
            )
        }
    }

    const loadMoreRandomData=async()=>{
        if(!data.onEndReachedCalledDuringMomentum && props.data.activeProduct !=''){
            if(props.data.product_vari_loading == false){
                setData({ ...data,onEndReachedCalledDuringMomentum: true })
                //await this.props.getProductType({prodID:this.props.activeProd ,start:((this.state.page * totalprod)+1), end:totalprod});
                props.dispatch({type:'PRODUCT_VARIATION_LOADING'});
                let result = await props.dispatch(getProductType({
                    prodID:props.data.activeProduct, 
                    start:data.page_no*data.total_prod,
                    end:data.total_prod
                }));
                if(result == "success"){
                    setData({
                        ...data,
                        page_no:data.page_no+1
                    });
                }
            }else{
                //ToastAndroid.showWithGravity("No more product find", ToastAndroid.SHORT, ToastAndroid.TOP);
            }
        }
    }

    const onMomentumScrollBegin = () => setData({ ...data,onEndReachedCalledDuringMomentum: false });

    const checkProductDetails=(product_var_id)=>{
        props.dispatch({type:'SORT_SINGLE_PROD_DETAIL',product_var_id:product_var_id});
        props.navigation.navigate("SingleProductDesc");
    }

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
                                screenName={"Product"}
                                onPress={()=>_addinWishList(item)}
                                {...props}
                            />
                        
                    )}
                    numColumns={2}
                    keyExtractor={(item) => item.id}

                    //refreshing={isRefreshing}
                    //onRefresh={()=> _handleRefresh()}

                    onEndReached={() => loadMoreRandomData()}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() =>onMomentumScrollBegin()}

                />
            </View>
            {loader()}
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