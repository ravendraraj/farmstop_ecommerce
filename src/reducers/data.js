const initialDataState = {searchProdName:[],addedItems:[],total: 0,otpVerification:null ,knowMoreProdId:null ,appIntro:'', productData: null, remeasureProd : null,productVatiation:null };

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

        case 'SAVE_OTP':
        return{
            ...state,
            otpVerification:action.otp,
        };

        case 'AUTO_COMPLETE_PROD':
        return {
            ...state,
            searchProdName:action.payload
        };
        

        //cart reducers 
        case "ADD_TO_CART" :
    
            let addedItem = state.productVatiation.find(item => item.id === action.id);
             //check if the action id exists in the addedItems
            let existed_item= state.addedItems.find(item=> action.id === item.id)
            if(existed_item)
            {
               addedItem.quantity += 1 
                return{
                   ...state,
                    total: state.total + parseFloat(addedItem.price) ,
                   }
           }
            else{
               addedItem.quantity = 1;
               //calculating the total
               let newTotal = state.total + parseFloat(addedItem.price) 
               return{
                   ...state,
                   addedItems: [...state.addedItems, addedItem],
                   total : newTotal,
               }
               
        }


        case "REMOVE_WHOLE_ITEM_FROM_CART":
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
            }

        case "REMOVE_QUANTITY_ITEM_FROM_CART":
            let exist_item= state.addedItems.find(item=> action.id === item.id)
            console.log("length : "+state.addedItems.length);
            if(exist_item && exist_item.quantity > 1)
            {
                console.log("have");
                exist_item.quantity -= 1 
                return{
                   ...state,
                    total: state.total - parseFloat(exist_item.price) ,
                }
            }else{
                console.log("no have");
                let new_itemsList = state.addedItems.filter(item=> action.id !== item.id)
                //calculating the total
                let newTotalAmount = state.total - (exist_item.price * exist_item.quantity )

                return{
                    ...state,
                    addedItems: new_itemsList,
                    total: newTotalAmount,
                }       
            }
        

        default:
        return state;
    }
}
  
export default data;