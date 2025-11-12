import { type TableProps } from "antd";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import TableComponent from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import type { BookingDetailsDTO } from "../../../@types/DTOs/BookingDetailsDTO";

export default function CargoDetailTable(props: {
  cargoDetails: CargoDetails[];
  record: BookingDetailsDTO;
}) {
  const { cargoDetails, record } = props;

  const columns: TableProps<CargoDetails>["columns"] = [
    { title: "SKU Code", dataIndex: "skuCode", key: "skuCode" },
    { title: "PRO Number", dataIndex: "proNumber", key: "proNumber" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Delivery Note", dataIndex: "deliveryNote", key: "deliveryNote" },
    { title: "Batch No", dataIndex: "batchNo", key: "batchNo" },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (date: Date | null) =>
        date ? new Date(date).toLocaleDateString() : "",
    },
    { title: "Pallet Count", dataIndex: "palleteCount", key: "palleteCount" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Dimensions  (L × W × H)",
      dataIndex: "",
      key: "dimensions",
      render: (_, record) =>
        `${record.lengthCm} x ${record.widthCm} x ${record.heightCm}`,
    },
    { title: "Cubic Meter", dataIndex: "cubicMeter", key: "cubicMeter" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
  ];
  const titleColumns: GridListColumnsProps<BookingDetailsDTO> = [
    {
      key: "actualCheckInDate",
      label: "Actual Check In Date",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      key: "icrReferenceNumber",
      label: "ICR",
    },
    {
      key: "drNumber",
      label: "DR",
    },
    {
      key: "principal",
      label: "Principal",
    },
    {
      key: "productCategory",
      label: "Product Category",
    },
  ];
  return (
    <div>
      <TableComponent<CargoDetails>
        dataSource={cargoDetails.filter((c) => c.bookingDetailsId == record.id)}
        title={() => (
          <GridList<BookingDetailsDTO> columns={titleColumns} data={record} />
        )}
        indexedColumn={false}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
      />
    </div>
  );
}
