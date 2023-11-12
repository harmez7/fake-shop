import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cartActions } from "./cartSlice";

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return (
            axios.get("https://fakestoreapi.com/products")
            .then(resp => resp.data)
    )
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        error: ''
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true
            state.products = []
            state.error = ''
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
        builder.addCase(cartActions, () => {
            console.log('first')
        })
    }
})

export default productSlice.reducer