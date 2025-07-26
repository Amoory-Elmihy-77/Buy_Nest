import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page NOT Found";
  }

  return (
    <Container className="notFound">
      <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p>
      <Link to="/" replace={true}>
        How about going back to Home
      </Link>
    </Container>
  );
}
