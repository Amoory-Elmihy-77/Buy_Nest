import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  productFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const { loading, error, productFullInfo } = useAppSelector(
    (state) => state.wishlistSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const wishlistItemsId = useAppSelector(
    (state) => state.wishlistSlice.itemsId
  );
  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(productFullInfoCleanUp());
    };
  }, [dispatch, wishlistItemsId]);
  const wishlistProductsFullInfo = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));
  return (
    <Container>
      <Heading>Your WishList</Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={wishlistProductsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
}
