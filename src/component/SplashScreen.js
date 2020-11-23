import React, {useEffect} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import constants from "../constants";

const SplashScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#FFFFFF' barStyle="dark-content"/>
        <View style={styles.header}>

          <Animatable.Image 
              style={styles.logo}
              duraton="1500"
              resizeMode="contain"
              //animation="zoomIn" 
              source={constants.image.welcomeLogo}
          />

          <Text style={styles.welcomText}>Welcome to farmstop</Text>
          <ActivityIndicator size="large" color={constants.Colors.color_heading} style={{marginTop:15}}/>
        </View>
      </View>
  );
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo:{
      width: constants.height*0.39,
      height: constants.height*0.39,
  },
  shadow:{
    width:'90%',
    marginTop:constants.vh(20),
    alignSelf:'center',
    textAlign:'center',
    color:constants.Colors.color_intro,
    fontSize:25,
    fontFamily:"Cardo-Bold"
  },
  welcomText: {
    color: '#7F462C',
    textAlign: 'center',
    fontSize: 25,
    padding: 20,
    fontFamily:constants.fonts.Cardo_Bold
  },
});