const initialDataState = {appIntro:'', productData: null, remeasureProd : null };

const data = (state = initialDataState, action) => {
    switch (action.type) {
        case 'APP_INTRO_DONE':
        return { 
            ...state,
            appIntro:action.data
        };
        
        case 'PRODUCT_FETCH':
        return {
            ...state,
            productData : action.payload,
        };

        default:
        return state;
    }
}
  
export default data;