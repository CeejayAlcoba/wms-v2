import type { CargoDetails } from "../tables/CargoDetails";
import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";

export type PickListDetailsRecordDTO = {
  cargoDetails?: CargoDetails | null;
} & PickListDetailsRecord;
