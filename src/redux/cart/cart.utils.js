// ! If item is added for the first time just add else increse the quantity
export const addItemToCart = (oldCartItems, itemToAdd) => {
  const isItemExist = oldCartItems.find((item) => item.id === itemToAdd.id);

  if (isItemExist) {
    return oldCartItems.map((item) => {
      if (item.id === itemToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
  } else {
    return [...oldCartItems, { ...itemToAdd, quantity: 1 }];
  }
};

// ! to remove one particular item irrespective of quantity
export const clearItemFromCart = (oldCartItems, itemToClear) => {
  return oldCartItems.filter((item) => item.id !== itemToClear.id);
};

export const removeItemFromCart = (oldCartItems, itemToRemove) => {
  const item = oldCartItems.find((item) => item.id === itemToRemove.id);
  if (item.quantity === 1) return clearItemFromCart(oldCartItems, itemToRemove);

  return oldCartItems.map((item) => {
    if (item.id === itemToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    } else return item;
  });
};
