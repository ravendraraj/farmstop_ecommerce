const indicator = (state = false, action) => {
    switch(action.type) {
        case 'LOADING' :
            return true;
        case 'PRODUCT_FETCH':
        case 'ERROR_SUBMIT':
        case 'DATA_FETCHED':
        case 'CANCEL_LOADING' :
        case 'PRODUCT_VARIATION':
        case 'LOGIN_SUCCESS':
        case 'SIGNUP_SUCCESS':
        case 'OTP_SEND':
        case 'ADD_TO_CART':
        case 'REGISTER_USER':
        case 'MY_WISHLIST':
        case 'SUCCESS':
        case "LOCATION_FETCHED":
        case "NOT_DELIVER":
        case "SEARCH_PRODUCT_LIST":
        case "COUPON_CODE_VALIDATE":
            return false;
        default :
            return state;
    }
}

export default indicator;