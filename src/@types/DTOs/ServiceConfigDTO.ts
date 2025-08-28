import type { RefServiceConfig } from "../tables/RefServiceConfig";
import type { RefServiceField } from "../tables/RefServiceField";

export type ServiceConfigDTO = {
  serviceFields?: RefServiceField[];
  previousFormula?: string | null;
} & RefServiceConfig;
