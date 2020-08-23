import {weburl} from '../constants/url'
import { navigate } from '../appnavigation/RootNavigation'
import AsyncStorage from '@react-native-community/async-storage';
import constStrings from '../constants/constStrings'
import RazorpayCheckout from 'react-native-razorpay';
import {razor_api_key} from '../constants/key';
import constants from '../constants'

export const logout = (data) => async(dispatch,getState) => {

    dispatch({type : 'LOADING'});
    await AsyncStorage.removeItem("authData");
    await AsyncStorage.removeItem("userCart");
    await AsyncStorage.removeItem("userShippingAdd");
    dispatch({type:'LOGOUT'});
    navigate('NotLogin');
}
/** #################################################### User  Valiadtion Section ##############################*/
export const loginValidation = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});

    let url = weburl + 'api-login?email='+data.email+'&password='+data.password;//geting all product
        url+="&devicetoken="+getState().data.deviceToken+"&os="+getState().data.os;
        
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
                    'mobile' :response.user.mobile,
                    'token':response.token
                };
                 
                AsyncStorage.setItem('authData', JSON.stringify(authUser));
                AsyncStorage.setItem('Logined', 'YES');

                dispatch({type:'AUTHORIZED-USER',
                    login_type:"MANUAL",
                    profile:"null",
                    email:response.user.email,
                    mobile:response.user.mobile ,
                    userID:response.user.id,
                    authName:response.user.name,
                    token:response.token
                 });
                
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
        navigate("internetError");
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
    data.append("devicetoken",getState().data.deviceToken);
    data.append("os",getState().data.os);

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
            if(response.status == "1"){
                console.log(response);
                var authUser = {
                    'Login_Type' :userData["social_type"],
                    'name' :userData["name"],
                    'profile' :userData["image"],
                    'email' :response.user_info["email"],
                    'userId' :userData["id"],
                    'mobile' :response.user_info["mobile"],
                    'token':response.token
                };

                 AsyncStorage.setItem('Logined', 'YES');
                //  console.log(authUser);
                //  console.log("Login -data "+JSON.stringify(authUser));
                 AsyncStorage.setItem('authData', JSON.stringify(authUser));

                // dispatch({type:'AUTHORIZED-USER', email:userData["email"] ,userID:userData["id"]});
                dispatch({
                    type:'AUTHORIZED-USER',
                    login_type:userData["social_type"],
                    profile:userData["image"],
                    email:response.user_info["email"],
                    mobile:response.user_info["mobile"],
                    userID:userData["id"],
                    authName:userData["name"],
                    token:response.token
                });
                
                navigate('MainHome');
                
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
        navigate("internetError");
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
    data.append("devicetoken",getState().data.deviceToken);
    data.append("os",getState().data.os);

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
        navigate("internetError");
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
            navigate("internetError");
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
        navigate("internetError");
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
        navigate("internetError");
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
        navigate("internetError");
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
        navigate("internetError");
    });
}

export const getProductTypeByKeyword = (data) => (dispatch,getState) => {

    dispatch({type : 'LOADING'});
    //https://demo1.farmstop.in/api-searchByKeyword?term=a  Ravendra
    
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
        navigate("internetError");
    });
}

export const setWishListItemOnServer= (data) => (dispatch,getState) => {

    let url = weburl + 'api-add-in-wish?prodId='+data.id+"&userId="+getState().data.authUserID+"&token="+getState().data.token;
    console.log(url);
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
        // console.log("NetWork Error");
        navigate("internetError");
    });

}


export const deleteWishItem= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    // console.log(data);
    let url = weburl + 'api-add-in-wish?prodId='+data.id+"&userId="+getState().data.authUserID+"&action="+data.action+"&token="+getState().data.token;
    console.log(url);
    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'REMOVE_FROM_WISH', payload : response.message,'prod_id':data.id});
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
        // console.log("NetWork Error");
        navigate("internetError");
    });

}

