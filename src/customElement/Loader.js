import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from 'react-native';

export const Loader = () => { 
    return(
        <View style={Styles.container}>
            <ActivityIndicator size="large" color='#6a0912'/>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 20,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      zIndex: 10,
      opacity: 0.6,

    },
});