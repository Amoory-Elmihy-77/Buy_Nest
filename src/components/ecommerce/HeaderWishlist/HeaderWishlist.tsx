import Logo from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import { HeaderCounter } from "@components/common";

export default function HeaderWishlist() {
  const totalQuantity = useAppSelector((state) => state.wishlistSlice.itemsId);

  return (
    <HeaderCounter
      totalQuantity={totalQuantity.length}
      title="Wishlist"
      to="/wishlist"
      svgIcon={<Logo />}
    />
  );
}
