import type { CargoDetails } from "../tables/CargoDetails";

export type ReportFilterDTO = {
 actualCheckInDate?: Date | null;
  icrReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  goodIssueId?: number | null;
  reportType?: 'INBOUND' | 'PICKLIST' | 'INVENTORY';
  allowZeroBalance?: boolean | null;
  balanceCubicMeter?: number | null;
  balanceQuantity?: number | null;
  balancePalleteCount?: number | null;
} & CargoDetails;