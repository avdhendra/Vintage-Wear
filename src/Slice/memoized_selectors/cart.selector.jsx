import { createSelector } from "@reduxjs/toolkit";

const selectCartReducer = (state) => state.carts

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart)=>cart.cartItems
)
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart)=>cart.isCartOpen
)


export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce(
   (total, cartItem) => total + cartItem.quantity,
   0
 )
)

 //Generate NewCartCount
 export const selectCartTotal = createSelector(
     [selectCartItems],
     (cartItems)=>cartItems.reduce( (total, cartItem) => total + cartItem.price * cartItem.quantity,
   0
 )
 )

  