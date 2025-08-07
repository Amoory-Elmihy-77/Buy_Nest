import type { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@util";
import axios from "axios";

type TResponse = TProduct[];

const actGetBestProducts = createAsyncThunk(
  "products/actGetBestProducts",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>(`/products`, { signal });
      return response.data.slice(0, 8);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetBestProducts;
