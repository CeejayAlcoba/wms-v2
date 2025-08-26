export type BillingStatement = {
  id?: number | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  referenceNumber?: string | null;
};
