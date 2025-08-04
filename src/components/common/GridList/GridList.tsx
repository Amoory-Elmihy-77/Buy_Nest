import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import { Col, Row } from "react-bootstrap";

type TGridListProps<T> = {
  emptyMessage: string;
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type hasId = {
  id?: number;
};

export default function GridList<T extends hasId>({
  emptyMessage,
  records,
  renderItem,
}: TGridListProps<T>) {
  const allCategories =
    records.length > 0 ? (
      records.map((rec) => {
        return (
          <Col
            key={rec.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(rec)}
          </Col>
        );
      })
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );
  return <Row>{allCategories}</Row>;
}
