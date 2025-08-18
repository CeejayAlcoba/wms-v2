import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { CargoDetails } from "../tables/CargoDetails";

export type ReportOutboundFilterDTO = {
  actualCheckInDateFrom?: string | null;
  actualCheckInDateTo?: string | null;
  icrReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  pickListDetailsId?: number | null;
  goodIssueId?: number | null;
  ocrNumber?: string | null;
} & CargoDetails &
  IPaginationFilter;
