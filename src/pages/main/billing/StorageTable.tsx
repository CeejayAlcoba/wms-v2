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

export const handleGetStorageColumns = (
  storage: BillingStorageDTO | undefined
): TableProps<StorageDetails>["columns"] => {
  return [
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
      title: `IN (${storage?.totals?.billType})`,
      dataIndex: "inValue",
      key: "inValue",
    },
    {
      title: `OUT (${storage?.totals?.billType})`,
      dataIndex: "outValue",
      key: "outValue",
    },
    {
      title: `BAL (${storage?.totals?.billType})`,
      dataIndex: "balanceValue",
      key: "balanceValue",
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
      title: "",
      dataIndex: "bill",
      key: "bill",
      render: (value: number) => handleMoney(value, false),
    },
  ];
};

export default function StorageTable(props: StorageTableProps) {
  const { storage, ...rest } = props;

  const gridfooter: GridListColumnsProps<StorageTotals> = [
    {
      key: "storageRate",
      label: "Rate",
      render: (_, record) => {
        return (
          <span>
            {handleMoney(record?.storageRate)}/{record?.billType}/day
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
        columns={handleGetStorageColumns(storage)}
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
