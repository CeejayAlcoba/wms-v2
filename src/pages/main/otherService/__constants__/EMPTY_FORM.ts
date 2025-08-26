import type { OtherServiceDTO } from "../../../../@types/DTOs/OtherServiceDTO";
import { EMPTY_FIELD } from "./EMPTY_FIELD";

export const EMPTY_FORM: OtherServiceDTO = {
  id: null,
  name: null,
  noOfFields: null,
  jsonInitialData: null,
  formula: null,
  otherServiceFields: [EMPTY_FIELD]
};
