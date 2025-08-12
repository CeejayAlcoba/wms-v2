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

  const gridColums: GridListColumnsProps<ReportInventoryDTO> = [
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
      key: "skuCode",
      label: "SKU",
    },
    {
      key: "proNumber",
      label: "PRO No",
    },
  ];

  return (
    <div>
      <TableComponent<ReportCargoHistoryDTO>
        headerTitle="Inventory Logs"
        title={() => <GridList data={record} columns={gridColums} cols={2} />}
        dataSource={cargoHistories.filter((c) => c.id == record.id)}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
        footer={() => (
          <TableTotalFooter<ReportCargoHistoryDTO>
            data={cargoHistories}
            values={CARGO_HISTORY_TOTAL_FOOTER}
          />
        )}
      />
    </div>
  );
}
