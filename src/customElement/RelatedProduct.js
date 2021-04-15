import React, { Component } from 'react'
import { View, Image,Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import {prod_variation_url} from '../constants/url'
import constants from '../constants'
import {fristLetterCapital,removeTags,replaceAllSpace} from '../lib/helper'
import FastImageComponent from '../customElement/FastImageComponent'
import {ShortProductTitle} from "./Input";
import {MainContentHeading,ProductTitle,OutOfStockTitle} from '../customElement/Input'

function RelatedProduct(props){
	var filterData = props.itemtypeData;
	if(props.activeProdItem !="" && props.activeProdItem != null){
		filterData =props.itemtypeData.filter(item=>(item.id != props.activeProdItem));
	}

	return(
		<View>
		{			
			filterData.length>0?(
				<View>
				<View style={{padding:constants.vw(10)}}>
				            <MainContentHeading
				            	title={"Recommended Products :"}
				            />
			            </View>
			            <View style={{
			            	backgroundColor:constants.Colors.color_light_grey,
			            	paddingRight:constants.vh(-10),
			            	paddingLeft:constants.vh(-10),
			            	paddingTop:constants.vh(10),
			            	paddingBottom:constants.vh(10),
			            }}>
				            <FlatList
				                showsVerticalScrollIndicator={false}
				                showsHorizontalScrollIndicator={false}
				                horizontal={true}
				                data={filterData}
				                renderItem={({ item })=>(
				                    <TouchableOpacity style={styles.itemBlockWithMargin}
				                    	onPress={()=>props.checkProductDetail(item)}
				                    >
				                    	<FastImageComponent
							                layout={styles.image_layout}
							                image_url={replaceAllSpace(prod_variation_url+item.fimage)}
							                resizeImage={"contain"}
							            />
							            <View style={{...styles.row,alignItems:'center',justifyContent:'center'}}>
								            <ShortProductTitle
								            	title={item.attribute_name}
								            />
							            </View>
				                    </TouchableOpacity>
				                )}
				                numColumns={1}
				                keyExtractor={(item) => item.id}
				            />
			            </View>
			    </View>):(<></>)
		        }
        </View>
	)
}

const styles=StyleSheet.create({
	image_layout:{
        width:constants.width*0.46,
        height:constants.width*0.46,
        alignSelf:'center'
    },
    row:{
    	marginTop:constants.vh(5),
    	marginBottom:constants.vh(5),
    },
    itemBlockWithMargin:{
        width:constants.width*0.5,
        //height:constants.vw(330),
        alignSelf:'center',
        borderRadius:10,
        borderWidth:0.4,
        borderColor:constants.Colors.color_platnium,
        backgroundColor:constants.Colors.color_WHITE,
        borderWidth:constants.vw(0.3),
        margin:constants.vw(2),
        padding:constants.vw(10)
    },
});

export default RelatedProduct;

