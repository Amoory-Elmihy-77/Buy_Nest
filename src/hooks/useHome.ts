import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetBestProducts,
  productsCleanUp,
} from "@store/products/productsSlice";

export default function useProducts() {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const wishlistItemsId = useAppSelector(
    (state) => state.wishlistSlice.itemsId
  );
  const userAccessToken = useAppSelector(
    (state) => state.authSlice.accessToken
  );
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetBestProducts());
    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, productsFullInfo };
}
