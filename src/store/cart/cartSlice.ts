import { getCartTotalQuantitySelector } from "@store/selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { type TProduct, type TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuan: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload.id];

      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload.id
      );
    },
    cleanUpCartItems: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      // state.error = action.payload as string;
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuan,
  cartItemRemove,
  cleanUpCartItems,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
