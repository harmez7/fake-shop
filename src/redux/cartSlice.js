import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cart')) || [],
    reducers: {
        addToCart: (state, { payload }) => {
            const newItem = {
                ...payload,
                inCart: true,
                subtotal: Number(payload.price) * Number(payload.quantity),
            }
            state.push(newItem)
            localStorage.setItem('cart', JSON.stringify(state))
        },

        increaseQuantity: (state, { payload }) => {
            const item = state.find(item => item.id === payload)
            item.quantity += 1;
            item.subtotal = 
            Number((Number(item.price) * Number(item.quantity)).toFixed(2));
            localStorage.setItem('cart', JSON.stringify(state))
        },

        decreaseQuantity: (state, { payload }) => {
            const item = state.find(item => item.id === payload)
            if(item.quantity === 1) return;
            item.quantity -= 1;
            item.subtotal =
            Number((Number(item.price) * Number(item.quantity)).toFixed(2));
            localStorage.setItem('cart', JSON.stringify(state))
        },

        removeCartItem: (state, { payload }) => {
            const newState =  state.filter(item => item.id != payload)
            localStorage.setItem('cart', JSON.stringify(newState))
            return newState
        },

        clearCart: state => {
            localStorage.setItem('cart', JSON.stringify([]))
            return state = []
        }
    }
})

export default cartSlice.reducer
export const cartActions = cartSlice.actions