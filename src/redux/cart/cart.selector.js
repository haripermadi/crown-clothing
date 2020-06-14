import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cumm) => acc + cumm.quantity, 0)
);

export const selectHidden = createSelector([selectCart], (cart) => cart.hidden);

export const selectCartItemTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, cumm) => acc + cumm.quantity * cumm.price, 0)
);
