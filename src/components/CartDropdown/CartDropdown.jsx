import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CartItem from "../CartItem/CartItem.jsx";
import CustomButton from "../CustomButton/CustomButton";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./CartDropdown.scss";

//
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

// ! if we don not provide mapDispatchToProps, connect will provide "dispatch " function as props inside component
export default withRouter(connect(mapStateToProps)(CartDropdown));
