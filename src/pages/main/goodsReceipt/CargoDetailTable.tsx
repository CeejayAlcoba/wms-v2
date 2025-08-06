import { Table, type TableProps } from "antd";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";

export default function CargoDetailTable(props: {
  cargoDetails: CargoDetails[];
}) {
  const { cargoDetails } = props;

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
  return (
    <div className="m-2">
      <Table<CargoDetails>
        dataSource={cargoDetails}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
      />
    </div>
  );
}
