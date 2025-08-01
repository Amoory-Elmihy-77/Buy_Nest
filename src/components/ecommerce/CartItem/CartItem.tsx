import type { TProduct } from "@customTypes/product";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItem = TProduct & {
  changeQuanHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
export default function CartItem({
  id,
  title,
  img,
  price,
  max,
  quantity,
  changeQuanHandler,
  removeItemHandler,
}: TCartItem) {
  const renderQuan = Array(max)
    .fill(0)
    .map((_, idx) => {
      const quan = ++idx;
      return (
        <option value={quan} key={quan}>
          {quan}
        </option>
      );
    });
  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuanHandler(id, quantity);
  };
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img width={120} src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity} onChange={changeQuantity}>
          {renderQuan}
        </Form.Select>
      </div>
    </div>
  );
}
