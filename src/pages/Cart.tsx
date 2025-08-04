import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useCart from "@hooks/useCart";

export default function Cart() {
  const { loading, error, products, changeQuanHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title="Cart" />
      <Loading status={loading} error={error} type="cart">
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
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
}
