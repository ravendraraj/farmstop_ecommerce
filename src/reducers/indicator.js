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
        case 'REMOVE_FROM_WISH':
        case 'REGISTER_USER':
        case 'MY_WISHLIST':
        case 'SUCCESS':
        case 'FETCH_NOTIFICATION_LIST':
        case 'REMOVE_ITEM':
        case 'EDIT_PROFILE':
        case "LOCATION_FETCHED":
        case "NOT_DELIVER":
        case "SEARCH_PRODUCT_LIST":
        case "COUPON_CODE_VALIDATE":
        case "MANAGE-CART-QTY":
        case "LOGOUT":
        case "ERROR_CODE":
        case "NEW_ADDRESS_SAVED":
        case "FETCH_ORDER_LIST":
        case "NETWORK_ERROR":
        case "EXCEPTION_ERROR_SUBMIT":
        case"SAVED_DEFAULT_SHIPPING_ADDRESS":
        case "ORDER_SUCCESSFULL":
        case "FETECH_ADDRESS_LIST":
        case "NOT_DILEVER_ON_PINCODE":
        case "DILEVER_ON_PINCODE":
        case "FETCH_ORDER_DETAILS":
            return false;
        default :
            return state;
    }
}

export default indicator;