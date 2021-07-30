import React, { useContext,useState } from 'react'
import { StyleSheet ,View,Text, Image,ImageBackground,StatusBar,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import image from "../constants/Image";
import constants from "../constants";
import {appIntroDone} from "../lib/api";
const slides = [
    {
        key: 'one',
        text: 'Your ethical organic e-store',
        image: image.appIntro1,
        brandImg: image.brandImages,
        backgroundColor: '#F7BB64',
    },
    {
        key: 'three',
        text: 'Loooking for authentic and genuine Organic Produce.',
        image: image.appIntro3,
        backgroundColor: '#F7BB64',
    },
];
 
function AppIntroScreen(props){

    const _onDone=()=>{
        props.dispatch(appIntroDone());
    }

    const _renderExploreMore=(key)=>{
        if(key === 'three'){
            return (
                <TouchableOpacity style={styles.exploreMoreBtn} onPress={()=>_onDone()}>
                    <Text style={{fontSize:14,color:constants.Colors.color_WHITE,fontFamily:constants.fonts.Cardo_Bold}}>EXPLORE MORE</Text>
                </TouchableOpacity>
                
            );
        }
    };

    const   _renderItem = ({ item }) => {
            if (item.key === 'one') {
                return (
                    <View style={styles.container}>
                            <StatusBar backgroundColor={constants.Colors.color_WHITE} barStyle="dark-content"/>
                                <Image source={item.image} style={{marginTop:constants.vh(100)}}/>
                                <Text style={styles.text}>{item.text}</Text>
                                    <View style={styles.barndCss}>
                                        <Image source={image.brand1} style={{ width:300, height: 70 }} />
                                    </View>
                                    <View style={styles.barndCss}>
                                        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center' }} >
                                            <Image source={image.fssai} style={{ width: 90, height: 90 }} />
                                            <Image source={image.indiaOrganic} style={{ width: 90, height: 90 }} />
                                        </View>
                                    </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <StatusBar backgroundColor={constants.Colors.color_WHITE} barStyle="dark-content"/>
                        <Image source={item.image} style={ item.key === 'two' ? styles.silder2 : styles.silder3}/>
                        <View style={{flex: 1,justifyContent:'flex-end',marginBottom:90}}>
                            <Text style={styles.paragraph}>
                                {item.text}
                            </Text>
                            
                            {_renderExploreMore(item.key)}
                            
                        </View>
                    </View >
                );
            }
        // }
    };

  return(
      
        <AppIntroSlider renderItem={_renderItem} data={slides}
            dotStyle={{ backgroundColor: 'black' }}
            activeDotStyle={{ backgroundColor:constants.Colors.color_heading }}
            showNextButton = {false}
            showDoneButton = {false}
        />
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#7F462C',
        textAlign: 'center',
        fontSize: 20,
        padding: 20,
        fontFamily:constants.fonts.Cardo_Regular
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white'
    },
    silder2: {  
        justifyContent:'center',
        width:constants.vh(400),
        height:constants.vh(400),
        marginTop:constants.vh(150)
    },
    silder3:{
        justifyContent:'center',
        alignItems:'center',
        width:constants.vh(400),
        height:constants.vh(400),
        marginTop:constants.vh(150)
    },
    paragraph: {
        textAlign: 'center',
        color: constants.Colors.color_intro,
        fontSize:20,
        alignSelf:'auto',
        marginBottom:2,
        fontFamily:constants.fonts.Cardo_Regular,
    },
    welcomText: {
        color: '#7F462C',
        textAlign: 'center',
        fontSize: 25,
        padding: 20,
        fontFamily:constants.fonts.Cardo_Bold
    },
    barndCss:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    exploreMoreBtn:{
        alignSelf:'flex-end',
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:1,
        borderColor:constants.Colors.color_BLACK,
        borderRadius: 5,
        borderColor: constants.Colors.color_heading,
        marginBottom:constants.vw(2),
        marginTop:4,
        marginRight:14,
        backgroundColor:constants.Colors.color_heading,
        elevation:10
    }
});

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state) {
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        indicator,data,error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroScreen);