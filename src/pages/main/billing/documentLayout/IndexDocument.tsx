import type { BillingDTO } from "../../../../@types/DTOs/BillingDTO";
import BodyLayout, { type ContentType } from "./BodyLayout";
import { handleMoney } from "../../../../utils/handleMoney";
import dayjs from "dayjs";
import handleFormatDateRange from "../../../../utils/handleFormatDateRange";
import OtherServicesTable from "../../otherServiceBill/OtherServicesTable";
import type { BillingStatementDTO } from "../../../../@types/DTOs/BillingStatementDTO";
import BillingFooter from "../BillingFooter";
import TableHeaderLayout from "./TableHeaderLayout";
import handleNumberToWords from "../../../../utils/handleNumberToWords";
import BillingTableHeader from "../BillingTableHeader";
import SignatoriesLayout from "./SignatoriesLayout";
import DocumentLayout from "../../../../components/Documents/DocumentLayout";
import { Typography } from "antd";
import { handleGetStorageColumns } from "../StorageTable";
import { handleGetHandlingOutColumns } from "../HandlingOutTable";
import { handleGetHandlingInColumns } from "../HandlingInTable";

type IndexDocumentProps = {
  billing: BillingDTO | null;
  ref: React.Ref<HTMLDivElement> | undefined;
};
const { Text } = Typography;

export default function IndexDocumentLayout(props: IndexDocumentProps) {
  const { billing, ref } = props;

  const handleDecimalText = () => {
    const amount = billing?.vatableAmount ?? 0;
    const decimal = (amount % 1).toFixed(2).split(".")[1];

    return decimal === "00" ? "ONLY" : `AND ${decimal}/100 ONLY`;
  };

  return (
    <div className="bg-light d-none" style={{ fontSize: 11 }}>
      <div></div>
      <DocumentLayout ref={ref}>
        <span className="d-flex justify-content-end mr-2">
          REF:{" "}
          <span className="text-danger">
            {billing?.billingStatement?.referenceNumber}
          </span>
        </span>
        <div className="d-flex justify-content-center">
          <Text
            style={{ fontSize: "25px", color: "black", fontWeight: "bold" }}
          >
            BILLING STATEMENT
          </Text>
        </div>

        <BillingTableHeader
          record={billing?.billingStatement as BillingStatementDTO}
        />
        <TableHeaderLayout />

        {/* HANDLING IN */}
        <BodyLayout
          columns={handleGetHandlingInColumns(billing?.handlingIn)}
          data={billing?.handlingIn?.details}
          titleHeader="HANDLING IN CHARGES"
          totalCbmPallete={
            <div>
              {billing?.handlingIn?.totals?.total}{" "}
              {billing?.handlingIn?.totals?.billType}
            </div>
          }
          rate={
            <div>
              {handleMoney(billing?.handlingIn?.totals?.handlingInRate)}/
              {billing?.handlingIn?.totals?.billType}
            </div>
          }
          bill={<div>{handleMoney(billing?.handlingIn?.totals?.bill)}</div>}
        />

        {/* HANDLING OUT */}
        <BodyLayout
          columns={handleGetHandlingOutColumns(billing?.handlingOut)}
          data={billing?.handlingOut?.details}
          titleHeader="HANDLING OUT CHARGES"
          totalCbmPallete={
            <div>
              {billing?.handlingOut?.totals?.total}{" "}
              {billing?.handlingOut?.totals?.billType}
            </div>
          }
          rate={
            <div>
              {handleMoney(billing?.handlingOut?.totals?.handlingOutRate)}/
              {billing?.handlingOut?.totals?.billType}
            </div>
          }
          bill={<div>{handleMoney(billing?.handlingOut?.totals?.bill)}</div>}
        />

        {/* STORAGE */}
        <BodyLayout
          columns={handleGetStorageColumns(billing?.storage)}
          data={billing?.storage?.details}
          titleFooter={
            <div className="d-flex justify-content-center gap-2 fw-bold">
              <div>STORAGE CHARGES</div>
            </div>
          }
          totalCbmPallete={
            <div>
              (
              {handleFormatDateRange(
                billing?.billingStatement?.dateFrom,
                billing?.billingStatement?.dateTo
              )}
              )
            </div>
          }
        />

        <OtherServicesTable
          style={{ fontSize: 12 }}
          forPrinting={true}
          record={billing?.billingStatement as BillingStatementDTO}
          otherServices={billing?.billingStatement?.otherServiceBills ?? []}
        />
        <BillingFooter billing={billing} />
        <div className="text-dark fw-bold mb-2">
          <span>Total Amount Due </span>
          <span className="text-uppercase">
            {handleNumberToWords(Math.floor(billing?.vatableAmount ?? 0))}{" "}
            {handleDecimalText()}
          </span>
        </div>
        <SignatoriesLayout signatories={billing?.signatoriesConfigs} />
      </DocumentLayout>
    </div>
  );
}
