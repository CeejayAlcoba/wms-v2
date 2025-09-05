import DocumentLayout from "../../../../components/Documents/DocumentLayout";
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

type IndexDoumentProps = {
  billing: BillingDTO | null;
  ref: React.Ref<HTMLDivElement> | undefined;
};

export default function DoumentLayout(props: IndexDoumentProps) {
  const { billing, ref } = props;
  const handlingInContent: ContentType[] =
    billing?.handlingIn?.details?.map((c) => ({
      date: c?.actualCheckInDate,
      particulars: [
        <div>{c?.icrReferenceNumber}</div>,
        <div>{c?.quantity}</div>,
        <div>{c?.cubicMeter}</div>,
        <div className={`${c?.totalCbmPerDay == 1 && "text-danger"}`}>
          {c?.totalCbmPerDay || ""}
        </div>,
      ],
    })) ?? [];

  const handlingOutContent: ContentType[] =
    billing?.handlingOut?.details?.map((c) => ({
      date: c?.pullOutDate,
      particulars: [
        <div>{c?.ocrNumber}</div>,
        <div>{c?.quantity}</div>,
        <div>{c?.cubicMeter}</div>,
        <div className={`${c?.totalCbmPerDay == 1 && "text-danger"}`}>
          {c?.totalCbmPerDay || ""}
        </div>,
      ],
    })) ?? [];

  const storageContent: ContentType[] =
    billing?.storage?.details?.map((c) => ({
      date: c?.transDate,
      particulars: [
        <div>{c?.inCbm}</div>,
        <div>{c?.outCbm}</div>,
        <div>{c?.quantity}</div>,
        <div className="text-success">{c?.balanceCbm || ""}</div>,
        <div style={{width:100}}> {dayjs(c.cutOff).format("DD-MMM-YY")}</div>,
        <div > {c.noOfDays}</div>,
        <div> {handleMoney(c.bill)}</div>,
      ],
    })) ?? [];

  const handleDecimalText = () => {
    const amount = billing?.vatableAmount ?? 0;
    const decimal = (amount % 1).toFixed(2).split(".")[1];

    return decimal === "00" ? "ONLY" : `AND ${decimal}/100 ONLY`;
  };
  return (
    <div className="bg-light" style={{fontSize:11}}>
      <DocumentLayout ref={ref} headerTitle="BILLING STATEMENT">
        <BillingTableHeader record={billing?.billingStatement as BillingStatementDTO}/>
        <table className="table table-bordered mt-2">
          <TableHeaderLayout />
          <tbody>
            <BodyLayout
              particular={{
                headers: [
                  <strong className="text-danger">ICR</strong>,
                  <strong className="text-danger">QTY</strong>,
                  <strong className="text-danger"> CBM</strong>,
                  <strong className="text-danger"> ADJ</strong>,
                ],
                contents: handlingInContent,
              }}
              footer={
                <div className="d-flex justify-content-around fw-bold">
                  <div>HANDLING IN CHARGES</div>
                  <div>
                    {billing?.handlingIn?.totals?.total}{" "}
                    {billing?.handlingIn?.totals?.billType}
                  </div>
                  <div>
                    {handleMoney(billing?.handlingIn?.totals?.handlingInRate)}/
                    {billing?.handlingIn?.totals?.billType}
                  </div>
                  <div>{handleMoney(billing?.handlingIn?.totals?.bill)}</div>
                </div>
              }
            />
            <BodyLayout
              particular={{
                headers: [
                  <strong className="text-danger">OCR</strong>,
                  <strong className="text-danger">QTY</strong>,
                  <strong className="text-danger"> CBM</strong>,
                  <strong className="text-danger"> ADJ</strong>,
                ],
                contents: handlingOutContent,
              }}
              footer={
                <div className="d-flex justify-content-around fw-bold">
                  <div>HANDLING OUT CHARGES</div>
                  <div>
                    {billing?.handlingOut?.totals?.total}{" "}
                    {billing?.handlingOut?.totals?.billType}
                  </div>
                  <div>
                    {handleMoney(billing?.handlingOut?.totals?.handlingOutRate)}
                    /{billing?.handlingOut?.totals?.billType}
                  </div>
                  <div>{handleMoney(billing?.handlingOut?.totals?.bill)}</div>
                </div>
              }
            />
            <BodyLayout
              particular={{
                headers: [
                  <strong className="text-danger">IN (cbm)</strong>,
                  <strong className="text-danger">OUT (cbm)</strong>,
                  <strong className="text-danger"> QTY</strong>,
                  <strong className="text-danger"> BAL (cbm)</strong>,
                  <strong  className="text-danger"> CUT OFF</strong>,
                  <strong className="text-danger"> # of days</strong>,
                  <div></div>,
                ],
                contents: storageContent,
              }}
              footer={
                <div className="d-flex justify-content-center gap-2 fw-bold">
                  <div>STORAGE CHARGES</div>
                  <div>
                    (
                    {handleFormatDateRange(
                      billing?.billingStatement?.dateFrom,
                      billing?.billingStatement?.dateTo
                    )}
                    )
                  </div>
                  <div>
                    {handleMoney(billing?.storage?.totals?.storageRate)}/
                    {billing?.storage?.totals?.billType}
                  </div>
                </div>
              }
            />
          </tbody>
        </table>
        <OtherServicesTable
          style={{fontSize:12}}
          forPrinting={true}
          record={billing?.billingStatement as BillingStatementDTO}
          otherServices={billing?.billingStatement?.otherServiceBills ?? []}
        />
        <BillingFooter
          billing={billing}
          className="bg-light text-dark border"
        />
        <div className="text-dark fw-bold mb-2">
          <span>Total Amount Due </span>
          <span className="text-uppercase">
            {handleNumberToWords(Math.floor(billing?.vatableAmount ?? 0))}{" "}
            {handleDecimalText()}
          </span>
        </div>
        <SignatoriesLayout signatories={billing?.signatoriesConfigs}/>
      </DocumentLayout>
    </div>
  );
}
