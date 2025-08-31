import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { CargoDetails } from "../tables/CargoDetails";

export type ReportInventoryFilterDTO = {
  actualCheckInDateFrom?: string | null;
  actualCheckInDateTo?: string | null;
  icrReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  allowZeroBalance?: boolean | null;
  allowNullGoodIssue?: boolean | null;
} & CargoDetails & IPaginationFilter;
