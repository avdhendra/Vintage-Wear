
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../Slice/action/cart.action";
import { setCartItems } from "../../Slice/cartSlice";
import { selectCartItems } from "../../Slice/memoized_selectors/cart.selector";
import { Button } from "../button/button.component";
//import { CartContext } from "../context/cart.context";
import "./ProductCard.style.scss";


function ProductCard({product}) {
  const { name, price, imageUrl } = product
  const dispatch=useDispatch()
    // const {addItemToCart}=useContext(CartContext)
  const cartItems= useSelector(selectCartItems)
    const addProductToCart=()=>dispatch(setCartItems(addItemToCart(cartItems,product)))
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
    </div>
  );
}

export default ProductCard;
