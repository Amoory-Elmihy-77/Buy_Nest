import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { Product } from "@components/ecommerce";
import { Col, Container, Row } from "react-bootstrap";

export default function Products() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { records } = useAppSelector((state) => state.productsSlice);
  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);
  const allProducts =
    records.length > 0
      ? records.map((rec) => {
          return (
            <Col
              key={rec.id}
              xs={6}
              md={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              <Product {...rec} />
            </Col>
          );
        })
      : "There is no Product";
  return (
    <Container>
      <Row>{allProducts}</Row>
    </Container>
  );
}
