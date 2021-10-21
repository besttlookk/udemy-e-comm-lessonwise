import CartTypes from "./cart.types";

const {
  ADD_ITEM_TO_CART,
  TOGGLE_CART_HIDDEN,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
} = CartTypes;

export const addItem = (item) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item,
  };
};

export const clearItem = (item) => {
  return {
    type: CLEAR_ITEM_FROM_CART,
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: item,
  };
};

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});
