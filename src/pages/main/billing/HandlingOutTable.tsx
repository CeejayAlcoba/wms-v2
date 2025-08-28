import { Typography, type TableProps } from "antd";
import type {
  BillingHandlingOutDTO,
  HandlingOutDetails,
  HandlingOutTotals,
} from "../../../@types/DTOs/BillingHandlingOutDTO";
import TableComponent, {
  type TableComponentProps,
} from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import { handleRoundOff } from "../../../utils/handleRoundOff";

type HandlingOutTableProps = {
  handlingOut?: BillingHandlingOutDTO;
} & TableComponentProps<HandlingOutDetails>;

const { Text } = Typography;

export default function HandlingOutTable(props: HandlingOutTableProps) {
  const { handlingOut, ...rest } = props;
  const columns: TableProps<HandlingOutDetails>["columns"] = [
    {
      title: "DATE",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (value: Date) => value && dayjs(value).format("DD-MMM-YY"),
    },
    {
      title: "OCR",
      dataIndex: "ocrNumber",
      key: "ocrNumber",
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
  const gridfooter: GridListColumnsProps<HandlingOutTotals> = [
    {
      key: "total",
      render: (_, record) => {
        return (
          <>
            <strong>Total {record?.billType} : </strong>
            <span>{handleRoundOff(record?.total)}</span>
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
            {handleMoney(record?.handlingOutRate)}/{record?.billType}
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
      <TableComponent<HandlingOutDetails>
        indexedColumn={false}
        pagination={false}
        headerTitle="Handling Out"
        columns={columns}
        dataSource={handlingOut?.details ?? []}
        footer={() => (
          <GridList<HandlingOutTotals>
            gutter={3}
            data={
              handlingOut?.totals ?? {
                handlingOutRate: 0,
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
