import { type ReactNode } from "react";
import { Row, Col } from "antd";

export type GridListColumnsProps<T = any> = {
  key: keyof T;
  label: string;
  render?: (value?: any, record?: T, index?: number) => void;
}[];

interface GridListProps<T = any> {
  data: T;
  columns: GridListColumnsProps<T>;
  cols?: number;
  gutter?: number;
}

export function GridList<T = any>(props: GridListProps<T>) {
  const { columns, data, cols = 3, gutter = 16 } = props;

  return (
    <Row gutter={gutter}>
      {columns.map((col, index) => (
        <Col span={24 / cols} key={String(col.key)}>
          <strong>{col.label}: </strong>
          {col?.render
            ? (col.render(data[col.key], data, index) as ReactNode)
            : (data[col.key] as ReactNode)}
        </Col>
      ))}
    </Row>
  );
}
