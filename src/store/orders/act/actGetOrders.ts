import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { type RootState } from "@store/store";
import { type TOrder } from "@types";

type TResponse = TOrder[];

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { authSlice } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${authSlice.user?.id}`,
        { signal }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
