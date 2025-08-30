import { Table, type TableProps } from "antd";
import "./DocumentTable.css";
import MainLayout from "./MainLayout";
import { type ReactNode } from "react";

type DocumentTableProps<T extends object = any> = {
  headerTitle?: ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
} & TableProps<T>;

export default function DocumentTable<T extends object = any>(
  props: DocumentTableProps<T>
) {
  const { headerTitle, ref, ...rest } = props;
  return (
    <div className="d-none">
      <div ref={ref} className="print-container">
        <MainLayout headerTitle={headerTitle}>
          <Table<T>
            {...rest}
            className="light-table"
            size={"small"}
            pagination={false}
          />
        </MainLayout>
      </div>
    </div>
  );
}
