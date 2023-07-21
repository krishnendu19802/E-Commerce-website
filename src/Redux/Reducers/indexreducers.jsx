import { combineReducers } from "redux";
import { set_item_list } from "./MainReducers";

export const reducers=combineReducers({
    list:set_item_list
})