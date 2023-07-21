import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./Reducers/indexreducers";

const store=configureStore({
    reducer:reducers
})

export default store