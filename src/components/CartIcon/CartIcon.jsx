import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import "./CartIcon.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartIcon = ({ itemCount, dispatch }) => {
  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  // find the total quantity of item
  const itemCount = cart.cartItems.reduce(
    (amount, currentItem) => currentItem.quantity + amount,
    0
  );

  return {
    itemCount,
  };
};

export default connect(mapStateToProps)(CartIcon);
