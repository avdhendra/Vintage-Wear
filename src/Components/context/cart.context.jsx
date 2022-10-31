import { useEffect } from 'react';
import { createContext, useState } from 'react';
//add Item in cart
export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//remove item from checkout cart
const removeItemCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  if (existingCartItem.quantity === 1) { 
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  if (existingCartItem) {
     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

}


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount:0,
  removeItemToCart: () => { },
  clearItemFromCart: () => { },
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0)
  const [total, setTotal] = useState(0)
  //Item Count
useEffect(()=>{
const newCartCount=cartItems.reduce((total,cartItem)=>total+=cartItem.quantity,0)
  setCartCount(newCartCount)
  
}, [cartItems, cartCount])
  
  //TotalAmount
  useEffect(() => {
const TotalAmount= cartItems.reduce((total,cartItem)=>total+=cartItem.quantity*cartItem.price,0)
setTotal(TotalAmount)
  },[cartItems])
  
const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));
  
const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeItemCart(cartItems,cartItemToRemove))
  }
  const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems,cartItemToClear))
    
   }

const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart,cartCount,removeItemToCart,clearItemFromCart,total };

return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


// import { createContext, useState } from "react";
// const addCartItem = (cartItems, productToAdd) => {
//   //find if cartItem contains product to add
//   const existingCartItem = cartItems.find((cartItem) => {
//     return cartItem.id === productToAdd.id;
//   });
//   //if found increment quantity
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }
//   //return new array with modify cartitem new cartItem
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };
// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
// });
// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//   };
//   const value = { isCartOpen, setIsCartOpen,addItemToCart };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

