import { type TProduct, type TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import actGetBestProducts from "./act/actGetBestProducts";

interface IProductState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      // state.error = action.payload as string;
      if (isString(action.payload)) state.error = action.payload;
    });
    builder.addCase(actGetBestProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetBestProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetBestProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix, actGetBestProducts };
export default productsSlice.reducer;
