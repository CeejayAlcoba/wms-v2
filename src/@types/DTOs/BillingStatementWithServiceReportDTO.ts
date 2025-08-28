import type { BillingStatement } from "../tables/BillingStatement";
import type { OtherServiceBillDTO } from "./OtherServiceBillDTO";

export type BillingStatementWithServiceReportDTO = {
  otherServiceBills?: OtherServiceBillDTO[];
} & BillingStatement;
