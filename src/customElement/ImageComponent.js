import React,{useState} from 'react'
import {View ,StyleSheet,ActivityIndicator,Image,Text} from 'react-native'
import constants from "../constants"

function ImageComponent(props){
	const [ isProgress, setProgress ] = useState(false);
    const [ isError, setError ] = useState(false);
    //console.log("image url",props.imageUrl);
	return(
        <View>
            {(props.imageUrl !='')?(
                <View>
                    <Image 
                        style={props.layout}
                        source={{uri:props.imageUrl}}
                        onLoadStart={() => {setProgress(true)}}
                        onLoadEnd={() => {setProgress(false)}}
                        onError={()=>{setError(true)}}
                    />

                    <View style={{position:'absolute',top:"45%",left:"45%",zIndex:10}}>
                        <ActivityIndicator size="small" color={constants.Colors.secondary_color} animating={isProgress}/>
                    </View>
                </View>
                ):(
                    <View>
                        <Image style={props.layout} source={constants.image.noImageIcon}/>
                    </View>
                )
            }
        </View>
	)
}

export default ImageComponent;