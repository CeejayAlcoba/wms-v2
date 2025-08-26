import type { BillingStatement } from "../../../../@types/tables/BillingStatement";

export const EMPTY_SEARCH: BillingStatement = {
  id: null,
  principalId: null,
  productCategoryId: null,
  dateFrom: null,
  dateTo: null,
  referenceNumber: null,
};