/** Local management */
export const setWishListItemInLocal= (data) => (dispatch,getState) => { 
        getLocalSaveWishList('WishItem').then((wishData) => {
            
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

async function getLocalSaveWishList(DataType) {
    try {

        let WishItem = await AsyncStorage.getItem(DataType);
        return WishItem;

    }catch(e) {
        console.log(e);
    }
}


export const checkDelivery= (data) => async(dispatch,getState) => {
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
                        "shippingCharges":response.detail['shipping_cost'],
                    }

                    AsyncStorage.setItem('userShippingAdd', JSON.stringify(userShipingAddress));
                    dispatch({type:'SUCCESS',payload:response.message+" "+response.address});
                    dispatch({ type : 'LOCATION_FETCHED',  address : response.address , shipping_cost:response.detail['shipping_cost'], pincode:response.detail['pincode']});
                    navigate("MainHome");

                
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}

export const checkCouponCode= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-validate-coupnCode/'+data.code;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'COUPON_CODE_VALIDATE', payload : response.message, coopunValue:response.value,coupon_id:response.coupon_id});
            }else{
                dispatch({ type : 'ERROR_CODE', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.log("NetWork Error");
    });

}

export const getAppartment= (data) => (dispatch,getState) => {
    // dispatch({type : 'LOADING'});
    let url = weburl + 'api-appartment';
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                
                dispatch({ type : 'GET_APARTMENT', apartment:response.apartment});
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
        console.log("NetWork Error");
    });

}

export const getUserAddressList= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-getUserAddess/'+getState().data.authUserID;
    // let url = weburl + 'api-getUserAddess/37';
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'FETECH_ADDRESS_LIST', payload : response.message, addressList:response.addressList});
            }else{
                //dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'});
                dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
            }
        })
        .catch( err => {
            //dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'});
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});

        })
    })
    .catch( err => {
        //dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        
        console.log("NetWork Error");
    });

}

export const checkDeliveryOnPincode= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-check-delivery-on-pincode/'+data.pincode;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'DILEVER_ON_PINCODE', shipping_cost:response.details.shipping_cost });
            }else{
                dispatch({ type : 'NOT_DILEVER_ON_PINCODE', payload : response.message});
            }
        })
        .catch( err => {
  //          dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
//        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}

export const addNewShippingAddress= (userData) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    
    let url = weburl + 'api-setUserAddess/';
    var data = new FormData();
    data.append("name", userData["name"]);
    data.append("pincode", userData["pincode"]);
    data.append("deliverOn", userData["name"]);
    data.append("email", getState().data.authEmail);
    data.append("userId", getState().data.authUserID);
    data.append("address", userData["houseOrFlat"]+","+userData["address"]);
    data.append("updatable", userData["isUpdateAddress"]);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        }
    }

    console.log(post_req);

    fetch(url,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'NEW_ADDRESS_SAVED', addressList:response.addressList});
                navigate("ShippingAddress");
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
        console.log("NetWork Error");
        navigate("internetError");
    });

}

export const selectShippingAddress =(address)=>(dispatch,getState)=>{
    let url = weburl + 'api-check-deliveryByZipcode?zipcode=';
    dispatch({type : 'LOADING'});
    console.log(address);
    var userShipingAddress =[];
        userShipingAddress["defualtShippingAdd"] = address.id;
    var pincode = "";

    if(getState().data.addressList.length >0){
        getState().data.addressList.map((item)=>{
            if(item.id == address.id)
            {
                pincode = item.zipcode;
            }
        })
    }
    
    if(pincode != ""){
        url +=pincode;
        console.log(url);
        fetch(url).then(res =>{
            res.json()
            .then(response => {
                //console.log(response);
                if(response.status == "1"){
                    AsyncStorage.setItem('defualtShippingAdd', JSON.stringify(userShipingAddress));
                    dispatch({type:'SAVED_DEFAULT_SHIPPING_ADDRESS',addressId :address.id,shipping_cost:response.result["shipping_cost"]});
                    if(address.screen_name == "cart"){
                        navigate("MyCart");
                    }
                    else if(address.screen_name =="PaymentOption"){
                            navigate(address.screen_name);   
                        }
                }else{
                    dispatch({ type : 'ERROR_SUBMIT', payload : constStrings.ADDRESS_UPDATE_FAILED});
                }
            })
            .catch( err => {
                dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
            })
        })
        .catch( err => {
            dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
            console.log("NetWork Error");
            navigate("internetError");
        });
    }else{
        dispatch({ type : 'ERROR_SUBMIT', payload : constStrings.ADDRESS_UPDATE_FAILED});
    }
}

