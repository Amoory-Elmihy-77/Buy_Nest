import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => {
    return state.cartSlice.items;
  },
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return totalQuantity;
  }
);

export { getCartTotalQuantitySelector };
