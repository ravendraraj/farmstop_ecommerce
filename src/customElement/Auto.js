import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    ListView,
    } from 'react-native';

    import constants from '../constants'
    import {fristLetterCapital} from '../lib/helper'
    import { getProductType} from '../lib/api'
    
    const styles = StyleSheet.create({
    container: {
        flex: 1,
       flexDirection:'row'
    },
    container_text: {
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
        elevation: 3,
    },
    activeItem:{
        fontSize:16,
        color:constants.Colors.color_active_cat,
        fontFamily:constants.fonts.Cardo_Italic,
        paddingLeft:15,
        paddingTop:4,
        opacity:0.5
    },
    notActiveItem:{
        fontSize:18,
        color:constants.Colors.color_heading,
        fontFamily:constants.fonts.Cardo_Italic,
        paddingLeft:15
    }

});

class AutoScrollListview extends React.Component 
{

     constructor(props) {
    super(props);
    this.scrollX = 0;
    this.state = {
      dataFromServer: [] 
    };
  }

  componentWillUnmount() {
      // clearInterval(this.timer);
  }
startScroll()
{
//   setTimeout( () => {
//     this.flatListRef.scrollToOffset({ animated: false,offset: this.scrollX+5});
//  },300);
}
  componentDidMount() {
      // this.flatListRef.scrollToOffset({animated: true, offset: 0});
      // this.startScroll();
     
  }
  restartScroll(){
    // this.scrollX=0;
    // this.flatListRef.scrollToOffset({animated: false, offset:  this.scrollX});
    // console.log("onRestart","restart");
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10; // how far from the bottom
    return layoutMeasurement.width + contentOffset.x >= 
    contentSize.width - paddingToBottom;
  };

  handleScroll = (event) => {
  //  if (this.isCloseToBottom(event.nativeEvent)) {
  //           this.restartScroll();
  //           return;
  //         }
  //     this.scrollX = event.nativeEvent.contentOffset.x;
  //     this.startScroll();
    //   console.log(this.scrollX);
  }

  _selectCat(prod_cat_id){
        this.props.selectCat(prod_cat_id);
        this.props.getProductType({prodID:prod_cat_id ,start:0,end:this.props.totalProd});
  }

  render() {
    this.state.dataFromServer=this.props.itemList;
    let activeProdCat = this.props.activeProdCat;
   return (
           <View style={{flexDirection:'row'}}>
           {this.state.dataFromServer.map((item,index) => {
             return (
                    <TouchableOpacity onPress={()=>this._selectCat(item.id)}>
                            <Text style={activeProdCat == item.id ? styles.activeItem:styles.notActiveItem}>
                                {fristLetterCapital(item.title)}
                            </Text>
                    </TouchableOpacity>
             )
           })
         }
           </View>
   );
 }
}


const mapStateToProps = state => ({
    // my_wish_list :state.data.my_wish_list,
    // animate : state.indicator,
    activeProdCat:state.data.activeProduct
});

const mapDispatchToProps = dispatch => ({
    selectCat: (data)=>dispatch({type:'ACTIVE-PROD' ,id: data}),
    getProductType: (data) => dispatch(getProductType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoScrollListview);
