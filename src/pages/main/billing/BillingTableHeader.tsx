import dayjs from "dayjs";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../components/Grid/GridList";

type BillingTableHeaderProps = {
  record?: BillingStatementDTO;
};
export default function BillingTableHeader({
  record,
}: BillingTableHeaderProps) {
  const gridHeader: GridListColumnsProps<BillingStatementDTO> = [
    {
      key: "dateFrom",
      label: "From",
      render: (value) => dayjs(value).format("DD-MMM-YY"),
    },
    {
      key: "principal",
      label: "Customer",
    },
    {
      key: "dateTo",
      label: "To",
      render: (value) => dayjs(value).format("DD-MMM-YY"),
    },
    {
      key: "principalAddress",
      label: "Address",
    },
    {
      key: "referenceNumber",
      label: "Ref No",
    },
    {
      key: "productCategory",
      label: "Commodity",
    },
  ];
  return (
    <>
      <GridList<BillingStatementDTO>
        data={record}
        columns={gridHeader}
        cols={2}
      />
    </>
  );
}
