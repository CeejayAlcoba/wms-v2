import { Table, type TableProps } from "antd";
import dayjs from "dayjs";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import TableComponent from "../../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../../components/Grid/GridList";
import type { GoodIssueDetails } from "../../../../@types/tables/GoodIssueDetails";

export default function PickListDetailsRecordTable(props: {
  pickListRecords: PickListDetailsRecordGetDTO[];
  record: GoodIssueDetails;
}) {
  const { pickListRecords, record } = props;

  const columns: TableProps<PickListDetailsRecordGetDTO>["columns"] = [
    { title: "SKU Code", dataIndex: "skuCode", key: "skuCode" },
    { title: "PRO Number", dataIndex: "proNumber", key: "proNumber" },
    {
      title: "ICR Reference No",
      dataIndex: "icrReferenceNumber",
      key: "icrReferenceNumber",
    },
    { title: "Principal", dataIndex: "principal", key: "principal" },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    { title: "Goods Receipt", dataIndex: "goodsReceipt", key: "goodsReceipt" },
    {
      title: "Pull Out Date",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    {
      title: "Pull Out Date Received",
      dataIndex: "pullOutDateRecieved",
      key: "pullOutDateRecieved",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    {
      title: "Delivery Due Date",
      dataIndex: "deliveryDueDate",
      key: "deliveryDueDate",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cubic Meter", dataIndex: "cubicMeter", key: "cubicMeter" },
    { title: "Pallet Count", dataIndex: "palleteCount", key: "palleteCount" },
  ];

  const gridColumns: GridListColumnsProps<GoodIssueDetails> = [
    {
      key: "id",
      render: (value) => value && `GI-${value}`,
    },
    {
      key: "ocrNumber",
      render: (value) => value && `OCR : ${value}`,
    },
    {
      key: "pickListDetailsId",
      render: (value) => `PL-${value}`,
    },
    {
      key: "dofNumber",
      render: (value) => value && `DOF : ${value}`,
    },
  ];
  return (
    <div>
      <TableComponent<PickListDetailsRecordGetDTO>
        headerTitle="Good Issue"
        title={() => (
          <GridList<GoodIssueDetails>
            data={record}
            columns={gridColumns}
            cols={2}
          />
        )}
        dataSource={pickListRecords?.filter(
          (p) => p.pickListDetailsId == record?.pickListDetailsId
        )}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
      />
    </div>
  );
}
