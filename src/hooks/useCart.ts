import {
  actGetProductsByItems,
  cartItemChangeQuan,
  cartItemRemove,
  cleanUpCartItems,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      dispatch(cleanUpCartItems());
      promise.abort();
    };
  }, [dispatch]);
  const products = productsFullInfo.map((el) => {
    return { ...el, quantity: items[el.id] };
  });

  const changeQuanHandler = (id: number, quantity: number) => {
    dispatch(cartItemChangeQuan({ id, quantity }));
  };
  const removeItemHandler = (id: number) => {
    console.log("render");
    dispatch(cartItemRemove({ id }));
  };
  return { loading, error, products, changeQuanHandler, removeItemHandler };
}
