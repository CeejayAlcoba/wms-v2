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
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { usePrint } from "../../hooks/usePrint";
import { usePDF } from "../../hooks/usePDF";
import DocumentTable from "../Documents/DocumentTable";
import { useSearchParams } from "react-router-dom";
import "./TableComponent.css";

export type TableComponentProps<T extends object = any> = TableProps<T> & {
  indexedColumn?: boolean;
  headerTitle?: string;
  search?: InputProps;
  add?: ButtonProps;
  print?: {
    onBeforePrint?: () => Promise<void>;
    onAfterPrint?: () => Promise<void>;
  } & ButtonProps;
  pdf?: {
    onBeforeDownload?: () => Promise<void>;
    onAfterDownload?: () => Promise<void>;
  } & ButtonProps;
  refetch?: () => void;
};

type PaginationParams = {
  page: string;
  pageSize: string;
};
const { Text } = Typography;

export default function TableComponent<T extends object = any>({
  size = "small",
  indexedColumn = true,
  add,
  print,
  pdf,
  columns,
  headerTitle,
  search,
  refetch,
  ...props
}: TableComponentProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: searchParams.get("page") ?? "1",
    pageSize: searchParams.get("pageSize") ?? "10",
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
            index +
            1 +
            (parseInt(pagination.page) - 1) * parseInt(pagination.pageSize),
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

  const { handlePrint: onPrint, componentRef: refPrint } = usePrint({
    onBeforePrint: print?.onBeforePrint,
    onAfterPrint: print?.onAfterPrint,
    orientation: handleColumnDocument()?.length > 7 ? "landscape" : "portrait",
  });
  const { handleDownloadPDF: onDownloadPdf, componentRef: refPdf } = usePDF({
    onBeforeDownload: pdf?.onBeforeDownload,
    onAfterDownload: pdf?.onAfterDownload,
    orientation: handleColumnDocument()?.length > 5 ? "landscape" : "portrait",
  });

  const handlePrint = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (print?.onChange) {
      await print.onChange(e);
    }
    await onPrint();
  };
  const handleDownloadPDF = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (pdf?.onChange) {
      await pdf.onChange(e);
    }
    await onDownloadPdf(headerTitle);
  };

  useEffect(() => {
    if (!props.pagination) return;
    handleChangePagination();
  }, []);

  const handleChangePagination = ({
    page = "1",
    pageSize = "10",
  }: Partial<PaginationParams> = {}) => {
    const current = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...current,
      page,
      pageSize,
    });

    setPagination({ page, pageSize });
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
              loading={props.loading}
              onClick={add.onClick}
              type="primary"
              icon={<PlusOutlined />}
              {...add}
            >
              {add.children ?? "Add"}
            </Button>
          )}
        </div>
      </div>

      <Table<T>
        columns={handleUpdateColumns()}
        size={size}
        {...props}
        pagination={
          props.pagination == false
            ? false
            : {
                ...props.pagination,
                onChange: (page, pageSize) => {
                  props.pagination &&
                    props.pagination.onChange &&
                    props.pagination.onChange(page, pageSize);
                  handleChangePagination({
                    page: page.toString(),
                    pageSize: pageSize.toString(),
                  });
                },
                showSizeChanger: true,
              }
        }
        scroll={{ x: "max-content" }}
      />
      <DocumentTable<T>
        ref={refPdf}
        size={size}
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        expandable={undefined}
        dataSource={props.dataSource}
        tableLayout="auto"
        columns={handleColumnDocument()}
      />
      <DocumentTable<T>
        ref={refPrint}
        size={size}
        tableLayout="auto"
        className="light-table"
        headerTitle={headerTitle}
        {...props}
        expandable={undefined}
        dataSource={props.dataSource}
        columns={handleColumnDocument()}
      />
    </Card>
  );
}
