import type { CargoDetails } from "../tables/CargoDetails";

export type ReportCargoHistoryFilterDTO = {
  actualCheckInDateFrom?: string;
  actualCheckInDateTo?: string;
  iCRReferenceNumber?: string;
  principalId?: number;
  productCategoryId?: number;
  goodsReceiptId?: number;
  pickListDetailsId?: number;
  goodIssueId?: number;
  oCRNumber?: string;
  status?: string;
} & CargoDetails;
