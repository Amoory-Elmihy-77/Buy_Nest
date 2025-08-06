import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { axiosErrorHandler } from "@util";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { authSlice } = getState() as RootState;
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${authSlice.user?.id}&productId=${id}`
      );
      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post(`/wishlist`, {
          userId: authSlice.user?.id,
          productId: id,
        });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
