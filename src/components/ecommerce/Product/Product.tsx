import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
const { product, productImg, maximumNotice } = styles;

const Product = memo(({ id, img, title, price, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const currentRemainingQuan = max - (quantity ?? 0);
  const isQunaReachToMax = currentRemainingQuan <= 0 ? true : false;
  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
  };
  useEffect(() => {
    if (!isDisabled) return;
    setIsDisabled(true);

    const debounce = setTimeout(() => {
      setIsDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isDisabled]);
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <h3 className={maximumNotice}>
        {isQunaReachToMax
          ? "sold out"
          : `You can add ${currentRemainingQuan} item[s]`}
      </h3>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
        disabled={isDisabled || isQunaReachToMax}
      >
        {isDisabled ? (
          <>
            <Spinner
              style={{ marginRight: "4px" }}
              animation="border"
              size="sm"
            />
            Loading...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
