import React, {  useContext } from 'react'
import CheckoutItem from '../checkout-item/checkout-item.component'
import { CartContext } from '../context/cart.context'
import './checkout.style.scss'

function CheckOut() {
  const{cartItems,total}=useContext(CartContext)
  
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
        <span>Product</span>
        </div>
        
        <div className='header-block'>
        <span>Description</span>
        </div>
        
        <div className='header-block'>
        <span>Quantity</span>
        </div>
        
        <div className='header-block'>
        <span>Price</span>
        </div>

        <div className='header-block'>
        <span>Remove</span>
        </div>
      </div>
        {/* <h1>I am the CheckOut Page</h1> */}
        
         {
          cartItems.map((cartItem)=>{
            
            return(
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
              )
          })
      } 
      <span className='total'>Total: $ { total}</span>
        </div>
  
  )
}

export default CheckOut