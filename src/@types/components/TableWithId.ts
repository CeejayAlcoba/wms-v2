import type { TableColumnProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

export type TableWithId<T = any> = {
  id: number;
  columns: TableProps<T>["columns"];
  dataSource: readonly T[] | undefined;
};