/** %%%%%%%%%%%%%%%%%%%%%%%%%%%% start server and locat cart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

export const addItemToCart = (prodData) => (dispatch,getState) => {
// export const addItemToCart = (data) => (dispatch,getState) => {
    // dispatch({type : 'LOADING'});
    // console.log(prodData);
    let product = prodData.id;
    let variationId = prodData.variationId;
    let totalItem = prodData.qty;
    let screen = prodData.screen;

    let userId = getState().data.authUserID;
    let emailId = getState().data.authEmail;
    
    if(userId !=''){
        let url = weburl + 'api-setCartItems/';
        // console.log(url);
        var data = new FormData();
        data.append("product", product);
        data.append("variation_id", variationId);
        data.append("totalqty", totalItem);
        data.append("userId", userId);
        data.append("emailId", emailId);
        // console.log(userId+"--"+emailId);
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
                //console.log(response);
                if(response.status == "1"){
                    dispatch({ type : 'ADD_TO_CART', screen:screen ,id:product ,selectedVariationID: variationId ,cart_item_id:response.cart_item_id});
                }else{
                    dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                }
            })
            .catch( err => {
                dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
            })
        })
        .catch( err => {
            dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
            console.log("NetWork Error");
            navigate("internetError");
        });
        
    }else{
        dispatch({ type : 'ADD_TO_CART', screen:screen ,id:product ,selectedVariationID: variationId ,cart_item_id:0});
    }

}


export const deleteItem = (prodData) => (dispatch,getState) => {
// export const addItemToCart = (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    // console.log(prodData);
    let product = prodData.id;
    let variationId = prodData.variationId;
    let cart_id = prodData.cart_id;

    let userId = getState().data.authUserID;
    let emailId = getState().data.authEmail;
    
    if(userId !=''){
        let url = weburl + 'api-deleteCartItems/';
        // console.log(url);
        var data = new FormData();
        data.append("product", product);
        data.append("variation_id", variationId);
        data.append("cart_item_id",prodData.cart_item_id);
        data.append("userId", userId);
        data.append("emailId", emailId);

        // console.log(userId+"--"+emailId);
        let post_req = {
            method: 'POST',
            body: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }

        console.log(post_req);
        fetch(url ,post_req)
        .then(res =>{
            res.json()
            .then(response => {
                //console.log(response);
                if(response.status == "1"){
                    dispatch({ type : 'REMOVE_ITEM' ,id:product ,selectedVariationID: variationId,cart_id:cart_id});
                }else{
                    dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                }
            })
            .catch( err => {
                dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
            })
        })
        .catch( err => {
            dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
            console.log("NetWork Error");
            navigate("internetError");
        });
        
    }else{
        dispatch({ type : 'REMOVE_ITEM' ,id:product ,selectedVariationID: variationId,cart_id:cart_id});
    }

}
//set cart item in asyncstorage 
// Note: remove this async on logout and set again when perfome login
export const setCartItemLocal=  (data) => async(dispatch,getState) => {

     if(getState().data.authUserID == ""){
         await AsyncStorage.setItem('userCart', JSON.stringify(getState().data.addedItems));
    }else{
     console.log("Cart Local Stroage Update");
    }
}

export const getCartItem=  (data) => async(dispatch,getState) => {
    // dispatch({type : 'LOADING'});
    if(!getState().data.cartItemSync){
        let loginedInUser = getState().data.authUserID;

        //get cart item from async strogae
        if(loginedInUser != ''){
            //console.log("Local------server---home");
            let url = weburl +"api-getCartItems?userId="+getState().data.authUserID;
            console.log(url);
            fetch(url)
            .then(res =>{
                res.json()
                .then(response => {
                    //console.log(response);
                    if(response.status == "1"){
                        // dispatch({type:'CART_ITEM_SYNC', cartItem:response.cart});
                        let serverCartItem = response.cart;

                        getLocalSaveWishList('userCart').then((asyncCartData) => {
                            let serverDataLength = serverCartItem.length;
                            
                            if(serverDataLength >0 && asyncCartData == null)
                            {
                                console.log("servere cart data");
                                // console.log(serverCartItem);
                                dispatch({type:'CART_ITEM_SYNC', cartItem:serverCartItem});
                            }else if( asyncCartData != null){
                                
                                let updatableData = asyncCartData;
                                if(serverDataLength <= 0){
                                    // update async item on server
                                    // console.log("get async only");
                                }else{

                                    let cartItems = JSON.parse(asyncCartData); // asyncstroage data
                                    let notUpdated = []
                                    // console.log("get async and live only");
                                    // console.log(cartItems);
                                    cartItems.map(item=>{
                                            let find = false;
                                            serverCartItem.map(serverItem=>{
                                                // console.log(item.prod_id +"=="+ serverItem.prod_id +"&&"+ item.selectedVariationID +"=="+ serverItem.selectedVariationID)
                                                if(item.prod_id == serverItem.prod_id && item.selectedVariationID == serverItem.selectedVariationID){
                                                    find = true;
                                                }
                                            });
                        
                                            if(!find){
                                                notUpdated.push(item);
                                            }
                                    });
                        
                                    updatableData = notUpdated;
                                }
                        
                                    //console.log("merge data");
                                if(updatableData.length > 0){
                                    // console.log("iam cal");
                                    updateCartItemsOnServer(updatableData ,getState().data.authUserID , getState().data.authEmail,dispatch);
                                }else{
                                    dispatch({type:'CART_ITEM_SYNC', cartItem:serverCartItem});
                                }
                            // dispatch({type:'CART_ITEM_SYNC', cartItem:serverCartItem});
                    }
                
                });
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
                navigate("internetError");
                // console.log("NetWork Error");
            });
            
        }else{
            getLocalSaveWishList('userCart').then((data) => {
                if(data != null){
                    cartItems = JSON.parse(data); // asyncstroage data
                    dispatch({type:'CART_ITEM_SYNC', cartItem:cartItems})
                }else{
                    console.log("Cart is empty")
                    // cartItems = []
                }
                
            });
        }

    }else{
        console.log("Cart Data Sync");
    }
}


function updateCartItemsOnServer(items ,userId ,emailId ,dispatch){
    
    let url = weburl + 'api-setCartItems/';
    let product ="";
    let varidationId ="";
    let totalItem ="";
    
    items.map(item=>{

        product +=item.prod_id+',';
        varidationId +=item.selectedVariationID+',';
        totalItem +=item.selectedQty+',';
    })

    var data = new FormData();
    data.append("product", product);
    data.append("variation_id", varidationId);
    data.append("totalqty", totalItem);
    data.append("userId", userId);
    data.append("emailId", emailId);
    // console.log(userId+"--"+emailId);
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    }
 //console.log(post_req);
 //console.log(url)
    fetch(url,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            //console.log(response);
            if(response.status == "1"){

                let Itemurl = weburl +"api-getCartItems?userId="+userId;
                console.log(Itemurl);
                fetch(Itemurl)
                .then(res =>{
                    res.json()
                    .then(response => {
                        //console.log(response);
                        if(response.status == "1"){
                            dispatch({type:'CART_ITEM_SYNC', cartItem:response.cart});
                        }
                    })
                    .catch( err => {
                        dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
                    })
                })
                .catch( err => {
                    // dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
                    console.log("NetWork Error");
                });    

            }else{
                // dispatch({ type : 'NOT_DILEVER_ON_PINCODE', payload : response.message});
                //console.log(response.message);
            }
        })
        .catch( err => {
            // dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            //console.log("Exceptions");
            //console.log(err);
        })
    })
    .catch( err => {
        // dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.log("NetWork Error");
    });
}

//manage cart item variation
export const setVariationInCart = (prodData) => (dispatch,getState) => {
       // dispatch({type : 'LOADING'});
        // console.log(prodData);
        let product = prodData.prod_id;
        let variationValue = prodData.variationValue;
        let oldSelectedVariationId = prodData.selectedVariationID;
        let userId = getState().data.authUserID;
        let emailId = getState().data.authEmail;
        // console.log(product+ " - "+variationValue+" - "+ variationId);
        if(userId !=''){
            let url = weburl + 'api-setCartItemsVariation/';

            //get variation id 
            let variationId = "";
            getState().data.addedItems.map((item,index)=>{
                if(item.prod_id == product)
                {
                    item.variation_details.map(vari=>{
                        if(vari.varition == variationValue){
                            variationId = vari.varition_detail_id;
                        }
                    });
                }
            });

            var data = new FormData();
            data.append("product", product);
            data.append("variation_id", variationId);
            data.append("oldVariationId", oldSelectedVariationId);
            data.append("userId", userId);
            data.append("emailId", emailId);
            
            let post_req = {
                method: 'POST',
                body: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            }
            console.log(post_req);
            fetch(url ,post_req)
            .then(res =>{
                res.json()
                .then(response => {
                    //console.log(response);
                    if(response.status == "1"){
                        // dispatch({ type : 'ADD_TO_CART', screen:screen ,id:product ,selectedVariationID: variationId ,cart_item_id:response.cart_item_id});
                        dispatch({type:"SET_PRODUCT_VARIATION_IN_CART",prod_id:product, variation:variationValue, preVarId:oldSelectedVariationId ,oldPrice:prodData.oldSelectedPrice});
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
                console.log("NetWork Error");
            });
            
        }else{
            // dispatch({ type : 'ADD_TO_CART', screen:screen ,id:product ,selectedVariationID: variationId ,cart_item_id:0});
            dispatch({type:"SET_PRODUCT_VARIATION_IN_CART",prod_id:product, variation:variationValue, preVarId:oldSelectedVariationId});
        }  
    }

//manage cart item qty
export const setQtyInCart = (prodData) => (dispatch,getState) => {
     dispatch({type : 'LOADING'});
     let product = prodData.prod_id;
     let prodQty = prodData.qty;
     let SelectedVariationId = prodData.selectedVariationID;
     let userId = getState().data.authUserID;
     let emailId = getState().data.authEmail;
     let action = prodData.typeOfAction;
     let totalQty = 0;
         if(action == "add"){
            // data.append("totalQty", parseInt(prodQty)+1);
            totalQty = parseInt(prodQty)+1;
         }else{
            // data.append("totalQty", parseInt(prodQty)-1);
            totalQty = parseInt(prodQty)-1;
    }
     // console.log(product+ " - "+variationValue+" - "+ variationId);
     if(userId !='' && totalQty >0){
         let url = weburl + 'api-manageCartItemsQty/';
         var data = new FormData();
         data.append("product", product);
         data.append("variation_id", SelectedVariationId);
         data.append("userId", userId);
         data.append("emailId", emailId);
         data.append("totalQty", totalQty);

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
                 //console.log(response);
                 if(response.status == "1"){
                    dispatch({type:'MANAGE-CART-QTY' ,activeProdId:product,actionType:action ,selectedVariationId:SelectedVariationId});
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
            //  console.log("NetWork Error");
         });
         
     }else{
         dispatch({type:'MANAGE-CART-QTY' ,activeProdId:product,actionType:action ,selectedVariationId:SelectedVariationId});
     }  
 }
/** %%%%%%%%%%%%%%%%%%%%%%%%%%%% end server and locat cart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */


