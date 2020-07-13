import {weburl} from '../constants/url'
import { navigate } from '../appnavigation/RootNavigation'
import AsyncStorage from '@react-native-community/async-storage';


/** #################################################### User  Valiadtion Section ##############################*/
export const loginValidation = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-login?email='+data.email+'&password='+data.password;//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'LOGIN_SUCCESS', payload : response.user});
                AsyncStorage.setItem('Logined', 'YES');
                AsyncStorage.setItem('Login_Type', "MANUAL");
                AsyncStorage.setItem('name', response.user.name);
                AsyncStorage.setItem('profile', "null");
                AsyncStorage.setItem('email', response.user.email);
                AsyncStorage.setItem('mobile', response.user.mobile);
                //console.log(response.user.mobile+" "+response.user.email+" "+response.user.name);

            setTimeout(function(){  
                navigate('DrawerScreen');
            }, 1000);
                
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const socialLogin = (userData) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-social-login';
    console.log(url);
    
    var data = new FormData();
    data.append("id", userData["id"]);
    data.append("email", userData["email"]);
    data.append("name", userData["name"]);
    data.append("first_name", userData["first_name"]);
    data.append("last_name", userData["last_name"]);
    data.append("social_type", userData["social_type"]);
    data.append("image", userData["image"]);    

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        }
    }

    fetch(url,post_req)
    .then(res =>{
        console.log(res)
        res.json()
        .then(response => {
            console.log(response)
            if(response.status == "1"){
                
                AsyncStorage.setItem('Logined', 'YES');
                AsyncStorage.setItem('Login_Type', userData["social_type"]);
                AsyncStorage.setItem('name', userData["name"]);
                AsyncStorage.setItem('profile', userData["image"]);
                AsyncStorage.setItem('email', userData["email"]);

                navigate('DrawerScreen');
                
                dispatch({ type : 'LOGIN_SUCCESS', payload : "SignUpSuccessfully"});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            console.log(err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const signUpManual = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-sign-up';
    console.log(url);

    var data = new FormData();
    data.append("username", getState().data.username);
    data.append("email", getState().data.email);
    data.append("password", getState().data.password);   

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        }
    }

    fetch(url ,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1" || response.status == "2") {
                dispatch({ type : 'SIGNUP_SUCCESS', payload : response.message});
                navigate("SocialLogin");
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const sendSignUpOtp = (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    dispatch({type : 'SAVE_REGISTERTION_DETAIL',otp:data.otp, username:data.username ,password:data.password,email:data.email});

    let url = weburl + 'api-sendOtp?source='+data.email+"&otp="+data.otp+"&username="+data.username;//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'OTP_SEND', payload : response.message});
                navigate("otpVerification");
            }else if(response.status == "2"){
                dispatch({ type : 'REGISTER_USER', payload : response.message});
                navigate("SocialLogin");
            }else{
                
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

/**############################################################ Product Section ################################ */
export const getProduct = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-product?start=0&end=10';//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_FETCH', payload : response.product});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const getProductType = (data) => (dispatch,getState) => {

    //dispatch({type : 'LOADING'});

    let url = weburl + 'api-prodtype?prod_id='+data;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_VARIATION', payload : response.product});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const searchProductType = (data) => (dispatch,getState) => {

    //dispatch({type : 'LOADING'});
    //https://demo1.farmstop.in/api-searchByKeyword?term=a
    let url = weburl + 'api-searchByKeyword?term=gg';
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'AUTO_COMPLETE_PROD', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}

export const getProductTypeByKeyword = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});
    //https://demo1.farmstop.in/api-searchByKeyword?term=a
    console.log(data.key);
    let url = weburl + 'api-productByKeyword?term='+data.key;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_VARIATION', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
    });
}