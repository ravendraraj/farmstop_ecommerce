import {navigate} from '../appnavigation/RootNavigation'
const initialDataState = { productData: null, remeasureProd : null };

const nav = (state = initialDataState, action) => {
    // switch (action.type) {
    //     case 'LOGIN_SUCCESS':
    //             navigate
    //         break;
        
    //     case 'SAVED_SELLER_INFO':
    //     return {
    //         ...state,
    //         remeasureProd: action.data,
    //         productData : null,
    //     };

    //     default:
    //     return state;
    // }
    navigate('SellerInfo', { userName: 'Lucy' });
}
  
export default nav;