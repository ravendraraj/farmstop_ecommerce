import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import constants from '../constants'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Loader = () => { 
    return(
        <SafeAreaView style={[Styles.overlay,{ alignItems: 'center', justifyContent: 'center' }]}>
            <View>
                <ActivityIndicator size="large" color={constants.Colors.color_heading}/>
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex:1,
        width: windowWidth,
        height: windowHeight+100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
        //backgroundColor:'transparent'
    }
});