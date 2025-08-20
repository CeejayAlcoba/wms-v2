import type { CargoDetails } from "../tables/CargoDetails";

export type ReportCargoHistoryFilterDTO = {
  actualCheckInDateFrom?: string | null;
  actualCheckInDateTo?: string | null;
  iCRReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  pickListDetailsId?: number | null;
  goodIssueId?: number | null;
  oCRNumber?: string | null;
  status?: string | null;
} & CargoDetails;
