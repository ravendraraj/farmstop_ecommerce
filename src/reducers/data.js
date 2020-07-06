const initialDataState = {knowMoreProdId:null ,appIntro:'', productData: null, remeasureProd : null,productVatiation:null };

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

        case 'PRODUCT_VARIATION':
        return {
            ...state,
            productVatiation : action.payload,
        };


        case 'KNOW_MORE_ABOUT_PROD':
        return{
            ...state,
            knowMoreProdId : action.prodTypeId,
        };

        default:
        return state;
    }
}
  
export default data;