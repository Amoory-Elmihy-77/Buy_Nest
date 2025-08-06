import type { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@util";
import axios from "axios";
import type { RootState } from "@store/store";

type TDataType = "productsFullInfo" | "productsIds";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { authSlice } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${authSlice.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return {
          data: [],
          dataType: "empty",
        };
      }
      if (dataType === "productsIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");
        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
