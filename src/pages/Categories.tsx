import { GridList, Heading } from "@components/common";
import { Category } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

export default function Categories() {
  const { loading, error, records } = useAppSelector(
    (state) => state.categoriesSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!records.length) dispatch(actGetCategories());
  }, [dispatch, records]);
  return (
    <Container>
      <Heading>Categories</Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
}
