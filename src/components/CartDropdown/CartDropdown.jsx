/*
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CartItem from "../CartItem/CartItem.jsx";
import CustomButton from "../CustomButton/CustomButton";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./CartDropdown.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors.js";


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

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems,
// });

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

// ! if we don not provide mapDispatchToProps, connect will provide "dispatch " function as props inside component
export default withRouter(connect(mapStateToProps)(CartDropdown));

*/

// ! ================================ With hooks =============================
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CartItem from "../CartItem/CartItem.jsx";
import CustomButton from "../CustomButton/CustomButton";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./CartDropdown.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors.js";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartItems = useSelector(selectCartItems);
  return (
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
};

export default CartDropdown;
