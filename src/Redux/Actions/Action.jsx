import { ActionTypes } from "../Constant/ActionTypes"

export const setlist=(list)=>{
    return {
        type:ActionTypes.SETLIST,
        payload:list
    }
}