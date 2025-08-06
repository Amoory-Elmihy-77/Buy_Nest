import type { TProduct } from "./product.types";

export type TOrder = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
