import { navigate } from '../appnavigation/RootNavigation'
import { Alert } from 'react-native'

export const fristLetterCapital=(str)=>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

export const generateOtp =()=>{
    // return (Math.floor(Math.random() * 1000000));
    return(100000+Math.floor(Math.random()*900000));
}

export const removeTags=(str)=> {
	if ((str===null) || (str==='')){
		return str;
	}else{
		str = str.toString();
		return str.replace( /(<([^>]+)>)/ig, '');
	}
}

export const showErrorMsg=(msg,route)=>{
        if(route !=''){
            Alert.alert(
              'Farmstop',msg,
              [
                {
                  text: 'Ok',
                  onPress: () => navigate(route)
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
              ],
              { cancelable: false }
            );
        }else{
            Alert.alert(
              'Farmstop',msg,
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('Cancel Pressed'),
                },
              ],
              { cancelable: false }
            );
        }
}

export const findOrderStatus=(str)=>{
			   // 0 pending
      //          1 processing
      //          2 Hold
      //          3 dispatched
      //          4 completed
      //          5 cancelled
      //          6 refunded
      //          7 failed

      if(str == 0){
      	return "Order Placed";
      }else if(str == 1){
      	return "Produce Harvested";
      }else if(str == 2){
      	return "On Hold";
      }else if(str == 3){
      	return "Order in Transit";
      }else if(str == 4){
      	return "Order Delivered";
      }else if(str == 5){
      	return "Cancelled";
      }else if(str == 6){
      	return "Refunded";
      }else if(str == 7){
      	return "Failed";
      }
}

export const mobileNoValidations = (str)=>{
  var phoneno = /^\d{10}$/;

  if(phoneno.test(str)){
    return true;
  }

  return false;
}

export const emailValidations = (email)=>{
  if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    return true;
  }
  return false;
}

export const fullNameValidations = (fullName)=>{
  //if (/^[a-zA-Z ]{3,100}$/.test(fullName)){
  if(/^(\s?\.?[a-zA-Z]+)+$/.test(fullName)){
    return true;
  }
  return false;
}

export const passwordValidations = (password)=>{
  if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)){
    return true;
  }
  return false;
}