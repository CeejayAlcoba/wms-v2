import { Table } from "antd";
import useDocument from "../../contexts/useDocument";
import "./TableDocumentDesign.css";

export default function TableDocumentDesign() {
  const { data, columns, title, contentRef } = useDocument();

  return (
    <div className="d-none">
      <div ref={contentRef} className="print-container">
        {title && <h5 className="print-title">{title}</h5>}

        <Table
          className="light-table"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          rowKey={(record, index) => (record as any).id || index?.toString()}
        />
      </div>
    </div>
  );
}
