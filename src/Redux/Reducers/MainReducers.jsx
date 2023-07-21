import { ActionTypes } from "../Constant/ActionTypes";

export const set_item_list=(state=[],actions)=>{
    switch (actions.type) {
        case ActionTypes.SETLIST:
         return [...actions.payload]
    
        default:
           return state
    }
}

export const selected_item=(state={},actions)=>{
    switch (actions.type) {
        case ActionTypes.SELECT_ITEM:
          return actions.payload
          break;
        case ActionTypes.REMOVE_ITEM:
            return {}
            break;
        default:
            return state
    }
}

export const cart_items=(state=[],{type,payload})=>{
    switch (type) {
        case ActionTypes.ADD_CART:
            let item=payload
           if(state.length===0)
           return [item]
           else{
            let i=0
            for(i=0;i<state.length;i++){
                if(item.id===state[i].id)
                break
            }
              if(i===state.length)
              return [...state,item]
              else{
                let qt=state[i].quantity
                return state.slice(0,i).concat(item).concat(state.slice(i+1))
              }
           }
            break;
        case ActionTypes.REMOVE_ITEM_CART:
            let i=0
            for(i=0;i<state.length;i++){
                if(state[i].id===payload.id)
                break
            }
            return state.slice(0,i).concat(state.slice(i+1))
            break;
        default:
            return state
    }
}