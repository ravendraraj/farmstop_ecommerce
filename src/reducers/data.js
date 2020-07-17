const initialDataState = {Otp:'',no_more_data: false,authUserID:'',authEmail:'' ,authMobile:'' ,searchProdName:[],addedItems:[],total: 0,otpVerification:null ,knowMoreProdId:null ,appIntro:'', productData: null, remeasureProd : null,productVatiation:[] };

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
        
        case 'NO_MORE_DATA':
        return {
            ...state,
            no_more_data: action.payload,
        };

        case 'PRODUCT_VARIATION':
            console.log(state.activeProduct +" != " + action.payload[0].product_id);
            console.log(state.productVatiation.length);
        if((state.productVatiation.length > 0) && (state.activeProduct == action.payload[0].product_id)){
            let searchProdctList = [ ...state.productVatiation, ...action.payload];
            console.log("same");
            return {
                ...state,
                productVatiation : searchProdctList,
            };
        }else{
            console.log("initial");
            return {
                ...state,
                productVatiation : action.payload,
            };  
        }


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

        case 'SAVE_REGISTERTION_DETAIL':
        return{
            ...state,
            Otp:action.otp,
            username:action.username,
            email:action.email,
            password:action.password,
        };

        case 'AUTO_COMPLETE_PROD':
        return {
            ...state,
            searchProdName:action.payload
        };
        
        case 'ACTIVE-PROD':
        return {
            ...state,
            activeProduct:action.id,
            productVatiation:[],
            no_more_data:false,
        };

        case 'AUTHORIZED-USER':
        return{
            ...state,
            authEmail :action.email,
            authMobile: action.mobile,
            authUserID: action.userID,
        };

        case 'ADD-WISH':
            let activeProdId = action.activeProdId;
            let updateItemList = state.productVatiation.map(item => {
                if(item.id == activeProdId){
                    console.log(item);
                    console.log(item.isMyWish);
                     if(item.isMyWish === 'heart-outline'){
                            item.isMyWish = "heart";
                            console.log("heart");
                     }else{
                       item.isMyWish = "heart-outline";
                        console.log("outline");
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            productVatiation :updateItemList,
        };

        case 'ADD-PROD-QTY':
            
            let selectProdId = action.activeProdId;
            let actionType = action.actionType;
            let Price = state.total;
            let newItemList = state.productVatiation.map(item => {
                if(item.id == selectProdId){
                    let itemPrice = parseFloat(item.selectedQtyPrice);
                     if(actionType === 'add'){
                        item.selectedQty += 1;
                        if(item.selectedQty >1){
                            itemPrice += parseFloat(item.price);
                            item.selectedQtyPrice = itemPrice;
                            Price += parseFloat(item.price);
                        }
                     }else if(actionType === 'remove' && item.selectedQty >0){
                        item.selectedQty -= 1;
                        if(item.selectedQty >0){
                            itemPrice -= parseFloat(item.price);
                            item.selectedQtyPrice = itemPrice;
                            Price -= parseFloat(item.price);
                        }
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            productVatiation :newItemList,
            total :Price
        };
        

        case 'MANAGE-CART-QTY':
            
            let cartSelectProdId = action.activeProdId;
            let cartActionType = action.actionType;
            let totalPrice = parseFloat(state.total);
            let newCartItemList = state.addedItems.map(item => {
                if(item.id == cartSelectProdId.id){
                    let cartItemPrice = parseFloat(item.selectedQtyPrice);
                     if(cartActionType === 'add'){
                        item.selectedQty += 1;
                        if(item.selectedQty >1){
                            cartItemPrice += parseFloat(item.price);
                            item.selectedQtyPrice = cartItemPrice;
                            totalPrice += parseFloat(item.price);
                        }
                     }else if(cartActionType === 'remove' && item.selectedQty >0){
                        item.selectedQty -= 1;
                        if(item.selectedQty >0){
                            cartItemPrice -= parseFloat(item.price);
                            item.selectedQtyPrice = cartItemPrice;
                            totalPrice -= parseFloat(item.price);
                        }
                     }
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            addedItems :newCartItemList,
            total :totalPrice
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