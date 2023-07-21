import { ActionTypes } from "../Constant/ActionTypes";

export const set_item_list=(state=[],actions)=>{
    switch (actions.type) {
        case ActionTypes.SETLIST:
         return [...actions.payload]
    
        default:
           return state
    }
}