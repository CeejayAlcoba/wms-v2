import {
  FilePdfOutlined,
  PlusOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Table,
  Tooltip,
  Typography,
  type ButtonProps,
  type InputProps,
} from "antd";
import type { TableProps } from "antd/es/table";
import { useMemo } from "react";
import { debounce } from "lodash";
import useDocument from "../../contexts/useDocument";
import { usePrint } from "../../hooks/usePrint";
import { usePDF } from "../../hooks/usePDF";
import DocumentTable from "../Documents/DocumentTable";

export type TableComponentProps<T extends object = any> = TableProps<T> & {
  indexedColumn?: boolean;
  headerTitle?: string;
  search?: InputProps;
  add?: ButtonProps;
  print?: ButtonProps;
  pdf?: ButtonProps;
};

const { Text } = Typography;

export default function TableComponent<T extends object = any>(
  props: TableComponentProps<T>
) {
  const initialProps: TableComponentProps<T> = {
    size: "small",
    indexedColumn: true,
    ...props,
  };
  const {
    headerTitle,
    search,
    indexedColumn,
    add,
    print,
    pdf,
    columns,
    ...rest
  } = initialProps;

  const {
    setColumns,
    setData,
    handleDelay,
    columns: docColumns,
  } = useDocument();
  const { handlePrint: onPrint, componentRef: refPrint } = usePrint();
  const { handleDownloadPDF: onDownloadPdf, componentRef: refPdf } = usePDF();
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
          render: (__, _, index) => index + 1,
        },
        ...newColumns,
      ];
    }

    return newColumns.map((col) => ({
      ...col,
      render: (data: any, record: T, index: number) =>
        col.render
          ? col.render(data, record, index) ?? <Text type="secondary">N/A</Text>
          : data || <Text type="secondary">N/A</Text>,
    }));
  };

  const handleColumnDocument = () => {
    return handleUpdateColumns().filter(
      (h) => h.title != "Action" && h.title != "#"
    );
  };

  const handlePrint = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (print?.onChange) {
      print.onChange(e);
    } else {
      setData([...(rest.dataSource ?? [])]);
    }
    await handleDelay({
      fn: () => onPrint(),
    });
  };
  const handleDownloadPDF = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (pdf?.onChange) {
      pdf.onChange(e);
    } else {
      setData([...(rest.dataSource ?? [])]);
    }
    await handleDelay({
      fn: () => onDownloadPdf(headerTitle),
    });
  };

  return (
    <Card style={{ margin: 0 }}>
      <div className="row align-items-center mb-3">
        <div className="col-lg-6">
          {headerTitle && <h6 className="mb-0">{headerTitle}</h6>}
        </div>

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

          <Tooltip title="Download PDF">
            <Button
              variant="outlined"
              color="danger"
              onClick={handleDownloadPDF}
              icon={<FilePdfOutlined />}
            />
          </Tooltip>
          <Tooltip title="Print">
            <Button
              loading={props.loading}
              variant="outlined"
              color="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrint}
            />
          </Tooltip>

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
        pagination={{
          showSizeChanger: true,
          ...rest.pagination,
        }}
        scroll={{ x: "max-content" }}
      />
      <DocumentTable<T>
        ref={refPdf}
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        columns={handleColumnDocument()}
      />
      <DocumentTable<T>
        ref={refPrint}
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        columns={handleColumnDocument()}
      />
    </Card>
  );
}
