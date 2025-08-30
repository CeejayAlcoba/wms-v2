import type { BillingStatementFilterDTO } from "../../../../@types/DTOs/BillingStatementFilterDTO";

export const EMPTY_SEARCH: BillingStatementFilterDTO = {
  id: null,
  principalId: null,
  productCategoryId: null,
  dateFrom: null,
  dateTo: null,
  referenceNumber: null,
  currentPage:1,
  pageSize:10
};
