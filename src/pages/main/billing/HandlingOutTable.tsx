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

export const handleGetHandlingOutColumns = (
  data?: BillingHandlingOutDTO
): TableProps<HandlingOutDetails>["columns"] => {
  const handleBillTypeKey =
    data?.totals?.billType == "CBM" ? "cubicMeter" : "palleteCount";
  return [
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
      title: data?.totals?.billType,
      dataIndex: handleBillTypeKey,
      key: handleBillTypeKey,
    },
    {
      title: "ADJ",
      dataIndex: "totalCbmPerDay",
      key: "totalCbmPerDay",
      render: (value: number, record: HandlingOutDetails) => {
        if (record.isAdjusted && value)
          return (
            <Text style={{ fontSize: 12 }} type="danger">
              {value}
            </Text>
          );
        else if (!value) return <span></span>;
        else return value;
      },
    },
  ];
};

//   {
//     title: "DATE",
//     dataIndex: "pullOutDate",
//     key: "pullOutDate",
//     render: (value: Date) => value && dayjs(value).format("DD-MMM-YY"),
//   },
//   {
//     title: "OCR",
//     dataIndex: "ocrNumber",
//     key: "ocrNumber",
//   },
//   {
//     title: "QTY",
//     dataIndex: "quantity",
//     key: "quantity",
//   },
//   // {
//   //   title: "PALLETE",
//   //   dataIndex: "palleteCount",
//   //   key: "palleteCount",
//   // },
//   {
//     title: "CBM",
//     dataIndex: "cubicMeter",
//     key: "cubicMeter",
//   },
//   {
//     title: "ADJ",
//     dataIndex: "totalCbmPerDay",
//     key: "totalCbmPerDay",
//     render: (value: number, record: HandlingOutDetails) => {
//       if (record.isAdjusted && value)
//         return (
//           <Text style={{ fontSize: 12 }} type="danger">
//             {value}
//           </Text>
//         );
//       else if (!value) return <span></span>;
//       else return value;
//     },
//   },
// ];

export default function HandlingOutTable(props: HandlingOutTableProps) {
  const { handlingOut, ...rest } = props;

  const gridfooter: GridListColumnsProps<HandlingOutTotals> = [
    {
      key: "billType",
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
      key: "handlingOutRate",
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
      key: "bill",
      label: "Bill",
      render: (value) => {
        return <span>{handleMoney(value)}</span>;
      },
    },
  ];
  return (
    <>
      <TableComponent<HandlingOutDetails>
        indexedColumn={false}
        pagination={false}
        headerTitle="Handling Out"
        columns={handleGetHandlingOutColumns(handlingOut)}
        dataSource={handlingOut?.details ?? []}
        footer={() => (
          <GridList<HandlingOutTotals>
            cols={3}
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
