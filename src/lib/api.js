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

                 var authUser = {
                    'Login_Type' :"MANUAL",
                    'name' :response.user.name,
                    'profile' :'null',
                    'email' :response.user.email,
                    'userId' :response.user.id,
                    'mobile' :response.user.mobile
                };
                 
                AsyncStorage.setItem('authData', JSON.stringify(authUser));
                AsyncStorage.setItem('Logined', 'YES');

                dispatch({type:'AUTHORIZED-USER', email:response.user.email,mobile:response.user.mobile ,userID:response.user.id});

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
        res.json()
        .then(response => {
            console.log(response)
            if(response.status == "1"){
                
                var authUser = {
                    'Login_Type' :userData["social_type"],
                    'name' :userData["name"],
                    'profile' :userData["image"],
                    'email' :userData["email"],
                    'userId' :userData["id"],
                    'mobile' :'null'
                };

                 AsyncStorage.setItem('Logined', 'YES');
                //  console.log(authUser);
                //  console.log("Login -data "+JSON.stringify(authUser));
                 AsyncStorage.setItem('authData', JSON.stringify(authUser));

                dispatch({type:'AUTHORIZED-USER', email:userData["email"] ,userID:userData["id"]})
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
    // dispatch({type : 'SAVE_REGISTERTION_DETAIL',otp:data.otp, username:data.username ,password:data.password,email:data.email});

    let url = weburl + 'api-sendOtp?source='+data.email+"&otp="+data.otp+"&username="+data.username;//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(data.username == 'forget'){
                if(response.status == "1"){
                    dispatch({ type : 'OTP_SEND', payload : response.message});
                    dispatch({type : 'SAVE_REGISTERTION_DETAIL',otp:data.otp, username:data.username ,password:data.password,email:data.email});
                    // navigate("otpVerification");
                }else{
                    dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                }
            }else{
                if(response.status == "1"){
                    dispatch({ type : 'OTP_SEND', payload : response.message});
                    dispatch({type : 'SAVE_REGISTERTION_DETAIL',otp:data.otp, username:data.username ,password:data.password,email:data.email});
                    navigate("otpVerification");
                }else if(response.status == "2"){
                    dispatch({ type : 'REGISTER_USER', payload : response.message});
                    navigate("SocialLogin");
                }else{
                    
                    dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                }
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


export const resetPassword = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-resetPass?email='+data.email+'&pass='+data.password;//geting all product
    console.log(url);

    fetch(url)
    .then(res =>{
        //console.log(res);
        res.json().then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'SUCCESS', payload : response.message});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            console.log(err);
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

    dispatch({type : 'LOADING'});
    // prodID:this.props.activeProd ,start:this.state,end:totalprod
    let url = weburl + 'api-prodtype?prod_id='+data.prodID+"&start="+data.start+"&end="+data.end;
    if(getState().data.authUserID != ''){
        url = url + "&userId="+getState().data.authUserID;
    }
    
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_VARIATION', payload : response.product});
            }else{
                dispatch({ type : 'NO_MORE_DATA', payload : true});
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
    //https://demo1.farmstop.in/api-searchByKeyword?term=a  Ravendra
    console.log(data);
    let url = weburl + 'api-productByKeyword?term='+data.prodKey;
    if(getState().data.authUserID != ''){
        url = url + "&userId="+getState().data.authUserID;
    }
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                if(data.screen == "Search"){
                    dispatch({ type : 'SEARCH_PRODUCT_LIST', payload : response.searchProduct});
                }else{
                    dispatch({ type : 'PRODUCT_VARIATION', payload : response.searchProduct});
                }
                
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

// export const getProductListForSearch = (data) => (dispatch,getState) => {

//     dispatch({type : 'LOADING'});
//     //https://demo1.farmstop.in/api-searchByKeyword?term=a  Ravendra
//     console.log(data.key);
//     let url = weburl + 'api-productByKeyword?term='+data.key+'&prodId='+data.activeProd;
//     if(getState().data.authUserID != ''){
//         url = url + "&userId="+getState().data.authUserID;
//     }
//     console.log(url);

//     fetch(url)
//     .then(res =>{
//         res.json()
//         .then(response => {
//             //console.log(response);
//             if(response.status == "1"){
//                 dispatch({ type : 'SEARCH_PRODUCT_LIST', payload : response.searchProduct});
//             }else{
//                 dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
//             }
//         })
//         .catch( err => {
//             dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
//         })
//     })
//     .catch( err => {
//         dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
//     });
// }

/**################################# Wish List ################################################### */
export const getWishListItem= (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});
    let url = weburl + 'api-get-wishList?userId='+getState().data.authUserID;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'MY_WISHLIST', payload : response.wishList});
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

export const setWishListItemOnServer= (data) => (dispatch,getState) => {

    let url = weburl + 'api-add-in-wish?prodId='+data.id+"&userId="+getState().data.authUserID;
    console.log(url);
    console.log(getState().data);
    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'SAVED_WISH', payload : response.message});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        // dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.lof("NetWork Error");
    });

}

/** Local management */
export const setWishListItemInLocal= (data) => (dispatch,getState) => { 
        getLocalSaveWishList().then((wishData) => {
            
            if(wishData == "NULL" ){
                AsyncStorage.setItem('WishItem', JSON.stringify([data]));
            }else{
                
                let oldWishList = JSON.parse(wishData);
                let oldWishLength = oldWishList.length;

                if(oldWishLength > 0){
                    let removed = oldWishList.filter(item => data.id != item.id); // etract existing prod id
                    
                    if(oldWishList.length == removed.length){
                        oldWishList.push(data);
                        AsyncStorage.setItem('WishItem', JSON.stringify(oldWishList));
                    }else{
                        AsyncStorage.setItem('WishItem', JSON.stringify(removed));
                    }
                }else{
                    AsyncStorage.setItem('WishItem', JSON.stringify([data]));
                }
            }
            
        });
}

async function getLocalSaveWishList() {
    try {

        let WishItem = await AsyncStorage.getItem('WishItem');
        return WishItem;

    }catch(e) {
        console.log(e);
    }
}


export const checkDelivery= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-check-delivery-loc?lat='+data.lat+"&lng="+data.lng;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                
                
                    var userShipingAddress = {
                        "address" : response.address,
                        "postal_code":response.detail['pincode'],
                    }

                    AsyncStorage.setItem('userShippingAdd', JSON.stringify(userShipingAddress));
                    dispatch({type:'SUCCESS',payload:response.message+" "+response.address});
                    dispatch({ type : 'LOCATION_FETCHED',  address : response.address , details:response.detail});
                
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        // dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.lof("NetWork Error");
    });

}



