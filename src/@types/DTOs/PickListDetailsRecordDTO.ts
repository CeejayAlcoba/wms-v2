import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";
import type { ReportPickListDTO } from "./ReportPickListDTO";

export type PickListDetailsRecordDTO = {
  report?: ReportPickListDTO | null;
} & PickListDetailsRecord;
