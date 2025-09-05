import DocumentLayout from "../../../../components/Documents/DocumentLayout";
import type { BillingDTO } from "../../../../@types/DTOs/BillingDTO";
import InOutLayout, { type ContentType } from "./InOutLayout";
import { handleMoney } from "../../../../utils/handleMoney";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import handleFormatDateRange from "../../../../utils/handleFormatDateRange";

type IndexPrintProps = {
  billing: BillingDTO | null;
  ref: React.Ref<HTMLDivElement> | undefined;
};

export default function IndexPrint(props: IndexPrintProps) {
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
        <div>{c?.balanceCbm || ""}</div>,
        <div> {dayjs(c.cutOff).format("DD-MMM-YY")}</div>,
        <div> {c.noOfDays}</div>,
      ],
    })) ?? [];

  const storageBills: ReactNode[] =
    billing?.storage?.details?.map((c) => <div>{handleMoney(c.bill)}</div>) ??
    [];

  return (
    <div ref={ref}>
      <DocumentLayout
        headerTitle={
          <div className="d-flex justify-content-between">
            <div>RsEF</div>
            <h3>BILLING STATEMENT</h3>
          </div>
        }
      >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">DATE</th>
              <th scope="col">PARTICULARS</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <InOutLayout
              particular={{
                headers: [
                  <strong className="text-danger">ICR</strong>,
                  <strong className="text-danger">QTY</strong>,
                  <strong className="text-danger"> CBM</strong>,
                  <strong className="text-danger"> ADJ</strong>,
                  <strong>HANDLING IN CHARGES</strong>,
                  <strong>{billing?.handlingIn?.totals?.total}</strong>,
                ],
                contents: handlingInContent,
              }}
              rate={
                <>
                  {handleMoney(billing?.handlingIn?.totals?.handlingInRate)}/
                  {billing?.handlingIn?.totals?.billType}
                </>
              }
              bill={[
                <div>{handleMoney(billing?.handlingIn?.totals?.bill)}</div>,
              ]}
            />
            <InOutLayout
              particular={{
                headers: [
                  <strong className="text-danger">OCR</strong>,
                  <strong className="text-danger">QTY</strong>,
                  <strong className="text-danger"> CBM</strong>,
                  <strong className="text-danger"> ADJ</strong>,
                  <strong>HANDLING OUT CHARGES</strong>,
                  <strong>{billing?.handlingOut?.totals?.total}</strong>,
                ],
                contents: handlingOutContent,
              }}
              rate={
                <>
                  {handleMoney(billing?.handlingOut?.totals?.handlingOutRate)}/
                  {billing?.handlingOut?.totals?.billType}
                </>
              }
              bill={[
                <div>{handleMoney(billing?.handlingOut?.totals?.bill)}</div>,
              ]}
            />
            <InOutLayout
              particular={{
                headers: [
                  <strong className="text-danger">IN (cbm)</strong>,
                  <strong className="text-danger">OUT (cbm)</strong>,
                  <strong className="text-danger"> QTY</strong>,
                  <strong className="text-danger"> BAL (cbm)</strong>,
                  <strong className="text-danger"> CUT OFF</strong>,
                  <strong className="text-danger"> # of days</strong>,
                ],
                contents: storageContent,
              }}
              rate={
                <>
                  {handleMoney(billing?.storage?.totals?.storageRate)}/
                  {billing?.storage?.totals?.billType}
                </>
              }
              bill={[<div></div>, ...storageBills]}
            />
            <InOutLayout
              particular={{
                headers: [
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
                  </div>,
                ],
              }}
            />

            {/* <tr>
            <td></td>
            <td className="row row-cols-lg-5">
              <strong className="text-danger">ICR</strong>
              <strong className="text-danger">QTY</strong>
              <strong className="text-danger"> CBM</strong>
              <strong>HANDLING IN CHARGES</strong>
              <strong>{billing?.handlingIn?.totals?.total}</strong>
            </td>
            <td>
              {handleMoney(billing?.handlingIn?.totals?.handlingInRate)}/
              {billing?.handlingIn?.totals?.billType}
            </td>
            <td>{handleMoney(billing?.handlingIn?.totals?.bill)}</td>
          </tr>
          {billing?.handlingIn?.details.map((handlingIn) => (
            <tr>
              <th>{dayjs(handlingIn.actualCheckInDate).format("DD-MMM-YY")}</th>
              <td>
                <td className="row row-cols-lg-5">
                  <div>{handlingIn?.icrReferenceNumber}</div>
                  <div>{handlingIn?.quantity}</div>
                  <div>{handlingIn?.cubicMeter}</div>
                </td>
              </td>
              <td></td>
              <td></td>
            </tr>
          ))} */}
          </tbody>
        </table>
      </DocumentLayout>
    </div>
  );
}
