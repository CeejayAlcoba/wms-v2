import { Typography, type TableProps } from "antd";

import TableComponent, {
  type TableComponentProps,
} from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import type {
  BillingStorageDTO,
  StorageDetails,
  StorageTotals,
} from "../../../@types/DTOs/BillingStorageDTO";

type StorageTableProps = {
  storage?: BillingStorageDTO;
} & TableComponentProps<StorageDetails>;

const { Text } = Typography;

export default function StorageTable(props: StorageTableProps) {
  const { storage, ...rest } = props;
  const columns: TableProps<StorageDetails>["columns"] = [
    {
      title: "DATE",
      dataIndex: "transDate",
      key: "transDate",
      render: (value: Date) => value && dayjs(value).format("DD-MMM-YY"),
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
      title: "IN (CBM)",
      dataIndex: "inCbm",
      key: "inCbm",
      render: (value: number) =>
        value ? <Text type="success">{value}</Text> : "",
    },
    {
      title: "OUT (CBM)",
      dataIndex: "outCbm",
      key: "outCbm",
      render: (value: number) =>
        value ? <Text type="danger">{value}</Text> : "",
    },
    {
      title: "BAL (CBM)",
      dataIndex: "balanceCbm",
      key: "balanceCbm",
    },
    {
      title: "CUT OFF",
      dataIndex: "cutOff",
      key: "cutOff",
      render: (value: Date) => value && dayjs(value).format("DD-MMM-YY"),
    },
    {
      title: "# of days",
      dataIndex: "noOfDays",
      key: "noOfDays",
    },
    {
      title: "BILL",
      dataIndex: "bill",
      key: "bill",
      render: (value: number) => handleMoney(value),
    },
  ];
  const gridfooter: GridListColumnsProps<StorageTotals> = [
    {
      key: "storageRate",
      label: "Rate",
      render: (_, record) => {
        return (
          <span>
            {handleMoney(record?.storageRate)}/{record?.billType}
          </span>
        );
      },
    },
    {
      key: "totalBill",
      label: "Bill",
      render: (_, record) => {
        return <span>{handleMoney(record?.totalBill)}</span>;
      },
    },
  ];

  return (
    <>
      <TableComponent<StorageDetails>
        indexedColumn={false}
        headerTitle="Storage"
        columns={columns}
        dataSource={storage?.details ?? []}
        footer={() => (
          <GridList<StorageTotals>
            cols={3}
            data={
              storage?.totals ?? {
                storageRate: 0,
                billType: "",
                totalBill: 0,
              }
            }
            columns={gridfooter}
          />
        )}
        pagination={false}
        {...rest}
      />
    </>
  );
}
