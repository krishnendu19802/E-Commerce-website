import { ActionTypes } from "../Constant/ActionTypes"

export const setlist=(list)=>{
    return {
        type:ActionTypes.SETLIST,
        payload:list
    }
}

export const selectitem=(item)=>{
    return {
        type:ActionTypes.SELECT_ITEM,
        payload:item
    }
}

export const removeselectitem=()=>{
    return {
        type:ActionTypes.REMOVE_ITEM
        
    }
}

export const addcartitem=(item)=>{
    return {
        type:ActionTypes.ADD_CART,
        payload:item
    }
}

export const removeitemcart=(item)=>{
    return {
        type:ActionTypes.REMOVE_ITEM_CART,
        payload:item
    }
}