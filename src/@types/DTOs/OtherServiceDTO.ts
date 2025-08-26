import type { RefOtherService } from "../tables/RefOtherService";
import type { OtherServiceFieldMappingDTO } from "./OtherServiceFieldMappingDTO";

export type OtherServiceDTO = {
  otherServiceFields?: OtherServiceFieldMappingDTO[];
  previousFormula?: string | null;
 } & RefOtherService;
