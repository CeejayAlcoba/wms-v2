import type { CargoDetails } from "../tables/CargoDetails";

export type ReportDTO = {
  actualCheckInDate?: Date | null;
  icrReferenceNumber?: string | null;
  principal?: string | null;
  productCategory?: string | null;
  unitOfMeasurement?: string | null;
  goodsReceipt?: string | null;
  ocrNumber?: string | null;
  balanceCubicMeter?: number | null;
  balanceQuantity?: number | null;
  balancePalleteCount?: number | null;
} & CargoDetails;