/***************************************Check out *********************************************/
export const checkOut= (checkOutData) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let orderCreateUrl = weburl + 'api-create-order-id/';
    
    var checkOutFormData = new FormData();
         checkOutFormData.append("user_id", checkOutData['user_id']);
         checkOutFormData.append("user_type", checkOutData['user_type']);
         checkOutFormData.append("address_id", checkOutData['address_id']);
         checkOutFormData.append("usr_mob", checkOutData['usr_mob']);
         checkOutFormData.append("subtotal", checkOutData['subtotal']);
         checkOutFormData.append("shhipingCost", checkOutData['shhipingCost']);
         checkOutFormData.append("coupon_id", checkOutData['coupon_id']);
         checkOutFormData.append("total_cost", checkOutData['total_cost']);

         checkOutFormData.append("paymentOption", checkOutData['paymentOption']);
         checkOutFormData.append("status", checkOutData['status']);
         checkOutFormData.append("token",getState().data.token);

         let post_req = {
             method: 'POST',
             body: checkOutFormData,
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'multipart/form-data',
             }
        }

    fetch(orderCreateUrl,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                console.log("order created");

                    var options = {
                        description: '',
                        image: "https://www.farmstop.in/assets/images/farmstop.png",
                        currency: 'INR',
                        key:razor_api_key,
                        amount: response.orderData["amount"],
                        name: 'FARMSTOP',
                        order_id: response.orderData['razor_orderId'],
                        prefill: {
                            email: checkOutData['email'],
                            contact: checkOutData['contact'],
                            name: checkOutData['username'],
                        },
                        theme: {color: constants.Colors.color_intro,
                            fontFamily:constants.fonts.Cardo_Regular,
                            backgroundColor:'white',
                        }
                    }

                    RazorpayCheckout.open(options).then((data) => {

                    if(data.razorpay_payment_id !="")
                    {
                        // this.props.navigation.navigate("OrderSuccuess");
                        let orderVerifyUrl = weburl + 'api-verify-order/';
                        
                        let verifyData= new FormData();
                        verifyData.append("user_id", checkOutData['user_id']);
                        verifyData.append("razorpay_order_id", data.razorpay_order_id);
                        verifyData.append("razorpay_signature", data.razorpay_signature);
                        verifyData.append("razorpay_payment_id", data.razorpay_payment_id);
                        verifyData.append("foramstopOrderId", response.orderData['receipt']);
                        verifyData.append("order_no", response.orderData['order_no']);
                        verifyData.append("token",getState().data.token);
                        verifyData.append("email",getState().data.authEmail);

                        let verify_post_req = {
                             method: 'POST',
                             body:verifyData,
                             headers: {
                                 Accept: 'application/json',
                                 'Content-Type': 'multipart/form-data',
                             }
                        }
                            console.log(verify_post_req);
                            fetch(orderVerifyUrl ,verify_post_req).then(res =>{
                                res.json()
                                .then(response => {
                                    console.log(response);
                                    if(response.status == "1"){
                                        dispatch({type:'ORDER_SUCCESSFULL'});
                                        navigate("OrderSuccuess");        
                                    }else{
                                        dispatch({ type : 'ERROR_SUBMIT', payload : constStrings.PAYMENT_FAILE_MESSAGE});
                                    }
                                })
                                .catch( err => {
                                    dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});

                                })
                            })
                            .catch( err => {
                                dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
                                console.log("NetWork Error");
                                navigate("internetError");
                            });

                    }
                  }).catch((error) => {
                    // handle failure
                    console.log(error);
                    // alert(`Error: ${error.code} | ${error.description}`);
                    dispatch({ type : 'ERROR_CODE', payload : response.message});
                  });

            }else{
                dispatch({ type : 'ERROR_CODE', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
        })
    })
    .catch( err => {
        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.log("NetWork Error");
    });

}

