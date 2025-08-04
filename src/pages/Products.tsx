import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import useProducts from "@hooks/useProducts";

export default function Products() {
  const { loading, error, paramsPerfix, productsFullInfo } = useProducts();
  return (
    <Container>
      <Heading title={`${paramsPerfix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type={"product"}>
        <GridList
          emptyMessage="there is no products"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
}
