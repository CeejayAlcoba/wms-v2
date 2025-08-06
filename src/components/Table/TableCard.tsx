import { Card } from "antd";
import type { TableComponentProps } from "./TableComponent";

export default function TableComponent<T extends object = any>(
  props: TableComponentProps<T>
) {
  return (
    <Card>
      <TableComponent<T> {...props} />
    </Card>
  );
}