/*********************************** Cash on Delivery ************************************/
export const checkOutOnCOD= (checkOutData) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let orderCreateUrl = weburl + 'api-place-cod-order/';

    var checkOutFormData = new FormData();
         checkOutFormData.append("user_id", checkOutData['user_id']);
         checkOutFormData.append("user_type", checkOutData['user_type']);
         checkOutFormData.append("address_id", checkOutData['address_id']);
         checkOutFormData.append("usr_mob", checkOutData['usr_mob']);
         checkOutFormData.append("subtotal", checkOutData['subtotal']);
         checkOutFormData.append("shhipingCost", checkOutData['shhipingCost']);
         checkOutFormData.append("coupon_id", checkOutData['coupon_id']);
         checkOutFormData.append("total_cost", checkOutData['total_cost']);

         checkOutFormData.append("paymentOption", checkOutData['paymentOption']);
         checkOutFormData.append("status", checkOutData['status']);
         checkOutFormData.append("token",getState().data.token);
         checkOutFormData.append("email",getState().data.authEmail);

         let post_req = {
             method: 'POST',
             body: checkOutFormData,
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'multipart/form-data',
             }
        }

        console.log("COD" ,post_req);
        fetch(orderCreateUrl,post_req)
        .then(res =>{
            console.log(res);
            res.json()
            .then(response => {
                console.log(response);
                if(response.status == "1"){
                    navigate("OrderSuccuess");
                    dispatch({type:'ORDER_SUCCESSFULL'});
                }else{
                    dispatch({type : 'NETWORK_ERROR', payload : response.message});
                    navigate("pageNotFound");
                }
            })
            .catch( err => {
                dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
            })
        })
        .catch( err => {
            dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
            navigate("internetError");
        });
}


