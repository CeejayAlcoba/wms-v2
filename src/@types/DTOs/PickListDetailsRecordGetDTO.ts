import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";

export type PickListDetailsRecordGetDTO = {
  skuCode?: string | null;
  proNumber?: string | null;
  actualCheckInDate?: Date | null;
  icrReferenceNumber?: string | null;
  principal?: string | null;
  productCategory?: string | null;
  goodsReceipt?: string | null;
} & PickListDetailsRecord;
