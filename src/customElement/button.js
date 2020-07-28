import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import constants from "../constants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-community/picker';

const bold = constants.fonts.Cardo_Bold;
const italic = constants.fonts.Cardo_Italic;
const regular = constants.fonts.Cardo_Regular;

export const ButtonWithIcon = (props) => {
    return (
        <TouchableOpacity 
            style={styles.button} 
            {...props} >
            <Text style={styles.buttonText}>{props.buttonName}</Text>
            <AntDesign name={"right"} size={16} />
        </TouchableOpacity>
    );
}

export const NormalButton = (props) => {
    return (
        <TouchableOpacity 
            style={styles.nrmlbutton} 
            {...props} >
            <Text style={styles.nrmlbuttonText}>{props.buttonName}</Text>
        </TouchableOpacity>
    );
}

export const DropDown = (props)=>{
    // console.log(props.options);
    return(
        <View style={styles.DropDownWrapper}>
            <Picker
                {...props}
                // selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                style={styles.DropDown}
                // onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                >
                <Picker.Item label={props.intial_label} value={props.intial_value}/>
                { 
                    props.options.map( (item,index) => { 
                        // console.log(item.label+" - "+item.value);
                        return( <Picker.Item label={item.label} key={index} value={item.value} />)
                    })
                }

            </Picker>
        </View>
    )
}

export const AppartMentDropDown = (props)=>{
    // console.log(props.options);
    return(
        <View style={styles.DropDownWrapper}>
            <Picker
                {...props}
                // selectedValue = {item.selectedVariationID == ""? "": item.selectedQtyVariation}
                style={styles.DropDown}
                // onValueChange={ (value) => ( this.setVariationType(value,item.id))}
                >
                <Picker.Item label={props.intial_label} value={props.intial_value}/>
                { 
                    props.options.map( (item,index) => { 
                        // console.log(item.label+" - "+item.value);
                        return( <Picker.Item label={item.apartment} key={index} value={item.apartment} />)
                    })
                }

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        justifyContent:"space-between",
        borderWidth:1,
        borderColor:constants.Colors.color_grey,
        padding:10,
        borderRadius:10
    },
    buttonText:{
        color:constants.Colors.color_BLACK,
        fontFamily:regular
    },
    nrmlbutton:{
        backgroundColor:constants.Colors.color_heading,
        padding:10,
    },
    nrmlbuttonText:{
        alignSelf:"center",
        color:constants.Colors.color_WHITE,
        fontFamily:bold,
        fontSize:constants.vw(24)
    },
    DropDown:{
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.fonts.color_white
    },
    DropDownWrapper:{
        borderBottomWidth:3,
        borderColor: constants.Colors.color_e6e5e5
    }
});