import CartTypes from "./cart.types";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};
const {
  ADD_ITEM_TO_CART,
  TOGGLE_CART_HIDDEN,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
} = CartTypes;

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_TO_CART:
      // if item is not present add. But if present increase quantity
      const newItems = addItemToCart(state.cartItems, payload);
      return { ...state, cartItems: newItems };

    case TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };

    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, payload),
      };

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload),
      };

    default:
      return state;
  }
};
