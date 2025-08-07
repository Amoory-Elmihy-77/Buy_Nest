import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import useHome from "@hooks/useHome";

export default function Home() {
  const { loading, error, productsFullInfo } = useHome();
  return (
    <Container>
      <Heading title={`Best Seller`} />
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
