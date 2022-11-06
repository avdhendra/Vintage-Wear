//import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import {  setIsCartOpenReducer } from "../../Slice/AsynThunkReducers/cartSlice";
import { selectCartCount, selectIsCartOpen } from "../../Slice/memoized_selectors/cart.selector";
//import { CartContext } from "../context/cart.context";
import "./cart-icon.style.scss";

function CartIcon() {
 // const { isCartOpen, setIsCartOpen ,cartCount} = useContext(CartContext);
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount=useSelector(selectCartCount)
  const toggleIsCartOpen = () => dispatch(setIsCartOpenReducer(!isCartOpen))
 
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}
export default CartIcon;
