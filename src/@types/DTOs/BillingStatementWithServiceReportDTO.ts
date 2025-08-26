import type { BillingStatement } from "../tables/BillingStatement";
import type { OtherServiceReports } from "../tables/OtherServiceReports";

export type BillingStatementWithServiceReportDTO = {
  otherServiceReports?: OtherServiceReports[];
} & BillingStatement;
