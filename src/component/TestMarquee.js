import React ,{Component} from 'react'
import {View,Text } from 'react-native'
import { connect } from 'react-redux';
import AutoScrollListview from '../customElement/Auto'
import Marquee from '../customElement/marquee'

class TestMarquee extends Component{
 render() {
    const Auto=this.props.productData.length>0?<AutoScrollListview itemList= {this.props.productData} scrollPosition={5} /> :null;
    return (
            <View>
                    <Marquee duration={18*1000} >
                            {Auto}
                    </Marquee>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    // my_wish_list :state.data.my_wish_list,
    productData : state.data.productData,
});

const mapDispatchToProps = dispatch => ({
//     getWishListItem: ()=>dispatch(getWishListItem()),
//     addToCart :(prodId)=> dispatch({type:'ADD_WISH_ITEM_TO_CART',id:prodId}),
//     removeFromCart :(prodId)=> dispatch({type:'REMOVE_QUANTITY_ITEM_FROM_CART',id:prodId}),
//     removeloader:()=>dispatch({type : 'CANCEL_LOADING'}),
//     manageCartQty:(data) =>dispatch({type:'MANAGE-WISHPROD-QTY' ,activeProdId:data.prodId,actionType:data.typeOfAct}),
//     selectProdVariationInWish :(data)=>dispatch({type:"SET_PRODUCT_VARIATION_IN_WISH",prod_id:data.prod_id, variation:data.value})
});

export default connect(mapStateToProps, mapDispatchToProps)(TestMarquee);