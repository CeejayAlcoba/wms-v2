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
import PrintTable, {
  type PrintTableProps,
} from "../Documents/Print/PrintTable";
import useDocument from "../../contexts/useDocument";
import DownloadPdfTable from "../Documents/Pdf/PdfTable";
import TableDocumentDesign from "../Documents/TableDocumentDesign";

export type TableComponentProps<T extends object = any> = TableProps<T> & {
  indexedColumn?: boolean;
  headerTitle?: string;
  search?: InputProps;
  add?: ButtonProps;
  print?: PrintTableProps;
};

export default function TableComponent<T extends object = any>(
  props: TableComponentProps<T>
) {
  const initialProps: TableComponentProps<T> = {
    size: "small",
    indexedColumn: true,
    ...props,
  };
  const { headerTitle, search, indexedColumn, add, columns, print, ...rest } =
    initialProps;
  const { setTitle, setColumns, setData, handlePrint, handleDownloadPdf } =
    useDocument();

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

    return newColumns.map((col) => ({
      ...col,
      render: (data: any, record: T, index: number) =>
        col.render
          ? col.render(data, record, index)
          : data || <span className="text-secondary">N/A</span>,
    }));
  };

  const handleColumnDocument = () => {
    return handleUpdateColumns().filter(
      (h) => h.title != "Action" && h.title != "#"
    );
  };
  const handleOnPrint = () => {
    setTitle(headerTitle ?? "");
    setData([...(rest.dataSource ?? [])]);
    setColumns(handleColumnDocument());
    handlePrint();
  };
  const handleOnDownloadPdf = () => {
    setTitle(headerTitle ?? "");
    setData([...(rest.dataSource ?? [])]);
    setColumns(handleColumnDocument());
    handleDownloadPdf();
  };

  return (
    <Card>
      <div className="row align-items-center mb-3">
        {/* Left side: title */}
        <div className="col-lg-6">
          {headerTitle && <h6 className="mb-0">{headerTitle}</h6>}
        </div>

        {/* Right side: search + buttons */}
        <div className="col-lg-6 d-flex justify-content-end gap-2 flex-wrap">
          {search && (
            <Input
              {...search}
              addonBefore={<SearchOutlined />}
              onChange={debouncedSearch}
              placeholder="Search here..."
              style={{ maxWidth: 200 }}
            />
          )}

          <DownloadPdfTable
            onDownload={handleOnDownloadPdf}
            loading={props.loading}
          />
          <PrintTable onPrint={handleOnPrint} loading={props.loading} />

          {add && (
            <Button
              {...add}
              loading={props.loading}
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
        scroll={{ x: "max-content" }}
      />
      <TableDocumentDesign {...rest} />
    </Card>
  );
}
