import { Badge, Table, Tag, type TableProps } from "antd";
import type { ReportCargoHistoryDTO } from "../../../@types/DTOs/ReportCargoHistoryDTO";
import TableTotalFooter from "../../../components/Table/TableTotalFooter";
import StatusTag from "./StatusTag";
import { CARGO_HISTORY_TOTAL_FOOTER } from "./__constants__/CARGO_HISTORY_TOTAL_FOOTER";
import TableComponent from "../../../components/Table/TableComponent";
import type { ReportInventoryDTO } from "../../../@types/DTOs/ReportInventoryDTO";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";

export default function CargoHistoryTable(props: {
  cargoHistories: ReportCargoHistoryDTO[];
  record: ReportInventoryDTO;
}) {
  const { cargoHistories, record } = props;

  const columns: TableProps<ReportCargoHistoryDTO>["columns"] = [
    {
      title: "Pull Out Date",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (value) => value && dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Pallet Count",
      dataIndex: "pickListPalleteCount",
      key: "pickListPalleteCount",
    },
    {
      title: "Quantity",
      dataIndex: "pickListQuantity",
      key: "pickListQuantity",
    },
    {
      title: "Cubic Meter",
      dataIndex: "pickListCubicMeter",
      key: "pickListCubicMeter",
    },
    {
      title: "PL No.",
      dataIndex: "pickListDetailsId",
      key: "pickListDetailsId",
      render: (value) => value && `PL-${value}`,
    },
    {
      title: "GI No.",
      dataIndex: "goodIssueDetailsId",
      key: "goodIssueDetailsId",
      render: (value) => value && `GI-${value}`,
    },
    {
      title: "OCR",
      dataIndex: "oCRNumber",
      key: "oCRNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => <StatusTag status={value} />,
    },
  ];

  const gridHeader: GridListColumnsProps<ReportInventoryDTO> = [
    {
      key: "actualCheckInDate",
      label: "Actual Check In Date",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      key: "proNumber",
      label: "PRO No",
    },
    {
      key: "balancePalleteCount",
      label: "Balance Pallete",
    },
    {
      key: "icrReferenceNumber",
      label: "ICR",
    },
    {
      key: "principal",
      label: "Principal",
    },
    {
      key: "balanceQuantity",
      label: "Balance Quantity",
    },
    {
      key: "skuCode",
      label: "SKU",
    },
    {
      key: "productCategory",
      label: "Product Category",
    },
    {
      key: "balanceCubicMeter",
      label: "Balance CBM",
    },
    {
      key: "drNumber",
      label: "DR",
    },
  ];

  const gridFooter: GridListColumnsProps<ReportCargoHistoryDTO> = [
    { key: "totalPickListPalleteCount", label: "Total PL Pallete" },
    { key: "totalIssuedPalleteCount", label: "Total GI Pallete" },
    { key: "totalPickListQuantity", label: "Total PL Quantity" },
    { key: "totalIssuedQuantity", label: "Total GI Quantity" },
    { key: "totalPickListCubicMeter", label: "Total PL CBM" },
    { key: "totalIssuedCubicMeter", label: "Total GI CBM" },
  ];

  return (
    <div>
      <TableComponent<ReportCargoHistoryDTO>
        headerTitle="Inventory Logs"
        title={() => (
          <GridList<ReportInventoryDTO>
            data={record}
            columns={gridHeader}
            cols={3}
          />
        )}
        dataSource={cargoHistories.filter((c) => c.id == record.id)}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
        footer={() => (
          <GridList<ReportCargoHistoryDTO>
            data={cargoHistories?.[0]}
            columns={gridFooter}
            cols={2}
          />
        )}
      />
    </div>
  );
}
