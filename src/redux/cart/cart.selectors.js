import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  selectCart,
  (cart) => cart.hidden
);

export const selectCartCount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((amount, currentItem) => currentItem.quantity + amount, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems.reduce(
      (amount, currentItem) =>
        currentItem.quantity * currentItem.price + amount,
      0
    )
);
