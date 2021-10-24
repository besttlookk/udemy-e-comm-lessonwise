import React from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import StripeButton from "../../components/StripeButton/StripeButton";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selectors";

import "./Checkout.scss";

const CheckoutPage = () => {
  const totalPrice = useSelector(selectCartTotalPrice);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${totalPrice}</div>
      <StripeButton price={totalPrice} />
    </div>
  );
};

export default CheckoutPage;

/*
import React from "react";
import { connect } from "react-redux";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import StripeButton from "../../components/StripeButton/StripeButton";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selectors";

import "./Checkout.scss";

const CheckoutPage = ({ cartItems, totalPrice }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">TOTAL: ${totalPrice}</div>
    <StripeButton price={totalPrice} />
  </div>
);

// const mapStateToProps = ({ cart: { cartItems } }) => {
//   console.log("checkout mapstatetoprops");
//   const totalPrice = cartItems.reduce(
//     (amount, currentItem) => currentItem.quantity * currentItem.price + amount,
//     0
//   );
//   return {
//     totalPrice,
//     cartItems,
//   };
// };

// ! using selectors and memoization
const mapStateToProps = (state) => ({
  totalPrice: selectCartTotalPrice(state),
  cartItems: selectCartItems(state),
});

// const mapStateToProps = createStructuredSelector({
//   cartItems: selectCartItems,
//   total: selectCartTotal,
// });

export default connect(mapStateToProps)(CheckoutPage);

*/
