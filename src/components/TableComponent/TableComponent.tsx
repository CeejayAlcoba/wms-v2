import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Table,
  type ButtonProps,
  type InputProps,
} from "antd";
import type { TableProps } from "antd/es/table";
import { useMemo } from "react";
import { debounce } from "lodash";

export type TableComponentProps<T extends object = any> = TableProps<T> & {
  indexedColumn?: boolean;
  headerTitle?: string;
  search?: InputProps;
  add?: ButtonProps;
};

export default function TableComponent<T extends object = any>(
  props: TableComponentProps<T>
) {
  const initialProps: TableComponentProps<T> = {
    size: "small",
    indexedColumn: true,
    ...props,
  };
  const { headerTitle, search, indexedColumn, add, columns, ...rest } =
    initialProps;
  const debouncedSearch = useMemo(
    () => debounce(search?.onChange ? search?.onChange : () => {}, 500),
    []
  );
  const handleUpdateColumns = () => {
    let newColumns: TableProps<T>["columns"] = [];
    if (columns) {
      newColumns = columns;
    }
    if (indexedColumn) {
      newColumns = [
        {
          title: "#",
          key: "#",
          render: (data, record, index) => index + 1,
        },
        ...newColumns,
      ];
    }

    return newColumns;
  };

  return (
    <Card>
      <div className="d-flex justify-content-between mb-2">
        <div>{headerTitle && <h6>{headerTitle}</h6>}</div>
        <div className="d-flex gap-1">
          {search && (
            <Input
              {...search}
              addonBefore={<SearchOutlined />}
              onChange={debouncedSearch}
              placeholder="large size"
            />
          )}
          {add && (
            <Button
              {...add}
              onClick={add.onClick}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          )}
        </div>
      </div>

      <Table<T>
        {...rest}
        columns={handleUpdateColumns()}
        pagination={{ showQuickJumper: true, ...rest.pagination }}
      />
    </Card>
  );
}
