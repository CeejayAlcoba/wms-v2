
import type { PickListDetailsRecord } from "../tables/PickListDetailsRecord";
import type { ReportDTO } from "./ReportDTO";


export type PickListDetailsRecordDTO = {
  report?: ReportDTO | null;
} & PickListDetailsRecord;

