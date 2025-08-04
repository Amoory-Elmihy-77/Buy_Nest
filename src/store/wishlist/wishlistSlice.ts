import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { isString, type TLoading, type TProduct } from "@types";

interface IWishlistState {
  itemsId: number[];
  error: null | string;
  loading: TLoading;
  productFullInfo: TProduct[];
}

const initialState: IWishlistState = {
  itemsId: [],
  error: null,
  loading: "idle",
  productFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productFullInfoCleanUp: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers:
    // actLikeToggle
    (builder) => {
      builder.addCase(actLikeToggle.pending, (state) => {
        state.error = null;
      });
      builder.addCase(actLikeToggle.fulfilled, (state, action) => {
        if (action.payload.type === "add") {
          state.itemsId.push(action.payload.id);
        } else {
          state.itemsId = state.itemsId.filter(
            (el) => el !== action.payload.id
          );
        }
      });
      builder.addCase(actLikeToggle.rejected, (state, action) => {
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
      // actGetWishlist
      builder.addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
      builder.addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productFullInfo = action.payload;
      });
      builder.addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    },
});
export { actLikeToggle, actGetWishlist };
export const { productFullInfoCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
