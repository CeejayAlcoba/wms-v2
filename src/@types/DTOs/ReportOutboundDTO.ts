import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { CargoDetails } from "../tables/CargoDetails";

export type ReportOutboundDTO = {
  actualCheckInDate?: string | null;
  icrReferenceNumber?: string | null;
  principal?: string | null;
  productCategory?: string | null;
  unitOfMeasurement?: string | null;
  binLocation?: string | null;
  goodsReceipt?: string | null;
  pickListDetailsId?: number | null;
  goodIssueDetailsId?: number | null;
  ocrNumber?: string | null;
  pickListQuantity?: number | null;
  pickListPalleteCount?: number | null;
  pickListCubicMeter?: number | null;
  totalQuantity?: number | null;
  totalPalleteCount?: number | null;
  totalCubicMeter?: number | null;
} & CargoDetails &
  IPaginationTotal;
