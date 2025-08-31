import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { CargoDetails } from "../tables/CargoDetails";

export type ReportInboundDTO = {
  actualCheckInDate?: string | null;
  icrReferenceNumber?: string | null;
  principal?: string | null;
  productCategory?: string | null;
  unitOfMeasurement?: string | null;
  binLocation?: string | null;
  goodsReceipt?: string | null;
  totalCubicMeter?: number | null;
  totalQuantity?: number | null;
  totalPalleteCount?: number | null;
} & CargoDetails & IPaginationTotal;
