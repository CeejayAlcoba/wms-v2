import type { BillingStatementWithServiceReportDTO } from "../../../../@types/DTOs/BillingStatementWithServiceReportDTO";

export const EMPTY_FORM: BillingStatementWithServiceReportDTO = {
  id: null,
  otherServiceReports: [],
  principalId: null,
  productCategoryId: null,
  dateFrom: null,
  dateTo: null,
  referenceNumber: null,
};
