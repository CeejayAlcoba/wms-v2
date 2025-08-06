import type { GoodsReceipt } from "../tables/GoodsReceipt";

export type GoodsReceiptDTO = {
  bookingDetailsId?: number | null;
} & GoodsReceipt;
