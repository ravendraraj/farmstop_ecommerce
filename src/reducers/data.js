const initialDataState = { productData: null, remeasureProd : null };

const data = (state = initialDataState, action) => {
    switch (action.type) {
        case 'Home':
        return { 
            ...state,
            productData : action.payload,
            remeasureProd : null,
        };
        
        case 'SAVED_SELLER_INFO':
        return {
            ...state,
            remeasureProd: action.data,
            productData : null,
        };

        default:
        return state;
    }
}
  
export default data;