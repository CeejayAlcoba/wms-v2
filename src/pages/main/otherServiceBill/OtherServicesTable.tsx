import { Space, Typography, type TableProps } from "antd";
import TableComponent, {
  type TableComponentProps,
} from "../../../components/Table/TableComponent";
import type { OtherServiceBillDTO } from "../../../@types/DTOs/OtherServiceBillDTO";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import { handleMoney } from "../../../utils/handleMoney";
import BillingTableHeader from "../billing/BillingTableHeader";
import handleGroupOtherServices, {
  type GroupBillType,
} from "../../../utils/handleGroupOtherServices";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";

type OtherServicesTableProps = {
  otherServices: OtherServiceBillDTO[];
  record?: BillingStatementDTO;
} & TableComponentProps<GroupBillType>;

const { Text } = Typography;

export default function OtherServicesTable({
  otherServices,
  record,
  ...rest
}: OtherServicesTableProps) {
  const columns: TableProps<GroupBillType>["columns"] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
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
      render: (values: RefServiceField[][], record) => {
        if (!values || values.length === 0)
          return <Text type="secondary">No Data</Text>;

        return (
          <div className={`row row-cols-lg-${values.length}`}>
            {values.flat().map((f, idx) => (
              <div key={idx} className="p-2 border rounded bg-light">
                <div className="fw-bold">{f.name}</div>
                <div>{f.value ?? "-"}</div>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => handleMoney(totalAmount),
    },
  ];

  return (
    <div>
      <TableComponent<GroupBillType>
        indexedColumn={false}
        rowKey="id"
        headerTitle="Other Services"
        title={() => <BillingTableHeader record={record} />}
        dataSource={handleGroupOtherServices(otherServices, record)}
        columns={columns}
        scroll={{ x: "max-content" }}
        bordered
        pagination={false}
        {...rest}
      />
    </div>
  );
}
