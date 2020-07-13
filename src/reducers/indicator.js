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
        case 'REGISTER_USER':
            return false;
        default :
            return state;
    }
}

export default indicator;