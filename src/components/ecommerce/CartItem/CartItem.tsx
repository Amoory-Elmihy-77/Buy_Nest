import type { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem, cartItemSelection } = styles;

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
  // render list
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
      <ProductInfo title={title} price={price} img={img} direction="column">
        <Button
          variant="secondary"
          style={{ color: "white", width: "100px" }}
          className="mt-auto"
          onClick={() => removeItemHandler(id)}
        >
          Remove
        </Button>
      </ProductInfo>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity} onChange={changeQuantity}>
          {renderQuan}
        </Form.Select>
      </div>
    </div>
  );
}
