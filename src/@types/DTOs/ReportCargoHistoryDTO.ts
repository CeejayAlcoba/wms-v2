import type { CargoDetails } from "../tables/CargoDetails";

export type ReportCargoHistoryDTO = {
  actualCheckInDate?: string;
  iCRReferenceNumber?: string;
  principal?: string;
  productCategory?: string;
  unitOfMeasurement?: string;
  binLocation?: string;
  goodsReceipt?: string;
  pickListDetailsId?: number;
  goodIssueDetailsId?: number;
  oCRNumber?: string;
  pickListQuantity?: number;
  pickListPalleteCount?: number;
  pickListCubicMeter?: number;
  pullOutDate?: string;
  status?: string;
  totalPickListCubicMeter?: number;
  totalPickListQuantity?: number;
  totalPickListPalleteCount?: number;
  totalIssuedCubicMeter?: number;
  totalIssuedQuantity?: number;
  totalIssuedPalleteCount?: number;
} & CargoDetails;
