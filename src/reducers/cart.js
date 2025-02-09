const initState = {addedItems:[],total: 0};

const cart= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === "ADD_TO_CART"){
         item = getState().data.productVatiation;
         let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price ,
                }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
                totalItemInCart :addedItem.quantity

            }
            
        }
    }

    //remove item
    if(action.type === "REMOVE_ITEM"){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        return{
            ...state,
            addedItems: new_items,
            total: newTotal,
        }
    }

    //add quantity
    if(action.type=== "ADD_QUANTITY"){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal,
          }
    }

    //extra charges
    if(action.type=== "SUB_QUANTITY"){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal,
                totalItemInCart :addedItem.quantity 
            }
        }
        
    }


    //add shiping
    if(action.type=== "ADD_SHIPPING"){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cart;