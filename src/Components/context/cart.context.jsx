import { createContext } from "react";
import { useReducer } from "react";
import { createAction } from "../../utils/reducer_utils/reducer.utils";

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
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
});
export const CART_ACTION_TYPE = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_ISOPEN: "SET_CART_ISOPEN",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPE.SET_CART_ISOPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unHandled type of ${type} in cartReducer`);
  }
};
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, total }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  //Update the Value by encapsulating the updating function in one function
  const updateCartItemsReducer = (newCartItems) => {
    //Generate NewCartTotal
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    //Generate NewCartCount
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

   
    // dispatch({
    //   type: "SET_CART_ITEMS",
    //   payload: {
    //     cartItems: newCartItems,
    //     total: newCartTotal,
    //     cartCount: newCartCount,
    //   },
    // });
   dispatch( createAction(CART_ACTION_TYPE.SET_CART_ITEMS,{
      cartItems: newCartItems,
        total: newCartTotal,
         cartCount: newCartCount,
   })
   )
  };

  const setIsCartOpen = (isOpen) => {
    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ISOPEN,  isOpen ))
    //dispatch({ type: CART_ACTION_TYPE.SET_CART_ISOPEN, payload: isOpen });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeItemCart(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    total,
  };

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
