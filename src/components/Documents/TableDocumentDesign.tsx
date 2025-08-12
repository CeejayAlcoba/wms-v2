import { Table, type TableProps } from "antd";
import useDocument from "../../contexts/useDocument";
import "./TableDocumentDesign.css";

export default function TableDocumentDesign(props: TableProps) {
  const { data, columns, title, contentRef } = useDocument();

  return (
    <div className="d-none">
      <div ref={contentRef} className="print-container">
        {title && <h5 className="print-title">{title}</h5>}

        <Table
          title={props.title}
          footer={props.footer}
          className="light-table"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size={"small"}
          rowKey={(record, index) => (record as any).id || index?.toString()}
        />
      </div>
    </div>
  );
}
