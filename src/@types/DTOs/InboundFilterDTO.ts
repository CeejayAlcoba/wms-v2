import type { CargoDetails } from "../tables/CargoDetails";

export type InboundFilterDTO = {
  actualCheckInDate?: Date | null;
  icrReferenceNumber?: string | null;
  principalId?: number | null;
  productCategoryId?: number | null;
  goodsReceiptId?: number | null;
  allowNullGoodReceipt?: boolean | null;
  allowZeroBalance?: boolean | null;
} & CargoDetails;