/********************************* Get order List***************************************/
export const getOrderList= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-getOrderList?user_id='+getState().data.authUserID;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'FETCH_ORDER_LIST', orederList:response.orderList });
            }else{
                dispatch({type : 'NETWORK_ERROR', payload : response.message});
            }
        })
        .catch( err => {
  //          dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
//        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}


export const getOrderDetails= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    // console.log("klk000000",data);
    let url = weburl + 'api-orderDetails?user_id='+getState().data.authUserID+"&order_no="+data;
    console.log(url);

    fetch(url)
    .then(res =>{
        console.log(res);
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'FETCH_ORDER_DETAILS', orederDetails:response.orederDetails });
            }else{
                dispatch({type : 'NETWORK_ERROR', payload : response.message});
            }
        })
        .catch( err => {
  //          dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
//        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}

export const updateProfile= (formdata) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    // console.log("klk000000",formdata);
    var formData = new FormData();
        formData.append("email", formdata['email']);
        formData.append("mobile", formdata['mobile']);
        formData.append("user_type", getState().data.login_type);
        formData.append("user_id", getState().data.authUserID);
        formData.append("token",getState().data.token);

    let post_req = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            }
        }

    let url = weburl + 'api-updateProfile';
    console.log(url);
    fetch(url,post_req).then(res =>{
        // console.log(res);
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'EDIT_PROFILE', payload:response.message, authEmail:formdata['email'],authMobile:formdata['mobile']});
                if(formdata['screen_name'] != "MyProfile"){
                    navigate("PaymentOption");
                }
            }else{
                dispatch({type : 'NETWORK_ERROR', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}

export const getNotification= (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-get-notification';

    var formData = new FormData();
        formData.append("user_id", getState().data.authUserID);
        formData.append("token",getState().data.token);

    let post_req = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            }
        }
    console.log(url,post_req);

    fetch(url,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:response.user_notification });
            }else{
                dispatch({type : 'NETWORK_ERROR', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}

export const removeNotification= (data) => (dispatch,getState) => {
    console.log(data);

    dispatch({type : 'LOADING'});
    let url = weburl + 'api-delete-notification';

    var formData = new FormData();
        formData.append("user_id", getState().data.authUserID);
        formData.append("token",getState().data.token);
        formData.append("notify_id",data);

    let post_req = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            }
        }
    console.log(url,post_req);

    fetch(url,post_req)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'FETCH_NOTIFICATION_LIST', notification:response.user_notification });
            }else{
                dispatch({type : 'NETWORK_ERROR', payload : response.message});
            }
        })
        .catch( err => {
            dispatch({ type : 'EXCEPTION_ERROR_SUBMIT'});
        })
    })
    .catch( err => {
        dispatch({ type : 'NETWORK_ERROR', payload : 'Network Error'})
        navigate("internetError");
    });

}