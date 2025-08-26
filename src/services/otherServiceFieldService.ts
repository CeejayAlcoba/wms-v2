import type { RefOtherServiceField } from "../@types/tables/RefOtherServiceField";
import genericService from "./genericService";

const path = "other-service-field";

function _otherServiceFieldService() {
  return { ...genericService<RefOtherServiceField>(path) };
}

export const otherServiceFieldService = _otherServiceFieldService();
