import { Container } from "react-bootstrap";

import styles from "./styles.module.css";
import { Footer, Header } from "@components/common";
const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}></div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
