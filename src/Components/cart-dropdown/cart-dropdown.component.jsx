import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../context/cart.context";
import "./cart-dropdown.style.scss";

function CartDropDown() {
  const{cartItems}=useContext(CartContext)
  const navigate=useNavigate()
  const goToCheckOutHandler =()=>{
    navigate('/checkout')
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" >
      {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckOutHandler}>Go to CheckOut</Button>
    </div>
  );
}

export default CartDropDown;
