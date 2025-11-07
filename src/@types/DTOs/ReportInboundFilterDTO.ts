import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { CargoDetails } from "../tables/CargoDetails";

export type ReportInboundFilterDTO = {
  actualCheckInDateFrom?: string | null;
  actualCheckInDateTo?: string | null;
  icrReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  isStaging?: boolean | null;
} & CargoDetails &
  IPaginationFilter;
