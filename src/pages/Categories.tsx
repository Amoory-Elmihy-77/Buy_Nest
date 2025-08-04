import { GridList, Heading } from "@components/common";
import { Category } from "@components/ecommerce";
import { Loading } from "@components/feedback";
import useCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";

export default function Categories() {
  const { loading, error, records } = useCategories();
  return (
    <Container>
      <Heading title="Categories" />
      <Loading status={loading} error={error} type="category">
        <GridList
          emptyMessage="There is no categories"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
}
