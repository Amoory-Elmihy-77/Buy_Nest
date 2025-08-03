import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "/cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { cartSlice } = getState() as RootState;
    const itemsId = Object.keys(cartSlice.items);
    if (itemsId.length === 0) return fulfillWithValue([]);
    try {
      const concatenatedItemsID = itemsId.map((it) => `id=${it}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsID}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Unexpected Error");
      }
    }
  }
);

export default actGetProductsByItems;
