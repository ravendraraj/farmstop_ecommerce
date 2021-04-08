import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Image,
    Pressable
} from 'react-native';

import Animated, { useSharedValue,withSpring,useAnimatedStyle,Extrapolate,interpolate } from 'react-native-reanimated';
import constants from "../constants";
import {ProductTitle} from "./Input";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {fristLetterCapital,replaceAllSpace} from '../lib/helper'
import FastImageComponent from './FastImageComponent'

export const ProdBoxWithMargin=(props)=>{
    //const liked = useSharedValue(0);
    const liked = useSharedValue(3.1415)

    const outlineStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
            },
          ],
        };
    });

    const fillStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              scale: liked.value,
            },
          ],
          opacity: liked.value,
        };
    });

    return(
        <View style={{...styles.itemBlockWithMargin}}>
            <FastImageComponent
                layout={styles.image_layout}
                image_url={replaceAllSpace(props.prodImage)}
                resizeImage={"contain"}
            />
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{width:"80%"}}>
                <ProductTitle title={props.prodData.attribute_name}/>
                </View>
                {
                    ("isMyWish" in props.prodData) == true?
                    (   <TouchableOpacity {...props}>
                            <Material 
                                name={props.prodData.isMyWish == ''?"heart-outline":"heart"} 
                                color={constants.Colors.color_grey} size={22}
                            />
                        </TouchableOpacity>
                    ):(<></>)
                }

                

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image_layout:{
        width:constants.width*0.46,
        height:constants.width*0.46,
        alignSelf:'center'
    },
    itemBlockWithMargin:{
        width:constants.width*0.5,
        height:constants.vw(280),
        alignSelf:'center',
        borderRadius:0,
        borderWidth:0.2,
        borderColor:constants.Colors.color_platnium,
        backgroundColor:constants.Colors.color_WHITE,
        borderWidth:constants.vw(0.3),
        margin:1,
        padding:constants.vw(10)
    },
});