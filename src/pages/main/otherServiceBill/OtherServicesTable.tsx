import { type TableProps } from "antd";

import TableComponent from "../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";
import dayjs from "dayjs";
import type { OtherServiceBillDTO } from "../../../@types/DTOs/OtherServiceBillDTO";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import type { ServiceConfigDTO } from "../../../@types/DTOs/ServiceConfigDTO";
import { handleMoney } from "../../../utils/handleMoney";

export default function OtherServicesTable(props: {
  otherServices: OtherServiceBillDTO[];
  record: BillingStatementDTO;
}) {
  const { otherServices, record } = props;

  const columns: TableProps<OtherServiceBillDTO>["columns"] = [
    {
      title: "Service",
      dataIndex: "serviceConfig",
      key: "serviceConfig",
      render: (value: ServiceConfigDTO) => value?.name,
    },
    {
      title: "Formula",
      dataIndex: "serviceConfig",
      key: "serviceConfig",
      render: (value: ServiceConfigDTO) => value?.displayFormula,
    },
    {
      title: "Value",
      dataIndex: "serviceFields",
      key: "serviceFields",
      render: (values: RefServiceField[]) =>
        values && values.map((v) => `${v.name} : ${v.value}`).join(", "),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value: number) => handleMoney(value),
    },
  ];

  const gridHeader: GridListColumnsProps<BillingStatementDTO> = [
    {
      key: "dateFrom",
      label: "DateFrom",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      key: "principal",
      label: "Principal",
    },
    {
      key: "dateTo",
      label: "Date To",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },

    {
      key: "productCategory",
      label: "Product",
    },
  ];

  return (
    <div>
      <TableComponent<OtherServiceBillDTO>
        indexedColumn={false}
        rowKey="id"
        headerTitle="Other Services"
        title={() => (
          <GridList<BillingStatementDTO>
            data={record}
            columns={gridHeader}
            gutter={2}
          />
        )}
        dataSource={otherServices.filter(
          (c) => c.billingStatementId == record.id
        )}
        columns={columns}
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
      />
    </div>
  );
}
