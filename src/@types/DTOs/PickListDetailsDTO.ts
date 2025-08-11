import type { PickListDetails } from "../tables/PickListDetails";
import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";

export type PickListDetailsDTO = {
  pickListDetails: PickListDetails;
  pickListDetailsRecords: PickListDetailsRecord[];
};
