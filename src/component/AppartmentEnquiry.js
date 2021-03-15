import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,ImageBackground,Image,SafeAreaView,ScrollView,Keyboard} from 'react-native';
import {connect} from 'react-redux'
import constants from '../constants'
import {PrimaryTextInput,PrimaryInputWithLabel,FormLabel} from '../customElement/Input';
import {BorderButton} from '../customElement/button';
import {mobileNoValidations} from '../lib/helper';
import {MyPopUp,ErrorMyPopUp} from '../customElement/ModalComponet'; 
import {saveAppartEnquiry} from '../lib/api';
import { Loader } from '../customElement/Loader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AutoCompleteComp from '../customElement/AutoCompleteComp'

function AppartmentEnquiry(props){
	const [data, setData] = useState({
        contact_name:'',
        phone_no:'',
        name_of_appart:'',
        err_contact_name:'',
        err_phone_no:'',
        err_name_of_appart:'',
    });

	const [modalValue, setModalVisible] = React.useState(false);
	const [errModalValue, setErrorModalVisible] = React.useState(false);

    const setContactData=(action,value)=>{

    	if(action === "contact_name"){
    		let disapearErrName = data.err_contact_name;
    		if(data.err_contact_name !=''){
    			disapearErrName='';
    		}

    		setData({
    			...data,
    			contact_name:value,
    			err_contact_name:disapearErrName,
    		});
    	}

    	if(action === "phone_no"){
    		let disapearErrPhone = data.err_phone_no;
    		if(data.error_phone !=''){
    			disapearErrPhone='';
    		}

    		setData({
    			...data,
    			phone_no:value,
    			err_phone_no:disapearErrPhone
    		});
    	}

    	if(action === "name_of_appart"){
    		let disapearErrAppart = data.err_name_of_appart;
    		if(data.err_name_of_appart !=''){
    			disapearErrAppart='';
    		}

    		setData({
    			...data,
    			name_of_appart:value,
    			err_name_of_appart:disapearErrAppart
    		});
    	}
    }

    const selectAppartment=(value)=>{
        let disapearErrAppart = data.err_name_of_appart;
        if(data.err_name_of_appart !=''){
            disapearErrAppart='';
        }

        setData({
            ...data,
            name_of_appart:value,
            err_name_of_appart:disapearErrAppart
        });
    }

    const submit_contact_form= async() =>{
        Keyboard.dismiss();
    	let { contact_name, phone_no, name_of_appart } = data;
    	let error_phone, error_name , error_appart = '';

    	if(!mobileNoValidations(phone_no)){
    		error_phone = "Please enter correct mobile number.";
    	}else{
    		error_phone ="";
    	}

    	if(contact_name ==""){
    		error_name = "Please enter contact name.";
    	}else{
    		error_name = "";
    	} 

    	if(name_of_appart == ""){
    		error_appart= "Please enter appartment name.";
    	}else{
    		error_appart= "";
    	}

    	//console.log(error_phone+","+ error_name+","+ error_appart);
    	setData({
    		...data,
	        err_contact_name:error_name,
	        err_phone_no:error_phone,
	        err_name_of_appart:error_appart,
    	});

    	if(error_phone=="" && error_name=="" && error_appart == ""){
    		let result = await props.dispatch(saveAppartEnquiry({data}));
            //console.log("data",data);
    		console.log(result);

    		if(result == "success"){
    			setModalVisible(true);
    			setTimeout(() => {
    				setModalVisible(false);
    				setData({
			    		...data,
				        contact_name:'',
				        phone_no:'',
				        name_of_appart:'',
				        err_contact_name:'',
				        err_phone_no:'',
				        err_name_of_appart:'',
			    	});

    				props.navigation.goBack();
    			},2000);

    		}else{
    			setErrorModalVisible(true);
    		}
    	}
    }
    
    const _loadLoader=()=>{
        if (props.data.saving_apart_req){
          return (
            <Loader/>
          )
        }
    }
	return(
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={140}
                enableOnAndroid={true}
            >
                <ScrollView keyboardShouldPersistTaps={'handled'}>
        		
        			<View style={{flex:1,width:'80%',alignSelf:'center',marginTop:constants.vh(60)}}>
                        <Text style={styles.error}>{data.err_name_of_appart}</Text>
                        <Text style={{color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vh(20)}}>
                            Name of the Apartment
                        </Text>
                        <View style={{paddingBottom:constants.vh(20),marginBottom:constants.vh(40)}}>
                            <AutoCompleteComp placeHolderText={""} chooseFromApartmentList={selectAppartment}/>
                        </View>

        				<View style={{paddingBottom:constants.vh(20)}}>
        					<Text style={styles.error}>{data.err_contact_name}</Text>
        					<PrimaryInputWithLabel
        						title={"Your name or the right person you wish we contact "}
        						value={data.contact_name}
        						onChangeText={(text)=>setContactData( "contact_name",text )}
        					/>
        				</View>

        				<View style={{paddingBottom:constants.vh(20)}}>
        					<Text style={styles.error}>{data.err_phone_no}</Text>
        					<PrimaryInputWithLabel
        						title={"Phone Number"}
        						value={data.phone_no}
        						onChangeText={(text)=>setContactData( "phone_no",text )}
        						keyboardType ="phone-pad"
        					/>
        				</View>

        				{/*<View style={{paddingBottom:constants.vh(20)}}>
                                                    <Text style={styles.error}>{data.err_name_of_appart}</Text>
                                                    <PrimaryInputWithLabel
                                                        title={"Name of the Apartment?"}
                                                        value={data.name_of_appart}
                                                        onChangeText={(text)=>setContactData( "name_of_appart",text )}
                                                    />
                                                </View>*/}
                        
        					
        				<View style={{width:'50%',marginTop:constants.vh(60)}}>
        					<BorderButton
        						onPress={()=>{submit_contact_form()}}
        						buttonName={"Submit"}
        					/>
        				</View>
        			</View>
        		</ScrollView>

            </KeyboardAwareScrollView>
    		<View>
    			<Image source={constants.image.bottom_enquery_form_old} style={{width:'100%',height:130}}/>
    		</View>
    		<MyPopUp titleText={""} modalVisible={modalValue} onPress={()=>{setModalVisible(false)}}>
    			<View style={{flex:1,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
    				<Image source={constants.image.enquriy_background} style={{width:constants.vw(200),height:constants.vw(200),resizeMode:'contain'}}/>
    				<FormLabel color={constants.Colors.color_intro} title={"Form submitted successfully"} fontsize={constants.vh(24)}/>
    				<View style={{marginTop:constants.vh(20),marginBottom:constants.vh(20)}}>
    					<FormLabel color={constants.Colors.color_water} fontsize={constants.vh(20)} title={"We will reach out to you or the concerned person mentioned in the form."}/>
    				</View>
    				<FormLabel color={constants.Colors.color_water} fontsize={constants.vh(20)} title={"Thanks for supporting us!"}/>
    			</View>
    		</MyPopUp>

    		<ErrorMyPopUp msg={"Something went wrong, Please try again."} modalVisible={errModalValue} onPress={()=>{setErrorModalVisible(false)}}>
    			<View style={{flex:1,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
    				<BorderButton 
                        buttonName="OK"
                        onPress={()=>setErrorModalVisible(false)}
                    />
    			</View>
    		</ErrorMyPopUp>
            {_loadLoader()}
    	</SafeAreaView>
	)
}

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

const styles= StyleSheet.create({
	container:{
		width: '100%',
        height: '100%',
		flex:1,
		backgroundColor:constants.Colors.color_WHITE,
	},
	error:{
		color:constants.Colors.color_youtube,
		fontFamily:constants.fonts.Cadro_regular
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AppartmentEnquiry);