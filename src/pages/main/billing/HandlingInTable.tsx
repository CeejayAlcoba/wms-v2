import { Typography, type TableProps } from "antd";
import type {
  BillingHandlingInDTO,
  HandlingInDetails,
  HandlingInTotals,
} from "../../../@types/DTOs/BillingHandlingInDTO";
import TableComponent, {
  type TableComponentProps,
} from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";

type HandlingInTableProps = {
  handlingIn?: BillingHandlingInDTO;
} & TableComponentProps<HandlingInDetails>;

const { Text } = Typography;

export default function HandlingInTable(props: HandlingInTableProps) {
  const { handlingIn, ...rest } = props;
  const columns: TableProps<HandlingInDetails>["columns"] = [
    {
      title: "DATE",
      dataIndex: "actualCheckInDate",
      key: "actualCheckInDate",
      render: (value: Date) => value && dayjs(value).format("DD-MMM-YY"),
    },
    {
      title: "ICR",
      dataIndex: "icrReferenceNumber",
      key: "icrReferenceNumber",
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "PALLETE",
      dataIndex: "palleteCount",
      key: "palleteCount",
    },
    {
      title: "CBM",
      dataIndex: "cubicMeter",
      key: "cubicMeter",
    },
    {
      title: "Total CBM/Day",
      dataIndex: "totalCbmPerDay",
      key: "totalCbmPerDay",
      render: (value: number) => {
        if (value == 1) return <Text type="danger">{value}</Text>;
        else if (!value) return <span></span>;
        else return value;
      },
    },
  ];
  const gridfooter: GridListColumnsProps<HandlingInTotals> = [
    {
      key: "total",
      render: (_, record) => {
        return (
          <>
            <strong>Total {record?.billType} : </strong>
            <span>{record?.total}</span>
          </>
        );
      },
    },
    {
      key: "total",
      label: "Rate",
      render: (_, record) => {
        return (
          <span>
            {handleMoney(record?.handlingInRate)}/{record?.billType}
          </span>
        );
      },
    },
    {
      key: "total",
      label: "Bill",
      render: (_, record) => {
        return <span>{handleMoney(record?.bill)}</span>;
      },
    },
  ];
  return (
    <>
      <TableComponent<HandlingInDetails>
        indexedColumn={false}
        headerTitle="Handling In"
        columns={columns}
        dataSource={handlingIn?.details ?? []}
        pagination={false}
        footer={() => (
          <GridList<HandlingInTotals>
            cols={3}
            data={
              handlingIn?.totals ?? {
                handlingInRate: 0,
                billType: "",
                total: 0,
                bill: 0,
              }
            }
            columns={gridfooter}
          />
        )}
        {...rest}
      />
    </>
  );
}
