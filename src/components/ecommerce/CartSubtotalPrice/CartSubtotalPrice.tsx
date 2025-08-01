import type { TProduct } from "@customTypes/product";
import styles from "./styles.module.css";

type TCartSubtotalPriceProps = { products: TProduct[] };

const CartSubtotalPrice = ({ products }: TCartSubtotalPriceProps) => {
  const subtotal = products.reduce((accumelator, el) => {
    const quantity = el.quantity as number;
    const price = +el.price;
    return accumelator + price * quantity;
  }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal} EGP</span>
    </div>
  );
};

export default CartSubtotalPrice;
