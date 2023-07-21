import { combineReducers } from "redux";
import { cart_items, selected_item, set_item_list } from "./MainReducers";

export const reducers=combineReducers({
    list:set_item_list,
    product:selected_item,
    cartitems:cart_items
})