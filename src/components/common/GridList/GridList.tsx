import { Col, Row } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type hasId = {
  id?: number;
};

export default function GridList<T extends hasId>({
  records,
  renderItem,
}: TGridListProps<T>) {
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
              {renderItem(rec)}
            </Col>
          );
        })
      : "Categories Not Found";
  return <Row>{allCategories}</Row>;
}
