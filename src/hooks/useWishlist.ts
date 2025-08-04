import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  productFullInfoCleanUp,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

export default function useWishlist() {
  const dispatch = useAppDispatch();
  const { loading, error, productFullInfo } = useAppSelector(
    (state) => state.wishlistSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const wishlistItemsId = useAppSelector(
    (state) => state.wishlistSlice.itemsId
  );
  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      dispatch(productFullInfoCleanUp());
      promise.abort();
    };
  }, [dispatch, wishlistItemsId]);
  const wishlistProductsFullInfo = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));
  return { loading, error, wishlistProductsFullInfo };
}
