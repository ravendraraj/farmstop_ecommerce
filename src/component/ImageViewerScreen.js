
import React from 'react';
import {SafeAreaView, StyleSheet, View,Modal,Text,ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import constants from '../constants'

const ImageViewerScreen = () => {
  const images = [
    {
      url:"https://www.farmstop.in/uploads/certificate/c1.jpeg",
    },
    
    {
      url:
        "https://www.farmstop.in/uploads/certificate/c2.jpeg",
    },
    
    {
      url:
        "https://www.farmstop.in/uploads/certificate/c3.jpeg",

    },
    
    {
      url:
        "https://www.farmstop.in/uploads/certificate/c4.jpeg",
    },
  ];

  const imgViewerLoader=()=>{
      return(
          <View style={{width:constants.width*0.9,height:constants.width*0.9, justifyContent:'center',alignItems:"center"}}>
            <ActivityIndicator size="large" />
          </View>
        )
  }

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: constants.Colors.color_WHITE}}>
      <View style={styles.container}>
        <ImageViewer
          imageUrls={images}
          backgroundColor= {constants.Colors.color_WHITE}
          loadingRender ={()=>{imgViewerLoader()}}
          style={styles.ImageViewerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.Colors.color_WHITE,
    flex: 1,
  },
  ImageViewerStyle:{
    marginTop:-50,
    width:constants.width*0.95,
    height:constants.height*0.98,
  }
});

export default ImageViewerScreen;