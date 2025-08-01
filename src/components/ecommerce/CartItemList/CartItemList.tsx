import type { TProduct } from "@customTypes/product";
import CartItem from "../CartItem/CartItem";

type TCartItemListProps = {
  products: TProduct[];
  changeQuanHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

export default function CartItemList({
  products,
  changeQuanHandler,
  removeItemHandler,
}: TCartItemListProps) {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuanHandler={changeQuanHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <>{renderList}</>;
}
