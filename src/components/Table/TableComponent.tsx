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
import { usePrint } from "../../hooks/usePrint";
import { usePDF } from "../../hooks/usePDF";
import DocumentTable from "../Documents/DocumentTable";

export type TableComponentProps<T extends object = any> = TableProps<T> & {
  indexedColumn?: boolean;
  headerTitle?: string;
  search?: InputProps;
  add?: ButtonProps;
  print?: { onBeforePrint?: () => Promise<void> } & ButtonProps;
  pdf?: { onBeforeDownload?: () => Promise<void> } & ButtonProps;
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

  const { handlePrint: onPrint, componentRef: refPrint } = usePrint({
    onBeforePrint: print?.onBeforePrint,
  });
  const { handleDownloadPDF: onDownloadPdf, componentRef: refPdf } = usePDF({
    onBeforeDownload: pdf?.onBeforeDownload,
  });
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
          render: (__, _, index) =>
            props.pagination && props.pagination.onChange
              ? ((props.pagination.current ?? 0) - 1) *
                  (props.pagination.pageSize ?? 0) +
                index +
                1
              : index + 1,
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
      await onPrint();
    }
  };
  const handleDownloadPDF = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (pdf?.onChange) {
      pdf.onChange(e);
    } else {
      onDownloadPdf(headerTitle);
    }
  };

  return (
    <Card style={{ margin: 0, padding: 0 }}>
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
              loading={props.loading}
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
        columns={handleUpdateColumns()}
        {...rest}
        pagination={
          rest.pagination == false
            ? false
            : {
                showSizeChanger: true,
                ...rest.pagination,
              }
        }
        scroll={{ x: "max-content" }}
      />
      <DocumentTable<T>
        ref={refPdf}
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        expandable={undefined}
        dataSource={rest.dataSource}
        columns={handleColumnDocument()}
      />
      <DocumentTable<T>
        ref={refPrint}
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        expandable={undefined}
        dataSource={rest.dataSource}
        columns={handleColumnDocument()}
      />
    </Card>
  );
}
