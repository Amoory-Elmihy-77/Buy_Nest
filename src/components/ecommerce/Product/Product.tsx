import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import type { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    img,
    title,
    price,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <div className={product}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
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
      </>
    );
  }
);

export default Product;
