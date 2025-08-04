import type { RefUnitOfMeasurement } from "../@types/tables/RefUnitOfMeasurement";
import genericService from "./genericService";
import _genericService from "./genericService";

const path = "unit-of-measurement";

function _unitOfMeasurementService() {
  return { ...genericService<RefUnitOfMeasurement>(path) };
}

export const unitOfMeasurementService = _unitOfMeasurementService();
