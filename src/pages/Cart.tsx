import useCart from "@hooks/useCart";
import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

const Cart = () => {
  const {
    loading,
    error,
    products,
    userAccessToken,
    placeOrderStatus,
    changeQuanHandler,
    removeItemHandler,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuanHandler={changeQuanHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
