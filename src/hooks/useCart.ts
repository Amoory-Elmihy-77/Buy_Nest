import {
  actGetProductsByItems,
  cartItemChangeQuan,
  cartItemRemove,
  cleanUpCartItems,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useCallback, useEffect } from "react";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );

  const userAccessToken = useAppSelector(
    (state) => state.authSlice.accessToken
  );

  const placeOrderStatus = useAppSelector((state) => state.ordersSlice.loading);
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      dispatch(cleanUpCartItems());
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => {
    return { ...el, quantity: items[el.id] };
  });

  const changeQuanHandler = (id: number, quantity: number) => {
    dispatch(cartItemChangeQuan({ id, quantity }));
  };

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuan({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = (id: number) => {
    console.log("render");
    dispatch(cartItemRemove({ id }));
  };
  return {
    loading,
    error,
    products,
    changeQuanHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
  };
}
