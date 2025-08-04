import Logo from "@assets/svg/cart.svg?react";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import { HeaderCounter } from "@components/common";

export default function HeaderBasket() {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <HeaderCounter
      totalQuantity={totalQuantity}
      title="Cart"
      to="/cart"
      svgIcon={<Logo />}
    />
  );
}
