import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";

export default function Products() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);
  return (
    <Container>
      <Heading>
        <span className="text-capitalize">{params.prefix}</span> Products
      </Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
}
