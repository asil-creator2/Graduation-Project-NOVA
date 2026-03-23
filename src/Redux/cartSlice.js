import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'CartSlice',
    initialState: {
        products: [] 

    },
    reducers: {
        addToCart: (state , action) => {
            const item = state.products.find((product)  => product.id === action.payload.id)
            if (item) { item.quantity ++} 
            else {state.products.push(action.payload)}
        },
        increment : (state,action) => {
            console.log(action.payload);
            
            const item = state.products.find((product)   => product.id === action.payload.id)
            if (item) { item.quantity ++} 
        },
        decrement : (state,action) => {
            const item = state.products.find((product)  => product.id === action.payload.id)
            if (item && item.quantity > 1) { item.quantity --} 
            else if (item && item.quantity === 1) { item.quantity = 1}

        },
        removeItem(state,action){
            const item = state.products.find((product)  => product.id === action.payload.id)
            if (item) {state.products.splice(state.products.indexOf(item), 1)}
        },
        clearCart(state){
            state.products = []
        }

    }
});

export const {addToCart,decrement,increment,removeItem,clearCart} = CartSlice.actions
export default CartSlice.reducer