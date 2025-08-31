import { Table, type TableProps } from "antd";
import dayjs from "dayjs";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import TableComponent from "../../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../../components/Grid/GridList";
import type { PickListDetailsGetDTO } from "../../../../@types/DTOs/PickListDetailsGetDTO";

export default function PickListDetailsRecordTable(props: {
  pickListRecords: PickListDetailsRecordGetDTO[];
  record: PickListDetailsGetDTO;
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

  const gridColumns: GridListColumnsProps<PickListDetailsGetDTO> = [
    {
      key: "id",
      label: "PL",
    },
    {
      key: "goodIssue",
      label: "GI",
    },
    {
      key: "ocr",
      label: "OCR",
    },
    {
      key: "remarks",
      label: "Remarks",
    },
    {
      key: "soldTo",
      label: "Sold To",
    },
    {
      key: "deliveredTo",
      label: "Delivered To",
    },
    {
      key: "pickUpBy",
      label: "Pick Up By",
    },
    {
      key: "pONumber",
      label: "PO Number",
    },
    {
      key: "dONumber",
      label: "DO Number",
    },
    {
      key: "salesMan",
      label: "Salesman",
    },
  ];
  return (
    <div>
      <TableComponent<PickListDetailsRecordGetDTO>
        headerTitle="Picklist Details"
        title={() => (
          <GridList<PickListDetailsGetDTO>
            data={record}
            columns={gridColumns}
            cols={3}
          />
        )}
        dataSource={pickListRecords?.filter(
          (p) => p.pickListDetailsId == record?.id
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
