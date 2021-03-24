import React,{useContext} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import constants from '../constants';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    imageContainer:{
        width:constants.vw(100),
        height:constants.vw(100),
        resizeMode:'contain'
    }
});


const ErrorBox=(props) =>{
    return(
        <View style={{alignItems: 'center', justifyContent: 'center',width:'100%', borderRadius: 10, padding: 25 }}>
            <Text style={{ fontFamily:constants.fonts.Cardo_Bold,fontSize: 16,textAlign:'center' }}>
                {props.content}
            </Text>
            <View style={{marginTop:15,width:100,alignSelf:'center'}}>
                
                <TouchableOpacity {...props} style={{backgroundColor:constants.Colors.color_statusbar,padding:10}}>
                    <Text style={{ fontFamily:constants.fonts.Cardo_Bold,fontSize: 18,textAlign:'center',color:constants.Colors.color_WHITE }}>{props.btn_title}</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}


function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state) {
    let indicator = state.indicator;
    let error = state.error;
    return {
        indicator,error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);