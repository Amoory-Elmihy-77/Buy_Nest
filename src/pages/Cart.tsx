import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import {
  actGetProductsByItems,
  cartItemChangeQuan,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  useEffect(() => {
    dispatch(actGetProductsByItems());
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

  return (
    <>
      <Heading>Cart</Heading>
      <Loading status={loading} error={error}>
        {products.length > 0 ? (
          <>
            <CartItemList
              products={products}
              changeQuanHandler={changeQuanHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <h4 className="text-center">Your Cart is empty</h4>
        )}
      </Loading>
    </>
  );
}
