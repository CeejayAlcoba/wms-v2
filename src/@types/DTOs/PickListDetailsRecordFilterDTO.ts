import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";

export type PickListDetailsRecordFilterDTO = {
  productCategoryId?: number | null;
  actualCheckInDate?: Date | null;
  goodsReceitId?: number | null;
  icrReferenceNumber?: string | null;
} & PickListDetailsRecord;
