import { type TableProps } from "antd";
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
import type { ServiceFieldDTO } from "../../../@types/DTOs/ServiceFieldDTO";
import BoostrapTable from "../../../components/Table/BoostrapTable";
import dayjs from "dayjs";

type OtherServicesTableProps = {
  forPrinting?: boolean;
  otherServices: OtherServiceBillDTO[];
  record?: BillingStatementDTO;
} & TableComponentProps<GroupBillType>;

export default function OtherServicesTable({
  otherServices,
  forPrinting = false,
  record,
  ...rest
}: OtherServicesTableProps) {
  const columns: TableProps<GroupBillType>["columns"] = [
    {
      dataIndex: "values",
      key: "values",
      render: (values: ServiceFieldDTO[], record) => {
        if (!values || values.length === 0)
          return <span className="text-muted">No Data</span>;

        return (
          <div className="text-center align-middle p-1">
            <div className="fw-bold text-uppercase">{record.service}</div>
            <div className="row fw-bold text-danger border-bottom">
              <div className="col">Date</div>
              {values[0].fields.map((field, idx) => (
                <div key={idx} className="col">
                  {field.name}
                </div>
              ))}
              <div className="col">Amount</div>
            </div>

            {values.map((dto, rowIdx) => (
              <div key={rowIdx} className="row border-bottom">
                <div className="col">
                  {dto.date && dayjs(dto.date).format("DD-MMM-YY")}
                </div>
                {dto.fields.map((field, colIdx) => (
                  <div key={colIdx} className="col">
                    {field.value ?? "-"}
                  </div>
                ))}
                <div className="col">{handleMoney(dto.amount ?? 0)}</div>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => (
        <div>
          <div className="text-danger fw-bold d-flex justify-content-center mt-3">
            Total
          </div>
          <div
            style={{
              height: "90%",
            }}
            className=" d-flex justify-content-center align-items-end"
          >
            {handleMoney(totalAmount)}
          </div>
        </div>
      ),
    },
  ];

  if (forPrinting)
    return (
      <BoostrapTable<GroupBillType>
        {...rest}
        columns={columns}
        dataSource={handleGroupOtherServices(otherServices, record)}
      />
    );

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
