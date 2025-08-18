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
  return (
    <div className="d-none">
      <div ref={props.ref} className="print-container">
        <MainLayout headerTitle={props.headerTitle}>
          <Table<T>
            title={props.title}
            footer={props.footer}
            className="light-table"
            columns={props.columns}
            dataSource={props.dataSource}
            pagination={false}
            size={"small"}
            rowKey={(record, index) => (record as any).id || index?.toString()}
          />
        </MainLayout>
      </div>
    </div>
  );
}
