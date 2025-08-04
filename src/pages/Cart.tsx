import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import useCart from "@hooks/useCart";

export default function Cart() {
  const { loading, error, products, changeQuanHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title="Cart" />
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
