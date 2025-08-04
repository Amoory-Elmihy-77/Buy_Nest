import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/ecommerce";
import useWishlist from "@hooks/useWishlist";

export default function Wishlist() {
  const { loading, error, wishlistProductsFullInfo } = useWishlist();
  return (
    <Container>
      <Heading title="Your WishList" />
      <Loading status={loading} error={error} type="product">
        <GridList
          records={wishlistProductsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
}
