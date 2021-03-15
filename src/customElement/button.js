import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import constants from "../constants"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import {Picker} from '@react-native-community/picker';

const bold = constants.fonts.Cardo_Bold;
const italic = constants.fonts.Cardo_Italic;
const regular = constants.fonts.Cardo_Regular;

export const ButtonWithIcon = (props) => {
    let leftIcon = props.leftIcon;
    let rightIcon = props.rightIcon;
    let image = props.isImg;

    return (
        <TouchableOpacity 
                style={styles.button} 
                {...props} >
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row'}}>
                    {image!= true ?(<Icons name={leftIcon} size={20} />):(<Image source={leftIcon} style={{width:20,height:20}}/>)}
                    <Text style={[styles.buttonText,{paddingLeft:20}]}>{props.buttonName}</Text>
                </View>
                    {rightIcon!= ""?(<Icons name={rightIcon} size={10} />):(<View/>)}
            </View>
        </TouchableOpacity>
    );
}

export const ButtonWithOutIcon = (props) => {
    return (
        <TouchableOpacity 
                style={{backgroundColor:constants.Colors.color_heading,padding:8,borderRadius:constants.vw(5),alignItems:'center',elevation:5}} 
                {...props} >
            <View>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_WHITE,fontSize:constants.vw(22)}}>{props.buttonName}</Text>
            </View>
        </TouchableOpacity>
    );
}

export const BorderButton = (props) => {
    return (
        <TouchableOpacity 
                style={{borderWidth:1,borderColor:constants.Colors.color_heading,paddingTop:5,paddingBottom:5,paddingLeft:20,paddingRight:20,borderRadius:constants.vw(5),alignItems:'center'}} 
                {...props} >
            <View>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_heading,fontSize:constants.vw(16)}}>{props.buttonName}</Text>
            </View>
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

export const StickyButtonComponent=(props)=>{
    return(
            <View style={styles.checkoutBtn}>
            <TouchableOpacity style={{justifyContent:'flex-end',alignItems:'center'}} {...props}>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(20),padding:5,color:constants.Colors.color_WHITE}}>{props.button_title}</Text>
            </TouchableOpacity>
        </View>
    )
}


export const NavButton=(props)=>(
    <TouchableOpacity style={{}} {...props}>
        <View>
            <View style={{flexDirection:'row'}}>
                <Image source={props.icon_url} style={styles.icon}/>
                <Text style={styles.MenueLable}>{props.navTitle}</Text>
            </View>
            <Icons name={"angle-right"} size={14} style={{marginTop:5}}/>
        </View>

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button:{
        borderColor:constants.Colors.color_grey,
        marginBottom:constants.vw(10)
    },
    buttonText:{
        color:constants.Colors.color_BLACK,
        fontFamily:regular,
        fontSize:16
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
    },
    checkoutBtn:{
        width:'100%',
        backgroundColor:constants.Colors.color_btn,
        position:'absolute',
        bottom:0,
        zIndex:1,
        elevation:60,
        padding:5
    },
});