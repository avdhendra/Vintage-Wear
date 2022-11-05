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

 export const addItemToCart = (cartItems,productToAdd) => {
   const newCartItems = addCartItem(cartItems, productToAdd);
   return newCartItems;
 };
 export const removeItemToCart = (cartItems,cartItemToRemove) => {
   const newCartItems = removeItemCart(cartItems, cartItemToRemove);
   return newCartItems
 };
 export const clearItemFromCart = (cartItems,cartItemToClear) => {
   const newCartItems = clearCartItem(cartItems, cartItemToClear);
   return newCartItems
 };