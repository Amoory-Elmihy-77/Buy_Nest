import { Category } from "@components/ecommerce";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Categories() {
  // const [allCategories, setAllCategories] = useState([]);
  const { records } = useAppSelector((state) => state.categoriesSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!records.length) dispatch(actGetCategories());
  }, [dispatch, records]);
  const allCategories =
    records.length > 0
      ? records.map((rec) => {
          return (
            <Col
              key={rec.id}
              xs={6}
              md={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              <Category {...rec} />
            </Col>
          );
        })
      : "Categories Not Found";
  return (
    <Container>
      <Row>{allCategories}</Row>
    </Container>
  );
}
