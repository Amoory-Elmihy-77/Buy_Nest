import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "5%" }}
      >
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          How about going back to Home
        </Link>
      </div>
    </Container>
  );
}
