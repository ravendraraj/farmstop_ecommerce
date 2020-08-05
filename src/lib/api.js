import {weburl} from '../constants/url'
import { navigate } from '../appnavigation/RootNavigation'
import AsyncStorage from '@react-native-community/async-storage';


export const logout = (data) => async(dispatch,getState) => {

    dispatch({type : 'LOADING'});
    await AsyncStorage.removeItem("authData");
    await AsyncStorage.removeItem("userCart");
    dispatch({type:'LOGOUT'});
    navigate('NotLogin');
}
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

                dispatch({type:'AUTHORIZED-USER',
                    login_type:"MANUAL",
                    profile:"null",
                    email:response.user.email,
                    mobile:response.user.mobile ,
                    userID:response.user.id,
                    authName:response.user.name,
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

                // dispatch({type:'AUTHORIZED-USER', email:userData["email"] ,userID:userData["id"]});
                dispatch({
                    type:'AUTHORIZED-USER',
                    login_type:userData["social_type"],
                    profile:userData["image"],
                    email:userData["email"],
                    mobile:'null',
                    userID:userData["id"],
                    authName:userData["name"],
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
        navigate("internetError");
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
                        "shippingCharges":response.detail['shipping_cost'],
                    }

                    AsyncStorage.setItem('userShippingAdd', JSON.stringify(userShipingAddress));
                    dispatch({type:'SUCCESS',payload:response.message+" "+response.address});
                    dispatch({ type : 'LOCATION_FETCHED',  address : response.address , shipping_cost:response.detail['shipping_cost'], pincode:response.detail['pincode']});
                
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
        // console.log("NetWork Error");
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
                dispatch({ type : 'COUPON_CODE_VALIDATE', payload : response.message, coopunValue:response.value});
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
                console.log(response.apartment);
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
    // dispatch({type : 'LOADING'});
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
            }
        })
        .catch( err => {
            //dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'});
        })
    })
    .catch( err => {
        //dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.log("NetWork Error");
    });

}

export const checkDeliveryOnPincode= (data) => (dispatch,getState) => {
    // dispatch({type : 'LOADING'});
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
        })
    })
    .catch( err => {
//        dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
        console.log("NetWork Error");
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
            console.log(response);
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

/** %%%%%%%%%%%%%%%%%%%%%%%%%%%% start server and locat cart %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

export const addItemToCart = (prodData) => (dispatch,getState) => {
// export const addItemToCart = (data) => (dispatch,getState) => {
    dispatch({type : 'LOADING'});
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
                dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            })
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Network Error'})
            console.log("NetWork Error");
            navigate("internetError");
        });
        
    }else{
        dispatch({ type : 'ADD_TO_CART', screen:screen ,id:product ,selectedVariationID: variationId ,cart_item_id:0});
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
                        dispatch({type:"SET_PRODUCT_VARIATION_IN_CART",prod_id:product, variation:variationValue, preVarId:oldSelectedVariationId});
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
         console.log(post_req);
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