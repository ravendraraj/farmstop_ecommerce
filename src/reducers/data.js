const initialDataState = {apartmentList:[],coupon_value:'', coupon_msg:'' ,my_wish_list:[],Otp:'',no_more_data: false,authUserID:'',authEmail:'' ,authMobile:'' ,login_type:'',profile:'',authName:'',token:'',searchProdName:[],addedItems:[],total: 0,otpVerification:null ,
    knowMoreProdId:null ,appIntro:'', productData: null, remeasureProd : null,productVatiation:[],selectAddress:null, shippingCharges:null,shippingPincode:null,searchProductList:[],cartItemSync:false ,addressList:[],
deliveryDate:'',defaultShipingAddress:"",coupon_id:null,orderList:[],orderDetail:[],popup:'',userNotifications:[],deviceToken:'',os:''};

const data = (state = initialDataState, action) => {
    switch (action.type) {
        case 'APP_INTRO_DONE':
        return { 
            ...state,
            appIntro:action.data
        };

        case 'LOGIN_SUCCESS':
        return{
            ...state,
            popup:action.payload,
        }

        case 'GET_DELIVERY_DATE':
        return{
            ...state,
            deliveryDate:action.deliveryDate            
        }

        case 'SET_DIVECE_DATA':
        return{
            ...state,
            deviceToken:action.token,
            os:action.os
        }

        case 'FETCH_NOTIFICATION_LIST':
        return{
            ...state,
            userNotifications:action.notification
        }

        case 'EDIT_PROFILE':
        return { 
            ...state,
            popup:action.payload,
            authMobile:action.authMobile,
            authEmail:action.authEmail
        };

        case 'REMOVE_POPUP':
        return { 
            ...state,
            popup:'',
        };

        case 'ORDER_SUCCESSFULL':
        return{
            ...state,
            total:0,
            addedItems:[]
        }

        case 'FETCH_ORDER_DETAILS':
        return{
            ...state,
            orderDetail:action.orederDetails,
        }

        case 'FETCH_ORDER_LIST':
        return{
            ...state,
            orderList :action.orederList,
        }

        case 'LOGOUT':
            return{
                ...state,
                userNotifications:[],
                cartItemSync:false,
                apartmentList:[],
                coupon_value:'',
                authUserID:'',
                authEmail:'' ,
                authMobile:'',
                login_type:'',
                profile:'',
                my_wish_list:[],
                addedItems:[],
                authName:'',
                total:0,
                selectAddress:null,
                shippingCharges:null,
                shippingPincode:null,
                defaultShipingAddress:"",
                activeProduct:'',
                orederDetails:[],
                token:''
            }
        
        case 'FETECH_ADDRESS_LIST':
        return{
            ...state,
            addressList: action.addressList,
        }

        case 'SAVED_DEFAULT_SHIPPING_ADDRESS':
        return{
            ...state,
            defaultShipingAddress: action.addressId,
            shippingCharges:action.shipping_cost,
        }

        case 'NEW_ADDRESS_SAVED':
        return{
            ...state,
            addressList: action.addressList,
        }

        case 'DILEVER_ON_PINCODE':
            return{
                ...state,
                shippingCharges: action.shipping_cost,
            }

        case 'NOT_DILEVER_ON_PINCODE':
            return{
                ...state,
                coupon_msg: action.payload,
                shippingCharges:null,
            }
        
        case 'CART_ITEM_SYNC':
            let newSyncItemTotal = 0;
            let isLoggedIn = state.authUserID !=""? true : false;
            if(action.cartItem.length >0)
            {
                action.cartItem.map(item=>{
                    newSyncItemTotal += parseFloat(item.selectedQtyPrice);
                })
            }

            return{
            ...state,
            addedItems: action.cartItem,
            total : newSyncItemTotal,
            cartItemSync:isLoggedIn,
        }

        case 'PRODUCT_FETCH':
        return {
            ...state,
            productData : action.payload,
            activeProduct:''
        };

        case 'ASYNC_LOCATION_FETCHED':
        case 'LOCATION_FETCHED':
            // console.log(action.details)
            //shipping_cost
            return {
                ...state,
                selectAddress : action.address,
                shippingCharges :action.shipping_cost,
                shippingPincode :action.pincode,
        }; 
        
        // case 'NOT_DELIVER':
        //     //console.log(action.details)
        //     return {
        //         ...state,
        //         selectAddress : action.address,
        //     }; 
        
        case 'NO_MORE_DATA':
        return {
            ...state,
            no_more_data: action.payload,
        };

        case 'PRODUCT_VARIATION':
            //console.log(state.activeProduct +" != " + action.payload[0].product_id);
            //console.log(state.productVatiation.length);
        if((state.productVatiation.length > 0) && (state.activeProduct == action.payload[0].product_id)){
            let searchProdctList = [ ...state.productVatiation, ...action.payload];
            //console.log("same");
            return {
                ...state,
                productVatiation : searchProdctList,
            };
        }else{
            //console.log("initial");
            return {
                ...state,
                productVatiation : action.payload,
            };  
        }


        case 'KNOW_MORE_ABOUT_PROD':
        return{
            ...state,
            knowMoreProdId : action.prodTypeId,
            screen:action.screen,
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

        case 'SEARCH_PRODUCT_LIST':
            return {
                ...state,
                searchProductList:action.payload
        };

        case 'ACTIVE-PROD':
        return {
            ...state,
            activeProduct:action.id,
            productVatiation:[],
            no_more_data:false,
            searchProductList:[],
        };

        case 'AUTHORIZED-USER':
        return{
            ...state,
            authEmail :action.email,
            authMobile: action.mobile,
            authUserID: action.userID,
            login_type:action.login_type,
            profile:action.profile,
            authName:action.authName,
            token:action.token
        };

        case 'MY_WISHLIST':
        return{
            ...state,
            my_wish_list:action.payload,
        }

        case 'ADD-WISH':
            let activeProdId = action.activeProdId;
            let updateItemList = state.productVatiation.map(item => {
                if(item.id == activeProdId){
                    //console.log(item);
                    //console.log(item.isMyWish);
                     if(item.isMyWish === 'heart-outline'){
                            item.isMyWish = "heart";
                      //      console.log("heart");
                     }else{
                       item.isMyWish = "heart-outline";
                        //console.log("outline");
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            productVatiation :updateItemList,
        };

        case 'SEARCH-PROD-ADD-WISH':
            let activeProd = action.activeProdId;
            let updateList = state.searchProductList.map(item => {
                if(item.id == activeProd){
                    //console.log(item);
                    //console.log(item.isMyWish);
                     if(item.isMyWish === 'heart-outline'){
                            item.isMyWish = "heart";
                      //      console.log("heart");
                     }else{
                       item.isMyWish = "heart-outline";
                        //console.log("outline");
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            searchProductList :updateList,
        };

        case 'ADD-PROD-QTY':
            
            let selectProdId = action.activeProdId;
            let actionType = action.actionType;
            let Price = state.total;
            let datasetForCartQty = state.productVatiation;
            
            if(action.screen == "Search"){
                datasetForCartQty = state.searchProductList;
            }

            let newItemList = datasetForCartQty.map(item => {
                if(item.id == selectProdId){
                    let itemPrice = parseFloat(item.selectedQtyPrice);
                     if(actionType === 'add'){
                        item.selectedQty += 1;

                        if(item.selectedQty >0){
                            
                            if(item.selectedQty >1){
                                itemPrice += parseFloat(item.selectedVariationPrice);
                            }

                            item.selectedQtyPrice = itemPrice;
                            //Price += parseFloat(item.selectedVariationPrice);
                        }

                     }else if(actionType === 'remove' && item.selectedQty >0){
                        item.selectedQty -= 1;
                        if(item.selectedQty >=0){
                            if(item.selectedQty >0){
                                itemPrice -= parseFloat(item.selectedVariationPrice);
                            }

                            item.selectedQtyPrice = itemPrice;
                            //Price -= parseFloat(item.selectedVariationPrice);
                        }
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        if(action.screen == "Search"){
            return {
                ...state,
                searchProductList :newItemList,
                total :Price
            };
        }else{
            return {
                ...state,
                productVatiation :newItemList,
                total :Price
            };
        }

        case 'MANAGE-WISHPROD-QTY':
            
            let selectWishProdId = action.activeProdId;
            let wishactionType = action.actionType;
            let WishPrice = state.total;
            console.log(selectWishProdId);
            let newWishItemList = state.my_wish_list.map(item => {
                if(item.id == selectWishProdId){
                    let WishItemPrice = parseFloat(item.selectedQtyPrice);
                     if(wishactionType === 'add'){
                        item.selectedQty += 1;

                        if(item.selectedQty >0){
                            
                            if(item.selectedQty >1){
                                WishItemPrice += parseFloat(item.selectedVariationPrice);
                            }

                            item.selectedQtyPrice = WishItemPrice;
                            //Price += parseFloat(item.selectedVariationPrice);
                        }

                     }else if(wishactionType === 'remove' && item.selectedQty >0){
                        item.selectedQty -= 1;
                        if(item.selectedQty >=0){
                            if(item.selectedQty >0){
                                WishItemPrice -= parseFloat(item.selectedVariationPrice);
                            }

                            item.selectedQtyPrice = WishItemPrice;
                            //Price -= parseFloat(item.selectedVariationPrice);
                        }
                     } 
                }

                return item;
              });
              //console.log(updateItemList);
        return {
            ...state,
            my_wish_list :newWishItemList,
            total :WishPrice
        };

        case 'MANAGE-CART-QTY':
            
            let cartSelectProdId = action.activeProdId;
            let cartActionType = action.actionType;
            let totalPrice = parseFloat(state.total);
            let newCartItemList = state.addedItems.map(item => {
                if(item.prod_id == cartSelectProdId && item.selectedVariationID == action.selectedVariationId){
                    let cartItemPrice = parseFloat(item.selectedQtyPrice);
                    var totalProdQty = parseInt(item.selectedQty);
                     if(cartActionType === 'add'){
                        item.selectedQty = totalProdQty+1;
                        if(parseInt(item.selectedQty) >0){
                            if(parseInt(item.selectedQty) >1){
                              cartItemPrice += parseFloat(item.selectedVariationPrice);
                            }
                            item.selectedQtyPrice = cartItemPrice;
                            totalPrice += parseFloat(item.selectedVariationPrice);
                        }

                     }else if(cartActionType === 'remove' && item.selectedQty >1){
                        item.selectedQty = totalProdQty-1;
                        if(item.selectedQty >0){
                            cartItemPrice -= parseFloat(item.selectedVariationPrice);
                            item.selectedQtyPrice = cartItemPrice;
                            totalPrice -= parseFloat(item.selectedVariationPrice);
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

        //Set product Variation 
        case "SET_PRODUCT_VARIATION":
            let selectedProdId = action.prod_id;
            let selectedVariation = action.variation;
            let getDataSet = state.productVatiation;
            if(action.screen == "Search"){
                getDataSet = state.searchProductList;
            }

            let changeVariation = getDataSet.map((item,index) => {
                if(item.id == selectedProdId){
                        item.variation_details.map(variation => {
                            
                        if(variation.varition === selectedVariation){
                            // console.log("Select ravendra");
                            item.selectedQtyVariation = selectedVariation;
                            item.selectedQtyPrice = variation.right_price;
                            item.selectedVariationID = variation.varition_detail_id;
                            item.selectedVariationPrice = variation.right_price;
                            item.selectedQty=1;
                        }else if(selectedVariation === "Select"){
                            // console.log("Not Select");
                            item.selectedVariationID = "";
                            item.selectedVariationPrice ="";
                        }
                    })
                }

                return item;
            });

            if(action.screen == "Search"){
                return{
                    ...state,
                    searchProductList:changeVariation,
                }
            }else{
                return{
                    ...state,
                    productVatiation:changeVariation,
                }
            }
        
        //for wish list item
        case "SET_PRODUCT_VARIATION_IN_WISH":
                let selectedWishProdId = action.prod_id;
                let selectedWishVariation = action.variation;
                let changeMy_wish_list = state.my_wish_list.map((item,index) => {
                    if(item.id == selectedWishProdId){
                            item.variation_details.map(variation => {
                                
                            if(variation.varition === selectedWishVariation){
                                // console.log("Select ravendra");
                                item.selectedQtyVariation = selectedWishVariation;
                                item.selectedQtyPrice = variation.right_price;
                                item.selectedVariationID = variation.varition_detail_id;
                                item.selectedVariationPrice = variation.right_price;
                                item.selectedQty=1;
                            }else if(selectedWishVariation === "Select"){
                                // console.log("Not Select");
                                item.selectedVariationID = "";
                                item.selectedVariationPrice ="";
                            }
                        })
                    }
    
                    return item;
                });

                return{
                    ...state,
                    my_wish_list:changeMy_wish_list,
                }

        
        //New add cart item 
        case "ADD_TO_CART":
    
            let dataSetForCart = state.productVatiation;
            
            if(action.screen == "Search"){
                dataSetForCart = state.searchProductList;
            }else if(action.screen == "MyWish" || action.screen =="SearchWishItem"){
                dataSetForCart = state.my_wish_list;
            }

            let addedItem = dataSetForCart.find(item => item.id === action.id && item.selectedVariationID == action.selectedVariationID);
             //check if the action id exists in the addedItems
            let existed_item= state.addedItems.find(item=> action.id === item.id && item.selectedVariationID == addedItem.selectedVariationID)
            if(existed_item)
            {
               addedItem.quantity += 1 
                return{
                   ...state,
                   //addedItems: [...state.addedItems, addedItem], 
                   }
           }
            else{
                let newCartItem = {
                "id" : (state.addedItems.length+1).toString(),
                "attribute_name":addedItem.attribute_name,
                "price":addedItem.price,
                "prod_id" : addedItem.id, // its product id
                "prod_cat_id" : addedItem.product_id,
                "fimage" : addedItem.fimage,
                "cart_item_id": action.cart_item_id,
                "selectedQty": addedItem.selectedQty,
                "selectedVariationID": addedItem.selectedVariationID,
                "selectedQtyPrice":addedItem.selectedQtyPrice,
                "selectedQtyVariation": addedItem.selectedQtyVariation,
                "selectedVariationPrice": addedItem.selectedVariationPrice,
                "variation_details": addedItem.variation_details
                }

            //    addedItem.quantity = 1;
               //calculating the total
               let newTotal = state.total + parseFloat(addedItem.selectedQtyPrice) 
               return{
                   ...state,
                   addedItems: [...state.addedItems, newCartItem],
                   total : newTotal,
               }
               
        }

        case "SET_PRODUCT_VARIATION_IN_CART":
                let cartProdId = action.prod_id;
                let selectedCartVariation = action.variation;
                var totalOnChangeVari = state.total;
                let oldPriceOnPicker = action.oldPrice;
                let changeCart = state.addedItems.map((item,index) => {
                    if(item.prod_id == cartProdId && item.selectedVariationID == action.preVarId){
                            item.variation_details.map(variation => {
                                
                            if(variation.varition === selectedCartVariation){
                                // console.log("Select ravendra");
                                item.selectedQtyVariation = selectedCartVariation;
                                item.selectedQtyPrice = (parseInt(item.selectedQty)*parseFloat(variation.right_price));
                                item.selectedVariationID = variation.varition_detail_id;
                                item.selectedVariationPrice = variation.right_price;
                                totalOnChangeVari=(totalOnChangeVari-parseFloat(oldPriceOnPicker)+ (parseInt(item.selectedQty)*parseFloat(variation.right_price)));
                            }else if(selectedCartVariation === "Select"){
                                // console.log("Not Select");
                                item.selectedVariationID = "";
                                item.selectedVariationPrice ="";
                            }
                        })
                    }
    
                    return item;
                });

                console.log(state.total + "  m-"+totalOnChangeVari);
                return{
                    ...state,
                    addedItems:changeCart,
                    total:totalOnChangeVari
            }

        case 'REMOVE_FROM_WISH':
            let updateWishList = state.my_wish_list.filter(item=> (action.prod_id != item.id ));
            return{
                ...state,
                my_wish_list:updateWishList
            }

        case "REMOVE_ITEM":
            let itemToRemove= state.addedItems.find(item=> (action.id === item.prod_id && action.selectedVariationID == item.selectedVariationID));

            let new_items = state.addedItems.filter(item=> (action.cart_id != item.id ));
            
            //calculating the total
            let newTotal = state.total - parseFloat(itemToRemove.selectedQtyPrice);
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
            }

        case "REMOVE_QUANTITY_ITEM_FROM_CART":
            let exist_item= state.addedItems.find(item=> action.id === item.id)
            // console.log("length : "+state.addedItems.length);
            if(exist_item && exist_item.quantity > 1)
            {
                // console.log("have");
                exist_item.quantity -= 1 
                return{
                   ...state,
                    total: state.total - parseFloat(exist_item.price) ,
                }
            }else{
                // console.log("no have");
                let new_itemsList = state.addedItems.filter(item=> action.id !== item.id)
                //calculating the total
                let newTotalAmount = state.total - (exist_item.price * exist_item.quantity )

                return{
                    ...state,
                    addedItems: new_itemsList,
                    total: newTotalAmount,
                }       
            }

        case 'COUPON_CODE_VALIDATE':
            return{
                ...state,
                coupon_msg:action.payload,
                coupon_value:action.coopunValue,
                coupon_id:action.coupon_id,

            }

        case 'REMOVE_COUPON_CODE_MSG':
            return{
                ...state,
                coupon_msg:[],
                coupon_value:[],    
            }
        case 'GET_APARTMENT':
            return{
                ...state,
                apartmentList:action.apartment,
            }

        default:
        return state;
    }
}
  
export default data;