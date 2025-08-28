import type { ServiceConfigDTO } from "../../../../@types/DTOs/ServiceConfigDTO";
import { EMPTY_FIELD } from "./EMPTY_FIELD";

export const EMPTY_FORM: ServiceConfigDTO = {
  id: null,
  name: null,
  noOfFields: null,
  jsonInitialData: null,
  formula: null,
  serviceFields: [EMPTY_FIELD],
};
