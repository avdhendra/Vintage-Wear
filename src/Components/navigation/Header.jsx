import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assests/crown.svg";
import { signOutUser } from "../../firebase/firebase.utils";
//import { isCartOpenSlice } from "../../Slice/cartSlice";
import { selectIsCartOpen } from "../../Slice/memoized_selectors/cart.selector";
import { currentUserSlice } from "../../Slice/AsynThunkReducers/userSlice";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from '../cart-icon/cart-icon'
;


import "./navigation.styles.scss";

function Header() {
  const isCartOpen  = useSelector(selectIsCartOpen);
const currentUser=useSelector(currentUserSlice)
  const signOutHandler = async () => {
    await signOutUser();
    //setCurrentUser(null)
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-links" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-links" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-links" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Header;
