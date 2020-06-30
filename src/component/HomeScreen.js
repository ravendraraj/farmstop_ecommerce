import React, {Component} from 'react'
import {View,Text} from 'react-native'
import { connect } from 'react-redux';

class HomeScreen extends Component{
    render(){
        return(
            <View>
                <Text style={{fontStyle:'italic',color:'red'}}>
                    Seller Infomation
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    // animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
    // verify: data => dispatch(getLotDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
