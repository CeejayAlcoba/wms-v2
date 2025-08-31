import { type TableProps } from "antd";

import TableComponent from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import type { OtherServiceBillDTO } from "../../../@types/DTOs/OtherServiceBillDTO";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import { handleMoney } from "../../../utils/handleMoney";

type GroupBillType = {
  service: string;
  formula: string;
  values: string[];
  amounts: number[];
  totalAmount: number;
};

export default function OtherServicesTable(props: {
  otherServices: OtherServiceBillDTO[];
  record: BillingStatementDTO;
}) {
  const { otherServices, record } = props;

  const handleGetGroupBills = (): GroupBillType[] => {
    const data = otherServices.filter((c) => c.billingStatementId == record.id);
    const grouped: Record<string, GroupBillType> = {};

    data.forEach((item) => {
      const key = `${item.serviceConfig?.name}__${item.serviceConfig?.displayFormula}`;

      if (!grouped[key]) {
        grouped[key] = {
          service: item.serviceConfig?.name ?? "",
          formula: item.serviceConfig?.displayFormula ?? "",
          values: [],
          amounts: [],
          totalAmount: 0,
        };
      }

      const valueStr = item.serviceFields
        .map((f) => `${f.name} : ${f.value}`)
        .join(", ");

      grouped[key].values.push(valueStr);
      grouped[key].amounts.push(item.totalAmount ?? 0);
      grouped[key].totalAmount += item.totalAmount ?? 0;
    });

    return Object.values(grouped);
  };

  const columns: TableProps<GroupBillType>["columns"] = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Formula",
      dataIndex: "formula",
      key: "formula",
    },
    {
      title: "Value",
      dataIndex: "values",
      key: "values",
      render: (values: string[]) =>
        values?.map((val, idx) => <div key={idx}>{val}</div>),
    },
    {
      title: "Amount",
      dataIndex: "amounts",
      key: "amounts",
      render: (amounts: number[]) =>
        amounts?.map((amt, idx) => <div key={idx}>{handleMoney(amt)}</div>),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => handleMoney(totalAmount),
    },
  ];

  const gridHeader: GridListColumnsProps<BillingStatementDTO> = [
    {
      key: "dateFrom",
      label: "From",
      render: (value) => dayjs(value).format("DD-MMM-YY"),
    },
    {
      key: "principal",
      label: "Principal",
    },
    {
      key: "dateTo",
      label: "To",
      render: (value) => dayjs(value).format("DD-MMM-YY"),
    },

    {
      key: "productCategory",
      label: "Product",
    },
     {
      key: "referenceNumber",
      label: "Ref No",
    },
  ];

  return (
    <div>
      <TableComponent<GroupBillType>
        indexedColumn={false}
        rowKey="id"
        headerTitle="Other Services"
        title={() => (
          <GridList<BillingStatementDTO>
            data={record}
            columns={gridHeader}
            cols={2}
          />
        )}
        dataSource={handleGetGroupBills()}
        columns={columns}
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
      />
    </div>
  );
}
