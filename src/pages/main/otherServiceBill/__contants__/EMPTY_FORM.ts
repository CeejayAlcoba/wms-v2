import type { BillingStatementWithServiceReportDTO } from "../../../../@types/DTOs/BillingStatementWithServiceReportDTO";

export const EMPTY_FORM: BillingStatementWithServiceReportDTO = {
  id: null,
  otherServiceBills: [],
  principalId: null,
  productCategoryId: null,
  dateFrom: null,
  dateTo: null,
  referenceNumber: null,
};
