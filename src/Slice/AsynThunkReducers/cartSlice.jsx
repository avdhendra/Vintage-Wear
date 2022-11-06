import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};
const cartSlice = createSlice({
    name: 'cart',
   initialState:INITIAL_STATE,
    reducers: {
        setCartItems: (state, action) => {
            // state.cartItems.push(action.payload)
            return {
                ...state,
                cartItems:action.payload 
            }
        },
        // setcartCount: (state, action) => {
        //     state.cartCount=action.payload
        // },
        // setCartTotal:(state, action)=> {
        //     state.total=action.payload
        // },
        setIsCartOpenReducer:(state, action)=> {
    //         return {
    // ...state,
    //             isCartOpen: action.payload
    //         }
            state.isCartOpen=action.payload
        },

        }
    }
)

export const isCartOpenSlice = (state) => state.carts.isCartOpen
export const cartItemsSlice = (state) => state.carts.cartItems

export const {setIsCartOpenReducer,setCartItems}=cartSlice.actions
export default cartSlice.reducer
