import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice'
import cartSliceReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartSliceReducer
    }
})

export default store