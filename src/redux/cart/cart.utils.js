export const addToCart = (currentCartItems, cartItemToAdd) => {
  const existingCartItem = currentCartItems.find(
    (item) => item.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return currentCartItems.map((item) =>
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...currentCartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const reduceQuantityFromCart = (currentCartItems, cartItemToReduce) => {
  const existingCartItem = currentCartItems.find(
    (item) => item.id === cartItemToReduce.id
  );

  if (existingCartItem.quantity === 1) {
    return currentCartItems.filter((item) => item.id !== cartItemToReduce.id);
  }

  return currentCartItems.map((item) =>
    item.id === cartItemToReduce.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
